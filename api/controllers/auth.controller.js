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
        _id: user._id,
        isAdmin: user.isAdmin
    });

    const { passwordHash: password, ...userData } = user._doc;

    res.cookie('authtoken', token, {
        httpOnly: true,
        secure: false,
    }).json({
        ...userData,
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
        _id: user._id,
        isAdmin: user.isAdmin
    });

    const { password, ...userData } = user._doc;

    res.cookie('authtoken', token, {
        httpOnly: true,
        secure: false,
    }).json({
        ...userData,
    });
}


export const logout = async (req, res) => {
    const user = req.user;
    if (!user) {
         throw httpError(404, 'User not found')
    }
    res.clearCookie('authtoken', {
        httpOnly: true,
        secure: false,
    });
    res.json({
        message: 'Logout succes'
    })
}

export const googleAuth = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const {email, userName} = req.body;
    if (!user) {
        const newUser = new User({
            email,
            userName,
            password: 'googleAuth',
        });
        const user = await newUser.save();
        const token = createToken({
            _id: user._id,
            isAdmin: user.isAdmin
        });
        const { password, ...userData } = user._doc;
        res.cookie('authtoken', token, {
            httpOnly: true,
            secure: false,
        }).json({
            ...userData
        });
    } else {
        const token = createToken({
            _id: user._id,
            isAdmin: user.isAdmin
        });
        const { password, ...userData } = user._doc;
        res.cookie('authtoken', token, {
            httpOnly: true,
            secure: false,
        }).json({
            ...userData,
        });
        
    }
}
