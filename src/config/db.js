const mongoose = require('mongoose');
const logger = require('../logger/logger');

function connectDB() {
    mongoose.connect(process.env.DB_URI)
    .then((res)=>{
        logger.logInfo("MongoDB connected successfully!")
    })
    .catch((err)=>{
        logger.logError(err);
    })
}

module.exports = connectDB;