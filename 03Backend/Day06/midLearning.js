// app.use
import exprees from "express"

const app = exprees();


// app.use((req,res)=>{
//     res.send("Hello Ji");
// });

// app.use("/practice",(req,res)=>{
//     res.send("Hello Useer");
// })

const isVerfied = false;
const isAdmin = true;

// function rohit(){

// }

app.use("/practice",(req,res,next)=>{
    if(!isVerfied){
        res.send("Kindly Login");
        return;
    }
    next();
})

app.use("/admin",(req,res,next)=>{
    if(!isAdmin){
        res.send("You are not permitted to do this");
    }
    next();
})


app.get("/",(req,res)=>{
    res.send("Welcome to home page");
})


app.get("/article",(req,res)=>{
    res.send("Welcome to article");
})


app.get("/practice",(req,res)=>{
    res.send("This is your problme page")
})

app.get("/practice/:id",(req,res)=>{
    res.send(`This is your problem number ${req.params.id}`);
})

app.post("/practice",(req,res)=>{
    // post
    res.send(`Your post is created`);
})


app.get("/admin",(req,res)=>{
    res.send("I am admin");
})

app.get("/admin/createProblem",(req,res)=>{
    res.send("I am admin created the problem");
})

app.get("/admin/contest",(req,res)=>{
    res.send("I am admin contest");
})










// app.use((req,res)=>{
//     res.send("Hello Ji");
// });





app.listen(3000,()=>{
    console.log("Server is Listening at port 3000");
})