import express from "express"
import authUserMiddleware from "../middlewares/authUserMiddleware.js"
import { getMessage, sendMessage } from "../controllers/messageController.js";
import authenticatedRateLimiter from "../middlewares/authenticatedRateLimiter.js"

const messageRouter = express.Router();

messageRouter.use(authUserMiddleware);
messageRouter.use(authenticatedRateLimiter);

// getMessage, sendMessage

messageRouter.post("/",sendMessage);
messageRouter.get("/:chatId",getMessage);
messageRouter.post("/:chatId",sendMessage);




export default messageRouter;