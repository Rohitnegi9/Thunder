import jwt from "jsonwebtoken"
import User from "../model/userSchema.js"

const authUserMiddleware = async(req,res,next)=>{

    try{
        
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({
                message: "You need to login First"
            })
        }
        
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        const existingUser = await User.findById(payload.id);

        if(!existingUser){
            return res.status(404).json({
                message: "User Doesnt Exist"
            })
        }
        
        req.user = existingUser;
        next();

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export default authUserMiddleware;