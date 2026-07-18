import express from "express";
import mongoose from "mongoose";
import Customer from "./buildSchema.js";
import Users from "./data.js"

const app = express();

await mongoose.connect("mongodb+srv://rohitnegibusiness9_db_user:0TRE2l5E0xUwERUq@cluster0.jzw8pgb.mongodb.net/Thunder");

app.use(express.json());

// create a customer
app.post("/customer",async (req,res)=>{
   
    const customer = await Customer.create(req.body);
    res.json({
        message: "User is created Successfully",
        customer: customer
    });
})

// create customer in bulk
app.post("/customer/bulk",async (req,res)=>{
   
    const customer = await Customer.insertMany(Users);
    res.json({
        message: "User is created Successfully",
        customer: customer
    });
})


// get information of all the customer
app.get("/customer", async (req,res)=>{

    const customer = await Customer.find();
    res.json({
        message: "All user information is here",
        customer: customer
    });
})

app.get("/customer/filter", async (req,res)=>{
     
//   const {city,accountType}   = req.query;
  // req.query = {city: "Banglore", accountType: "current"}

  const customer = await Customer.find(req.query);

  res.json(customer);

})

// fetch particular customer information on the basis of its accountNumber

app.get("/customer/:accountNumber", async (req,res)=>{
    
    const accountValue = req.params.accountNumber;
    const customer = await Customer.findOne({accountNumber: accountValue});
    
    if(!customer){
        res.json({
        message: "Customer Doesnt exist",
    });
    }
    else{
        res.json({
        message: "Customer information",
        customer: customer
    });
    }

    
})


// delete user on the basis of their account Number
app.delete("/customer/:accountNumber", async (req,res)=>{
    
    const accountValue = req.params.accountNumber;
    const customer = await Customer.findOneAndDelete({accountNumber: accountValue});
    
    if(!customer){
        res.json({
        message: "Customer Doesnt exist",
    });
    }
    else{
        res.json({
        message: "Customer Deleted",
        customer: customer
    });
    }
    
})


// Update the city of the user

// research: internal:
app.patch("/customer/:accountNumber",async(req,res)=>{
   
    const {city,age} = req.body;
    
    const user = await Customer.findOneAndUpdate({accountNumber: req.params.accountNumber},
        {
            $set: { city: city , age:age}
        },
        {
            new: true
        }
    )

    // (filter,update,{new:true})

    res.json(user);

})


// Balance ko deposit karna hai amount ko


app.patch("/customer/deposit/:accountNumber",async (req,res)=>{
    const {balance} = req.body;
    

    const user = await Customer.findOne({accountNumber:req.params.accountNumber});

    user.balance+=balance;
    // local change hai,

    await user.save();

    res.json(user);
})


app.patch("/customer/withdraw/:accountNumber",async (req,res)=>{
    const {balance} = req.body;
    

    const user = await Customer.findOne({accountNumber:req.params.accountNumber});
    
    if(user.balance>=balance){
        user.balance-=balance;
        await user.save();
        res.json(user);
    }
    else{
        res.json({
            message: "Insufficient Balance"
        })
    }
    // local change hai,
   
})









// filter 















app.listen(3000,()=>{
    console.log("Server start at port 3000");
})