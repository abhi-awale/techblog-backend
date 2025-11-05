const {createClient} = require('redis');
const logger = require('../logger/logger');

const redisClient = createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on('error', (err) => {
    logger.logError(`Redis Error: ${err.message}`);
});

async function connectRedis() {
    if(!redisClient.isOpen) {
        try {
            await redisClient.connect();
            console.log("🟢 Redis connected Successfully!");
        } catch (err) {
            console.log(`🔴 Error Occurred: ${err}`);
        }
    } else {
        console.log(`🔴 Redis connection is closed!`);
    }
}

module.exports = {
    redisClient, connectRedis
}