import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { redisClient } from '../config/redis.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { requireAuth, tokenBlocklistKey } from '../middleware/requireAuth.js';
import { createToken, setAuthCookie, clearAuthCookie, publicUser } from '../utils/auth.js';

const router = Router();
const authRateLimit = rateLimiter(10, 60); // 10 requests / minute / IP
const userRateLimit = rateLimiter(20, 60, 'user'); // 20 requests / minute / user

router.post('/signup', authRateLimit, async (req, res) => {
    const { name, email, password } = req.body;

    if (typeof name !== 'string' || name.trim().length < 2 ||
        typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) ||
        typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ message: 'Enter valid name, email and password (8+ characters)' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let user;
    try {
        user = await User.create({
            name: name.trim(),
            email: cleanEmail,
            password: hashedPassword
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        throw error;
    }

    const token = createToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ user: publicUser(user) });
});

router.post('/login', authRateLimit, async (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createToken(user);
    setAuthCookie(res, token);
    res.json({ user: publicUser(user) });
});

router.get('/me', requireAuth, userRateLimit, (req, res) => {
    res.json({ user: publicUser(req.user) });
});

router.post('/logout', requireAuth, userRateLimit, async (req, res) => {
    const remainingSeconds = req.tokenExpiry - Math.floor(Date.now() / 1000);

    if (remainingSeconds > 0) {
        await redisClient.set(tokenBlocklistKey(req.token), '1', {
            EX: remainingSeconds
        });
    }

    clearAuthCookie(res);
    res.json({ message: 'Logged out successfully' });
});

export default router;
