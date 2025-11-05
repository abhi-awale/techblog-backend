const UserModel = require("../models/user.model");
const response = require('../utils/response');
const logger = require('../logger/logger');

async function profile(req, res) {
    try{
        const user = await UserModel.findById(req.user.id).select('-password');
        if(!user) return response.notFound(res, "User not found");

        return response.success(res, "Profile fetched successfully!", user);
    }catch(err) {
        logger.logError(err.message);
        response.serverError(res);
    }
}

const userController = {
    profile
}

module.exports = userController;