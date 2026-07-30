import User from "../model/userSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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

        const {name, age, email, password} = req.body;

        if(!email || !password || !name){
            return res.staus(400).json({
                message: "Email , password or name some filed are missing"
            })
        }

        // https status code
        //email wala already exist toh nahi karta

       const user = await User.findOne({email});
       
       if(user){
            return res.staus(409).json({
                message: "Email ID already exist"
            })
       }
       
       
       const hashPassword = await bcrypt.hash(paasowrd,12);

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

       res.staus(201).json({
        message:"User created SuccessFully",
        name,
        age,
        email
       });

    }
    catch(err){
        console.log(err);
        res.staus(500).json({
            message: "Internal Server error"
        })

    }
}

export const login = async (req,res)=>{
    
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.staus(400).json({
                message: "Email , password or some filed are missing"
            })
        }

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

export const profie = async(req,res)=>{
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