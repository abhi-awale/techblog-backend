const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwtUtils = require('../utils/jwt');
const response = require("../utils/response");
const logger = require("../logger/logger");
const {redisClient} = require('../config/redis');

async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return response.badRequest(res, "User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    response.created(res, "User created successfully!", {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    logger.logError(err.message);
    response.serverError(res);
  }
}

async function login(req, res) {
    try {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user) {
        return response.notFound(res, "User not found!");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        return response.unauthorized(res);
    }
    const payload = { id : user._id.toString()};

    const accessToken = jwtUtils.generateAccessToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken(payload);

    //store refresh token in redis
    await redisClient.set(user._id.toString(), refreshToken, {EX: 7*24*60*60}) // 7 days expiry

    response.success(res, "User logged in successfully!", {accessToken: accessToken, refreshToken:refreshToken});
    } catch(err) {
        logger.logError(err.message);
        response.serverError(res);
    }
}

async function refresh(req, res) {
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) return response.badRequest(res, "Refresh token required!");

        const decoded = jwtUtils.verifyRefreshToken(refreshToken);
        if(!decoded) return response.unauthorized(res, "Invalid refresh token");

        const storedToken = await redisClient.get(decoded.id);
        if(storedToken !== refreshToken)
            return response.unauthorized(res, "Refresh token not valid or expired");

        const accessToken = jwtUtils.generateAccessToken({id:decoded.id});

        return response.success(res, "New access token generated!", {accessToken : accessToken});

    }catch(err) {
        logger.logError(err.message);
        response.serverError(res);
    }
}

async function logout(req, res) {
    try{
        const userId = req.user.id;
        await redisClient.del(userId);
        return response.success(res, "User logged out successfully!");
    }catch(err) {
        logger.logError(err.message);
        response.serverError(res);
    }
}



const authController = {
  register,
  login,
  refresh,
  logout
};

module.exports = authController;
