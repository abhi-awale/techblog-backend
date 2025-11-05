const jwtUtils = require('../utils/jwt');
const response = require('../utils/response');
const logger = require('../logger/logger');

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];


        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.unauthorized(res, "Authorization token missing or invalid");
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwtUtils.verifyAccessToken(token);

        if(!decoded) {
            return response.unauthorized(res, "Invalid or expired token");
        }

        req.user = {
            id : decoded.id
        }

        next();

    } catch(err) {
        logger.logError(err.message);
        response.serverError(res);
    }
}

module.exports = authMiddleware;