import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";
import mongoose from "mongoose";
import {generateAIResponse} from "../service/openRouterService.js"
import {buildMessagesForAI} from "../utils/chatContext.js"
import {
  resetUsageIfNeeded,
  hasTokenLimitReached,
  addUserTokenUsage,
} from "../utils/userUsage.js";
import { addChatTokenUsage } from "../utils/tokenUsage.js";


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

    await resetUsageIfNeeded(req.user);

    if (hasTokenLimitReached(req.user)) {
      return res.status(429).json({
        message: "Token limit reached. Please try after some time.",
        usage: req.user.usage,
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

    res.status(201).json({
      message: "Message sent successfully",
      chatId: chat._id,
      reply: aiReply,
      usage,
      userMessage,
      assistantMessage,
    });

    updateSummaryIfNeeded(chat._id);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
