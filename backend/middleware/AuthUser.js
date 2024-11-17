import { User } from '../models/UserModel.js'
import jwt from "jsonwebtoken"

//AUTHENTICATION
export const isAuthenticated =async( req,res,next)=>{
    try {
        let token = req.cookies.jwt;
        console.log("middleware: ",token);

        if(!token){
            return res.status(401).json({error:"User not authenticated "})
        }
        const decode= jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await User.findById(decode.userId);
        if(!user){
            return res.status(401).json({error:"User not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error occuring in authentication" + error)
        return res.status(401).json({error: "User not authenticated"})
    }
}

//AUTHORIZATION
export const isAdmin = (...roles) =>
{
     return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error:`User with role ${req.user.role} can't access. Only admin can access this role!`})
        }
        next();
     }
}