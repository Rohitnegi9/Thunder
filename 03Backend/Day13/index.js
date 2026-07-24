import express from "express"
import mongoose from "mongoose"
import User from "./userSchema.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"


await mongoose.connect("mongodb+srv://rohitnegibusiness9_db_user:0TRE2l5E0xUwERUq@cluster0.jzw8pgb.mongodb.net/LearnAuth");

const app = express();
app.use(cookieParser())

app.use(express.json());

//


app.post("/signup", async (req,res)=>{
    const {name, age, email, password} =req.body;

    const u = await User.create({
        name,age,email,password
    });


    // token bhejna padega
    // payload, secret key, optional field
    const token  = jwt.sign({
        email: email,
        name: name
    },
    "Rohit@456",
    {expiresIn:"1h"}
    );

   // browser se baat kar rha hu
    res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        maxAge: 60*60*1000
    })

    // create kab hua: iat: 2pm
    // ye expire kab hoga: exp: 3pm

    res.json({
        message: "User Profile is created"
    })
})


app.get("/user",async (req,res)=>{
    // verify its token

    const {token} = req.cookies;

    // token ko verify karna padega, kya ye valid hai ya nahi

    const payload = jwt.verify(token, "Rohit@456");

    const u = await User.findOne({email: payload.email});


   if(u){
        res.json({
            message: "Your User detail",
            data: u
        })
   }
   else{
    res.json({
        "message":"User is not found"
    })
   }


})


app.post("/login", async(req,res)=>{
  
    const {email, password} = req.body;

      // verify its password
    const u = await User.findOne({email:email});
    console.log(u);

    if(u){

        if(password==u.password){

        const token  = jwt.sign({
        email: email,
        name: u.name
        },
            "Rohit@456",
            {expiresIn:"1h"}
        );

        // browser se baat kar rha hu
        res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        maxAge: 60*60*1000
        })

    // create kab hua: iat: 2pm
    // ye expire kab hoga: exp: 3pm

    res.json({
        message: "User Logged in successfully"
    })
    }


    else{
            res.json({
        message: "User Not found"
    })
    }


    }

    else{
        res.json({
        message: "User Not found"
    })
    }

   

})







app.listen(3000,()=>{
    console.log("Server is listening at port 3000");
})
