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


export const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate('user').sort({ createdAt: -1 });
    const tags = posts.map(post => post.tags).flat().slice(0, 5);

    if (!posts) {
        throw httpError(404, 'Posts not found')
    }
    res.status(200).json({
        posts,
        tags
    });
}



export const getOnePost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug }).populate('user');
  if (!post) {
    throw httpError(404, 'Post not found')
  }
  res.status(200).json(post);
}
