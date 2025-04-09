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
        avatarUrl
    })

} 