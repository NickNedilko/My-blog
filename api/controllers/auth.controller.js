import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwt.js";
import { httpError } from "../utils/http-error.js";



export const signup = async (req, res) => {
  
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: passwordHash,
    })

    const user = await newUser.save();

    const token = createToken({
        _id: user._id
    });
     
    await User.findByIdAndUpdate(user._id, {token});

    const { passwordHash: password, ...userData } = user._doc;

    res.json({
        ...userData,
        token
    });
};


export const signin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
       throw httpError(401, "Email or password is invalid")
    };

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) { 
       throw httpError(401, "Email or password is invalid")
    };
    const token = createToken({
        _id: user._id
    });

    await User.findByIdAndUpdate(user._id, {token});
    const { password, ...userData } = user._doc;

    res.json({
        ...userData,
        token
    });
}


export const logout = async (req, res) => {
    const { _id } = req.user;
  
    const user = await User.findByIdAndUpdate(_id, { token: '' }, { new: true });
    if (!user) {
         throw httpError(404, 'User not found')
    }
    res.json({
        message: 'Logout succes'
    })
}
