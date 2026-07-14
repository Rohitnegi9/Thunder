import express from "express"
import fs from "fs"

const app = express();
app.use(express.json());

const DBPath = "./database.txt";


function readDB(){
   const data =  fs.readFileSync(DBPath, "utf-8");
   // whole database data is available to you in string format: JSON
   return JSON.parse(data);
   //convert string into javascript object
}

function writeDB(data){
    // data is an array of object
    // convert it into JSON: String
   fs.writeFileSync(DBPath, JSON.stringify(data,null,2));
}


app.get("/",(req,res)=>{
    
    res.send("Welcome to Home Page");
})

// fetch customer detail using accountNumber
app.get("/user/:accountNumber",(req,res)=>{
    
    const accountId = req.params.accountNumber;
    const account = readDB();

    const user = account.find((a)=> a.accountNumber == accountId);

    res.json(user);
})

// account creation
app.post("/user",(req,res)=>{
   
    const user = req.body;
    const account = readDB();

    account.push(user);
    writeDB(account);

    res.json(user);
})


// delete user data

app.delete("/user",(req,res)=>{
    const accountId = req.body.accountNumber;

    const account = readDB();
    const newAccount = account.filter((a)=> a.accountNumber!=accountId);

    writeDB(newAccount);
    res.send("Information deleted succesfully");
})

//balance update
app.patch("/user",(req,res)=>{
    const balanceUpdate = req.body.balance;
    const accountId = req.body.accountNumber;

    const account = readDB();
    const user = account.find((a)=> a.accountNumber == accountId);
    user.balance+=balanceUpdate;

    writeDB(account);
    res.send("Balance Updated successfully");
})




app.listen(3000,()=>{
    console.log("Server is listening at port 3000");
})