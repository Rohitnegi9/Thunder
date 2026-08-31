import dotenv from "dotenv/config"
import express from "express"
import connectDB from "./config/database.js";
import {connectRedis} from "./config/redis.js"
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chatRouter.js";





const app = express();


app.use(express.json());
app.use(cookieParser());




app.use("/user", userRouter);
app.use("/msg", messageRouter);
app.use("/chat",chatRouter)


const startServer = async ()=>{
    try{
    
        await connectDB();
        await connectRedis();

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
