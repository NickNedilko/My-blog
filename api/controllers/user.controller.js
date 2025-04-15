import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { httpError } from "../utils/http-error.js";

export const getCurrentUser = async (req, res)=>{
    const user = req.user;
    const { _id, email, userName, avatarUrl } = user;
    if (!user) {
        throw httpError(401, "Unauthorized")    
    }
    res.json({
        _id,
        email,
        userName,
        avatarUrl,
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
    const user = req.user;

    if (!user) {
        throw httpError(401, "Unauthorized");
    }
    const { _id } = user;

    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
        throw httpError(404, "User not found");    
    }

    res.json({
        message: "User deleted successfully",
        userId: _id 
    })
}