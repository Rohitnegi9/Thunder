import User from "../model/userSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {signupSchema, loginSchema} from "../validators/userValidators.js"
import Chat from "../model/chatSchema.js"
import Message from "../model/messageSchema.js"

// login
// logout
// signup
// profie

const createToken = (id,email)=>{
    
    if(!process.env.JWT_SECRET){
        throw new Error("JWT Secret key is Missing");
    }

    const token =  jwt.sign({id,email}, process.env.JWT_SECRET,{expiresIn:"1h"});
    return token;
}


const cookiesOption = {
    httpOnly: true,
    secure: false,
    maxAge: 60*60*1000
}


export const signup = async (req,res)=>{
    try{
       
        // validate all this data
        
        const result = signupSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                message: result.error.issues[0].message
            })
        }



        const {name, age, email, password} = result.data;

        // https status code
        //email wala already exist toh nahi karta

       const user = await User.findOne({email});
       
       if(user){
            return res.status(409).json({
                message: "Email ID already exist"
            })
       }
       
       
       const hashPassword = await bcrypt.hash(password,12);

      const userCreated = await User.create({
        name,
        age,
        email,
        password:hashPassword
       });


       // token create karna padta:
       // _id, email: payload
      
       const token = createToken(userCreated._id, email);

       res.cookie("token",token,cookiesOption);

       res.status(201).json({
        message:"User created SuccessFully",
        name,
        age,
        email
       });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        })

    }
}

export const login = async (req,res)=>{
    
    try{
        
       const result = loginSchema.safeParse(req.body);
       
        if(!result.success){
            return res.status(400).json({
                message: result.error.issues[0].message
            })
        }
       

        const {email, password} = result.data;

        

        // verify the password
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(401).json({message:"Invalide Credentials"})
        }
        
        // match the password

       const isMatch = await bcrypt.compare(password,existingUser.password);

       if(!isMatch)
       {
        return res.status(401).json({message:"Invalide Credentials"})
       }

       const token = createToken(existingUser._id,email);

        res.cookie("token",token,cookiesOption);

        res.status(200).json({
            message:"User Logged in SuccessFully",
            name: existingUser.name,
            age: existingUser.age,
            email: existingUser.email,
            usage: existingUser.usage
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

}


export const logout = async (req,res)=>{
    // logut
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,
    })

    res.status(200).json({
        message: "User Logged Out Successfully"
    })
}


// profile ko sirf mein dekhu or koi nahi
// authentciated user:(wo srf apni hi profile ko access kar sakta hai): token hai laadle
// export const profile = async (req,res)=>{
//     try{
        
//         const {email} = req.body;

//         if(!email){
//             return res.status(400).json({
//                 message: "Email is missing"
//             })
//         }

//         const existingUser = await User.findOne({email});

//         if(!existingUser){
//             return res.status(401).json({message:"Invalide Email"})
//         }

//         res.status(200).json({
//             name:existingUser.name,
//             age: existingUser.age,
//             usage: existingUser.usage,
//             email: existingUser.email
//         })
//     }
//     catch(err){
        
//         console.log(err);
//         res.status(500).json({
//             message: "Internal Server error"
//         })

//     }
// }

export const profile = async(req,res)=>{
    try{
        // profile ki informat send karo
        // Database ke andar call kari padegi, us user ko search, _id, email
        res.status(200).json({
            name:req.user.name,
            age: req.user.age,
            usage: req.user.usage,
            email: req.user.email
        })

    }
    catch(err){

        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}


export const deleteAccount = async (req,res)=>{
    try{
        
        // find all the chatID which belong to user

        // Delete all the messages which belongs to the chatID: Messages Delete
        // Delete all the chatID which belong to this user: Delete wo ChatID; user belong
        // Delete user Profile: is user By its ID
    const userId = req.user._id;


    await Message.deleteMany({
      userId
    });

    await Chat.deleteMany({
      userId
    });

    await User.deleteOne({
      _id: userId
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      message: "Account deleted successfully"
    });
    }
    catch(err){
        res.status(500).json({
            messages: "Internal Server Error"
        })
    }
}