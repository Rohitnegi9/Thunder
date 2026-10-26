import jwt from 'jsonwebtoken';
import { createHash } from 'node:crypto';
import User from '../models/User.js';
import { redisClient } from '../config/redis.js';

// Hashing means we never store the actual JWT inside Redis.
export function tokenBlocklistKey(token) {
    const hash = createHash('sha256').update(token).digest('hex');
    return `blocked_token:${hash}`;
}

export async function requireAuth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Please log in' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });
    } catch (error) {
        return res.status(401).json({ message: 'Token expired or invalid' });
    }

    // Redis outage should not silently bypass revoked-token checks.
    const isBlocked = await redisClient.exists(tokenBlocklistKey(token));
    if (isBlocked) {
        return res.status(401).json({ message: 'Please log in again' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.token = token;
    req.tokenExpiry = decoded.exp;
    next();
}
