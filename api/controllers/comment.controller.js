import Comment from "../models/comment.model.js";


export const createComment = async (req, res) => {  
    const { content, post } = req.body;
    const user = req.user._id;
    // Получаем ID пользователя из токена
    const newComment = await Comment.create({ content, post, user });
    res.status(201).json(newComment);
}
    