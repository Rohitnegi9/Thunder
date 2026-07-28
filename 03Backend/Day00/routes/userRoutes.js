import express from "express";
import { signup, login, logout, getProfile } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/profile", authMiddleware, getProfile);

export default userRoutes;

