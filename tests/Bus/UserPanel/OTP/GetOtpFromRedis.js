const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

async function fetchOtpFromRedis(userPhoneNumber) {
    try {
        let otp;
        while (!otp) {
            let redisData = await redis.get('auth-mm:cache:' + userPhoneNumber);
            if (redisData) {
                otp = JSON.parse(redisData);
            } else {
                console.log('Waiting for OTP to be available in Redis...');
                await new Promise(resolve => setTimeout(resolve, 60 * 1000));
            }
        }
        return otp;
    } catch (error) {
        console.error('Error fetching OTP from Redis:', error);
        throw error;
    } finally {
        redis.disconnect();
    }
}

module.exports = { fetchOtpFromRedis };