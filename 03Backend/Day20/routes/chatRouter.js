import express from "express"
import authUserMiddleware from "../middlewares/authUserMiddleware.js"
import {getSingleChat, createChat, getSingleChat, deleteChat} from "../controllers/chatController.js"

const chatRouter = express.Router();

chatRouter.use(authUserMiddleware);

// getRecentChat: top 20 , getSingleChat , createChat, deleteChat

chatRouter.post("/createChat",createChat);
chatRouter.get("/getRecentChat", getRecentChat);
chatRouter.get(":chatId", getSingleChat);
chatRouter.delete(":chatId", deleteChat);

export default chatRouter;
