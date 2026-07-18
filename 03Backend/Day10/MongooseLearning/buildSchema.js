
import mongoose from "mongoose";

// name, accountNumber, city, age, balance, accountType

const userSchema = new mongoose.Schema({
   name:{
    type: String,
    minLength:3,
    MaxLength: 20,
    trim: true,
    required: true
   },
   accountNumber:{
    type: Number,
    required: true,
    unique: true,
    index: true,
   },
   city:{
        type: String,
        minLength:3,
        MaxLength: 20,
        trim: true,
   },
   age:{
    type:Number,
    min: 18,
    max:100
   },
   balance:{
    type:Number,
    min:0,
    require: true
   },
   accountType:{
    type:String,
    require: true,
    enum: ["current","saving"],
    default: "saving"
   }
},{timestamps:true});


const Customer = mongoose.model("Customer",userSchema);
// customers : collection build hojayega
export default Customer;