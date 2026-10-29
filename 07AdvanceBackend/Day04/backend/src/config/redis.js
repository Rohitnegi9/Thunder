import { createClient } from 'redis';

export const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (error) => {
    console.error('Redis error:', error.message);
});

export async function connectRedis() {
    await redisClient.connect();
    console.log('Redis connected');
}
