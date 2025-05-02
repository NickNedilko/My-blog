import Post from "../models/post.model.js";
import { httpError } from "../utils/http-error.js";




export const createPost = async (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.category) {
        throw httpError(400, 'Title, text, and category are required');
    }
    try {
        const { title, content, category, tags, imageUrl } = req.body;

        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const post = new Post({
            title,
            content,
            category,
            tags,
            slug,
            imageUrl,
            user: req.user.id
        });

        const savedPost = await post.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create post',
            error: error.message
        });
    }
}

export const getposts = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 4;
  const skip = (req.query.page - 1) * limit || 0;
  const sortField = req.query.sortBy === 'views' ? 'viewsCount' : 'updatedAt';
  const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.search && {
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { content: { $regex: req.query.search, $options: 'i' } },
        ],
      }),
    }).populate('user')
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);
     if (!posts) {
        throw httpError(404, 'Posts not found')
    }
    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
   const tags = posts.map(post => post.tags).flat().slice(0, 5);
    res.status(200).json({
      posts,
      tags,
      totalPosts,
      lastMonthPosts,
    });
  
};

export const getOnePost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOneAndUpdate(
    { slug },
    { $inc: { viewsCount: 1 } },
    { timestamps: false },
    { new: true }).populate('user', '-password');
  
  if (!post) {
    throw httpError(404, 'Post not found')
  }
  res.status(200).json(post);
}


export const getMyPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id }).populate('user');
  if (!posts) {
    throw httpError(404, 'Posts not found')
  }
  res.status(200).json(posts);
}


export const updatePost = async (req, res) => {
  const { slug } = req.params;
  const { title, content, category, tags, imageUrl } = req.body;

  const post = await Post.findOneAndUpdate(
    { slug },
    { title, content, category, tags, imageUrl },
    { new: true }
  ).populate('user');

  if (!post) {
    throw httpError(404, 'Post not found')
  }
  res.status(200).json(post);
}

export const deletePost = async (req, res) => {
  const { slug } = req.params;
   const post = await Post.findOneAndDelete({ slug })
 if (!post) {
    throw httpError(404, 'Post not found')
  }
  res.status(200).json({ message: 'Post deleted successfully' });
}