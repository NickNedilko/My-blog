import User from "../models/user.model.js";
import bcrypt from "bcryptjs";



export const signUp = async(req, res) => {
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, userName });

    const user = await newUser.save();

    if (!user) {    
        return res.status(500).json({ message: "Error creating user" });
    }

    return res.status(201).json({ message: "User created successfully" });
};

