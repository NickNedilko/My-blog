import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import { httpError } from "../utils/http-error.js";


export const createComment = async (req, res) => {  
    const { content, post } = req.body;
    const user = req.user._id;
   
  await Post.findOneAndUpdate(
  { _id: post }, 
  { $inc: { commentCount: 1 } },
  { new: true, timestamps: false } 
);
 

    const newComment = await Comment.create({ content, post, user });
    res.status(201).json(newComment);
}


export const getPostComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate("user", 'userName avatarUrl createdAt').sort({ createdAt: -1 });
    if (!comments) {
        throw httpError(404, "Comments not found");
    }
    res.status(200).json(comments);
}


export const likeComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw httpError(404, "Comment not found");
    }
    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
        comment.numberOfLikes += 1;
        comment.likes.push(userId);
    } else {
        comment.numberOfLikes -= 1;
        comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
}
    

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw httpError(404, "Comment not found");
    }
    if (comment.user.toString() !== userId.toString() && !req.user.isAdmin) {
        throw httpError(403, "You are not authorized to delete this comment");
    }
    await Comment.findByIdAndDelete(commentId);
    
    await Post.findOneAndUpdate(
        { _id: comment.post }, 
        { $inc: { commentCount: -1 } },
        { new: true, timestamps: false } 
    );

    res.status(200).json({ message: "Comment deleted successfully" });
}

export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw httpError(404, "Comment not found");
    }
    if (comment.user.toString() !== userId.toString() && !req.user.isAdmin) {
        throw httpError(403, "You are not authorized to update this comment");
    }
    comment.content = content;
    await comment.save();
    res.status(200).json(comment);
}
    
export const getAllComments = async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const skip = (req.query.page - 1) * limit || 0;
    const comments = await Comment.find().populate("user", 'userName avatarUrl').sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    if (!comments) {
        throw httpError(404, "Comments not found");
    }
    const commentsCount = await Comment.countDocuments();

     const now = new Date();
    
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
    
        const lastMonthComments = await Comment.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
    res.status(200).json({comments, commentsCount, lastMonthComments});
}