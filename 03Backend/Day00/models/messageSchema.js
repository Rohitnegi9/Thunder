import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true
  },

  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },

  content: {
    type: String,
    required: true
  },

  tokens: {
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

messageSchema.index({ chatId: 1, createdAt: 1 });
messageSchema.index({ userId: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;