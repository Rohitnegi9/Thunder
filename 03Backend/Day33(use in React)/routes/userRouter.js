import express from "express"
import { login, signup, profile, logout, deleteAccount, getCurrentUsage } from "../controllers/userController.js";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import unauthenticatedRateLimiter from "../middlewares/unauthenticatedRateLimiter.js"
import authenticatedRateLimiter from "../middlewares/authenticatedRateLimiter.js"
import loadUserMiddleware from "../middlewares/loadUserMiddleware.js"

const userRouter = express.Router();


// login , logout, signup, profile

userRouter.post("/login",unauthenticatedRateLimiter,login);
userRouter.post("/logout",authUserMiddleware, logout);
userRouter.post("/signup",unauthenticatedRateLimiter,signup);
userRouter.get("/profile",authUserMiddleware,authenticatedRateLimiter,loadUserMiddleware, profile);
userRouter.get("/usage",authUserMiddleware,getCurrentUsage);
userRouter.delete("/delete",authUserMiddleware,authenticatedRateLimiter,loadUserMiddleware,deleteAccount);
export default userRouter;
