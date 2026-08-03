import express from "express"
import { login, signup, profile, logout } from "../controllers/userController";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";

const userRouter = express.Router();


// login , logout, signup, profile

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/signup", signup);
userRouter.get("/profile",authUserMiddleware,profile);

export default userRouter;