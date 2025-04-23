import Comment from "../models/comment.model.js";
import { httpError } from "../utils/http-error.js";


export const createComment = async (req, res) => {  
    const { content, post } = req.body;
    const user = req.user._id;
    // Получаем ID пользователя из токена
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