import express from "express"
import connectDB from "./config/database";
import dotenv from "dotenv"
import userRouter from "./routes/userRouter";
import messageRouter from "./routes/messageRouter";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());




app.use("/user", userRouter);
app.use("/msg", messageRouter);


// https://strikes.in/user/login
// https://strikes.in/user/logout
// https://strikes.in/user/signup
// https://strikes.in/user/profile


// https://strikes.in/msg/read
// https://strikes.in/msg/delete
// https://strikes.in/msg/edit



// login,signup,logout,profile: user related

// chat api:

// message banege api



const startServer = async ()=>{
    try{
        
        await connectDB();

       app.listen(process.env.PORT,()=>{
        console.log(`Server has started listenting at port 3000 ${process.env.PORT}`);
       })
    }
    catch(err){
        console.log(err);
    }
}


startServer();


// server start, server listen
