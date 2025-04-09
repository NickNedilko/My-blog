import User from "../models/user.model.js";
import { httpError } from "../utils/http-error.js";
import { verifyToken } from "../utils/jwt.js";




export const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
        next(httpError(401, "Not authorized"));
    }

    try {
        const { payload } = verifyToken(token);
        const user = await User.findById(payload._id).select(-'password');

        if (!user || !user.token || user.token !== token) {
        next(httpError(401, "User not found"))
        }

    req.user = user;
    next();
    } catch (error) {
         next(httpError(401))
    }
}