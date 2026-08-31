import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis.js";

const authUserMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "You need to login first"
            });
        }

        const blockedToken = await redisClient.get(
            `blocklist:${token}`
        );

        if (blockedToken) {
            return res.status(401).json({
                message: "Please login again"
            });
        }

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = payload.id;
        req.token = token;
        req.tokenPayload = payload;

        next();
    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default authUserMiddleware;