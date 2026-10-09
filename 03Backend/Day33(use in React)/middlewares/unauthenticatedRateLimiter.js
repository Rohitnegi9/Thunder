import { redisClient } from "../config/redis.js";

const unauthenticatedRateLimiter = async (req, res, next) => {
    try {
        const key = `rate-limit:ip:${req.ip}`;

        const requestCount = await redisClient.incr(key);

        if (requestCount === 1) {
            await redisClient.expire(key, 60);
        }

        if (requestCount > 10) {
            const remainingTime = await redisClient.ttl(key);

            return res.status(429).json({
                message: `Too many requests. Try again after ${remainingTime} seconds.`
            });
        }

        next();
    } catch (error) {
        console.log("Unauthenticated rate limiter error:", error);

        // If Redis fails, don't stop the entire application.
        next();
    }
};

export default unauthenticatedRateLimiter;