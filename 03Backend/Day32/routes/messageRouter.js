import express from "express"
import authUserMiddleware from "../middlewares/authUserMiddleware.js"
import { getMessage, sendMessage } from "../controllers/messageController.js";
import authenticatedRateLimiter from "../middlewares/authenticatedRateLimiter.js"
import tokenUsageMiddleware from "../middlewares/tokenUsageMiddleware.js";
import loadUserMiddleware from "../middlewares/loadUserMiddleware.js"

const messageRouter = express.Router();

messageRouter.use(authUserMiddleware);
messageRouter.use(authenticatedRateLimiter);

// getMessage, sendMessage

messageRouter.post("/",tokenUsageMiddleware,loadUserMiddleware,sendMessage);
messageRouter.get("/:chatId",loadUserMiddleware,getMessage);
messageRouter.post("/:chatId",tokenUsageMiddleware,loadUserMiddleware,sendMessage);




export default messageRouter;