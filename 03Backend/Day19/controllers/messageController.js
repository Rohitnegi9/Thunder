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


export const sendMessage = async(req,res)=>{
    try{
            const {chatId} = req.params;
            const {content} = req.body;

            if(!content || content.trim()=== ""){
                return res.status(400).json({
                    message: "You didn't send any message"
                })
            };

            // verfiy that chatID belongs to the particular user

            const chat = await Chat.findOne({
                _id: chatId,
                userId: req.user._id   
            });

           const Usermessage =  await Message.create({
                userId: req.user._id,
                chatId: chatId,
                role: "user",
                content: content,
            });


            // content: AI ko bhejna hai: Logic
            const dummyReply = "Mein changs si"

            const assMessage = await Message.create({
                userId: req.user._id,
                chatId: chatId,
                role: "assistant",
                content: dummyReply,
            });

            res.status(201).json({
                messages: dummyReply
            });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            messages: "Internal server error"
        })
    }
}