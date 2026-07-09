import express from "express"

const app = express();

const Database = [];
// app ek object, get ek method hai, 2 argument: url match karata, callback ko implement kar deta hai
// saare path ko accept karta hai: get, post, patch, put, delete
// Middle ware

app.use(express.json());
// authentication
// rate limiter


app.get("/",(req,res)=>{
    res.send("Welcome to Home Page");
})


app.get("/user",(req,res)=>{
    res.send("Mere toh maje hai");
})

app.post("/user",(req,res)=>{
    console.log(req.body);
    res.send("Post create kar di hai");
})

app.delete("/user",(req,res)=>{
    res.send("I have deleted");
})






app.listen(3000,()=>{
    console.log("I am listening at port 3000");
})