import mongoose from "mongoose";
import { type } from "os";
// validate: rohit@gmail
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    min: 10,
    max: 100
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },


  usage: {
    tokenUsed: {
      type: Number,
      default: 0
    },

    tokenLimit: {
      type: Number,
      default: 10000
    },

    resetAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 60 * 1000)
    },

    totalTokenUsed: {
      type: Number,
      default: 0
    }
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;