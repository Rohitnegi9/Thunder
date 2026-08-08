import express from "express"
import { login, signup, profile, logout, deleteAccount } from "../controllers/userController.js";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";

const userRouter = express.Router();


// login , logout, signup, profile

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/signup", signup);
userRouter.get("/profile",authUserMiddleware,profile);
userRouter.delete("/delete",authUserMiddleware,deleteAccount);
export default userRouter;