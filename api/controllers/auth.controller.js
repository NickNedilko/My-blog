import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { httpError } from "../utils/http-error.js";



export const signUp = async(req, res) => {
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
        throw httpError(400, "All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, userName });

    const user = await newUser.save();

    if (!user) {  
        throw httpError(500, "Error creating user");
    }

    return res.status(201).json({ message: "User created successfully" });
};

