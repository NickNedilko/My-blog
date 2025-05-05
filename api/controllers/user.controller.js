import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { httpError } from "../utils/http-error.js";
import Comment from "../models/comment.model.js";

export const getCurrentUser = async (req, res)=>{
    const user = req.user;
     if (!user) {
        throw httpError(401, "Unauthorized")    
    }
    const { _id, email, userName, avatarUrl, isAdmin } = user;
    res.json({
        _id,
        email,
        userName,
        avatarUrl,
        isAdmin
    })
} 


export const updateUser = async (req, res) => {
    const user = req.user;

    if (!user) {
        throw httpError(401, "Unauthorized");
    }

    const { _id } = user;
    const { email, userName, avatarUrl, password } = req.body;

 
    if (password && password.length < 6) {
        throw httpError(400, "Password must be at least 6 characters");
    }

    let passwordHash = undefined;
    if (password) {
        passwordHash = await bcrypt.hash(password, 10);
    }

    if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== _id.toString()) {
            throw httpError(400, "Email is already in use");
        }
    }

    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            email: email || user.email,           // Обновляем, если есть новое значение
            userName: userName || user.userName,  // То же для имени пользователя
            avatarUrl: avatarUrl || user.avatarUrl,
            password: passwordHash || user.password // Обновляем пароль, если он есть
        },
        { new: true } 
    );

    if (!updatedUser) {
        throw httpError(404, "User not found");
    }

    res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        userName: updatedUser.userName,
        avatarUrl: updatedUser.avatarUrl
    });
};

export const deleteUser = async (req, res) => {
    const _id = req.params.id;
   
    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
        throw httpError(404, "User not found");    
    }

    await Comment.deleteMany({ user: _id });

    res.json({
        message: "User deleted successfully",
        userId: _id 
    })
}


export const getAllUsers = async (req, res) => {
    if(!req.user.isAdmin) {
        throw httpError(403, "Forbidden")
    }
    const skip = (parseInt(req.query.page) - 1) * parseInt(req.query.limit) || 0;
    
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find().select("-password").skip(skip).limit(limit); // Exclude password field
    if (!users) {
        throw httpError(404, "Users not found")
    }
    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
        users,
        totalUsers,
        lastMonthUsers,
    });
}

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password "); // Exclude password field

    if (!user) {
        throw httpError(404, "User not found")
    }

    res.status(200).json(user);
}