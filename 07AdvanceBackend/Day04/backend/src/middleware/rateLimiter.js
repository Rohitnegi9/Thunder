import { redisClient } from '../config/redis.js';

// Beginner-friendly fixed-window limiter (not an exact sliding window).
// INCR and EXPIRE are separate commands; suitable for this teaching project.
export function rateLimiter(limit, windowSeconds, keyType = 'ip') {
    return async (req, res, next) => {
        const identifier = keyType === 'user' ? req.user._id.toString() : req.ip;
        const key = `rate_limit:${keyType}:${identifier}`;

        const requests = await redisClient.incr(key);
        if (requests === 1) {
            await redisClient.expire(key, windowSeconds);
        }

        if (requests > limit) {
            return res.status(429).json({ message: 'Too many requests. Try again later.' });
        }

        next();
    };
}
