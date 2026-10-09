import { redisClient } from "../config/redis.js";

const tokenUsageMiddleware = async (req, res, next) => {
    try {
        const key = `token-usage:${req.userId}`;

        const tokenUsed = await redisClient.get(key);
        const tokenLimit = Number(process.env.TOKEN_LIMIT);

        if (Number(tokenUsed || 0) >= tokenLimit) {
            const remainingTime = await redisClient.ttl(key);

            return res.status(429).json({
                message: "Token limit reached. Please try after some time.",
                tokenUsed: Number(tokenUsed),
                tokenLimit,
                retryAfter: remainingTime
            });
        }

        req.tokenUsageKey = key;

        next();
    } catch (error) {
        console.log("Token usage middleware error:", error);
        next();
    }
};

export default tokenUsageMiddleware;