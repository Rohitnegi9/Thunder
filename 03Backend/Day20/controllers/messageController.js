import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";

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
        topic: content.trim().slice(0, 40)
      });
    }

    // 4. Save user message
    const userMessage = await Message.create({
      chatId: chat._id,
      role: "user",
      content: content.trim()
    });

    // 5. Dummy AI reply for now
    // Later we will replace this with OpenRouter response
    const aiReply = "AI reply will come here later.";

    // 6. Save assistant message
    const assistantMessage = await Message.create({
      chatId: chat._id,
      role: "assistant",
      content: aiReply
    });

    // 7. Update chat metadata
    chat.messageCount += 2;

    // If topic is still default, update it from first message
    if (chat.topic === "New Chat") {
      chat.topic = content.trim().slice(0, 40);
    }

    await chat.save();

    // 8. Send response
    res.status(201).json({
      message: "Message sent successfully",
      chatId: chat._id,
      userMessage,
      assistantMessage
    });

  } catch (err) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
