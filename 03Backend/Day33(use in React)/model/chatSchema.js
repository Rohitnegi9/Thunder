import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  topic: {
    type: String,
    default: "New Chat"
  },

  model: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    default: ""
  },

  summaryUpdatedAt: {
    type: Date,
    default: null
  },

  summarizedTillMessageNumber: {
    type: Number,
    default: 0
  },


  messageCount: {
    type: Number,
    default: 0
  },

  usage: {
    promptTokens: {
      type: Number,
      default: 0
    },

    completionTokens: {
      type: Number,
      default: 0
    },

    totalTokens: {
      type: Number,
      default: 0
    }
  }
}, { timestamps: true });

chatSchema.index({ userId: 1, updatedAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;