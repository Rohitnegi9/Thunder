import express from "express"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

const app = express();

const Database = [];
// app ek object, get ek method hai, 2 argument: url match karata, callback ko implement kar deta hai
// saare path ko accept karta hai: get, post, patch, put, delete
// Middle ware

app.use(express.json());
app.use(cookieParser());

// Must match Day13's signing secret: Day05 has no login/signup of its own,
// it only verifies tokens issued elsewhere in the repo, and there's no
// env-based secret config anywhere in this repo to use instead.
const JWT_SECRET = "Rohit@456";

const authenticate = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page");
})


app.get("/user", authenticate, (req,res)=>{
    res.send("Mere toh maje hai");
})

app.post("/user", authenticate, (req,res)=>{
    console.log(req.body);
    res.send("Post create kar di hai");
})

app.delete("/user", authenticate, (req,res)=>{
    res.send("I have deleted");
})

export default app;
