import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";
import mongoose from "mongoose";
import {generateAIResponse} from "../service/openRouterService.js"
import {buildMessagesForAI} from "../utils/chatContext.js"
import {
  addUserTokenUsage,
} from "../utils/userUsage.js";
import { addChatTokenUsage } from "../utils/tokenUsage.js";
import {updateSummaryIfNeeded} from "../service/summaryService.js"
import {redisClient} from "../config/redis.js"


// getMessage, sendMessage

export const getMessage = async(req,res)=>{
    try{

        const {chatId} = req.params;

        // verfiy that this chatID belongs to this user or not
        
        const chat = await Chat.findOne({
            _id: chatId,
            userId: req.user._id
        });


        if(!chat){
            return res.status(404).json({
                messages: "Chat Not found"
            });
        }


        const messages = await Message.find({
            chatId: chatId
        }).sort({createdAt:1});

        res.status(200).json({
            messages: "Your are all messages are here",
            msg: messages
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            messages: "Internal server error"
        })
    }
}

export const deleteMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(chatId) ||
      !mongoose.Types.ObjectId.isValid(messageId)
    ) {
      return res.status(400).json({ message: "Invalid chat or message id" });
    }

    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      chatId,
      userId: req.user._id,
    });

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    // A saved summary may contain the deleted text. Build future context
    // from the remaining messages instead.
    chat.summary = "";
    chat.summaryUpdatedAt = null;
    chat.summarizedTillMessageNumber = 0;
    chat.messageCount = await Message.countDocuments({ chatId });

    const firstUserMessage = await Message.findOne({ chatId, role: "user" })
      .sort({ createdAt: 1 });
    chat.topic = firstUserMessage?.content.slice(0, 40) || "New Chat";
    await chat.save();

    return res.status(200).json({
      message: "Message deleted successfully",
      chatId,
      messageId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content, model } = req.body;

    // 1. Validate message content
    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Message content is required"
      });
    }



    

    let chat;

    // 2. Existing chat case
    if (chatId) {
      // Check valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({
          message: "Invalid chat id"
        });
      }

      chat = await Chat.findOne({
        _id: chatId,
        userId: req.user._id
      });

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found"
        });
      }
    }

    // 3. New chat case
    else {
      if (!model) {
        return res.status(400).json({
          message: "Model is required for new chat"
        });
      }

      chat = await Chat.create({
        userId: req.user._id,
        model,
        topic: content.trim().slice(0, 40),
      });
    }

    

    // our code start here
    // oldMessages: Jinki abhi tak summary create nahi hui hai
    const oldMessages = await Message.find({
      chatId: chat._id,
    })
      .sort({ createdAt: 1 })
      .skip(chat.summarizedTillMessageNumber);

    const messagesForAI = buildMessagesForAI({
      chat,
      oldMessages,
      currentMessage: content.trim(),
    });

    const { aiReply, usage } = await generateAIResponse({
      model: chat.model,
      messages: messagesForAI,
    });

    const userMessage = await Message.create({
      chatId: chat._id,
      role: "user",
      content: content.trim(),
      userId: req.user._id
    });

    const assistantMessage = await Message.create({
      chatId: chat._id,
      role: "assistant",
      content: aiReply,
       userId: req.user._id,
       usage,
    });

    chat.messageCount += 2;

    if (chat.topic === "New Chat") {
      chat.topic = content.trim().slice(0, 40);
    }

    await addChatTokenUsage(chat, usage);
    await addUserTokenUsage(req.user, usage.totalTokens);

    // redis ke andar information ko daalna padega

    const tokenUsed = await redisClient.incrBy(
        req.tokenUsageKey,
        usage.totalTokens
    );

      if (tokenUsed === usage.totalTokens) {
           await redisClient.expire(
           req.tokenUsageKey,
          Number(process.env.TOKEN_WINDOW_SECONDS)
        );
      }



    return res.status(201).json({
      message: "Message sent successfully",
      chatId: chat._id,
      reply: aiReply,
      usage,
      tokenUsed,
      tokenLimit: Number(process.env.TOKEN_LIMIT),
      userMessage,
      assistantMessage
    });

    updateSummaryIfNeeded(chat._id);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
