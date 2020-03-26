const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const jwtKey = config.get('jwtkey');
const jwtTimeExpires = config.get('jwtExpire')

const HttpError = require('../models/http-error');
const User = require('../models/user');


import * as errMsg from '../lib/constant'

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        const error =  new HttpError (errMsg.FETCHING_USERS_FAIL, 500);
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
}


const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
          new HttpError(errMsg.INVALID_INPUTS, 422)
        );
    }

    const { email, password } = req.body;
    let existingUser;
    
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(errMsg.SIGNING_UP_FAILES,500);
      return next(error);
    }
  
    if (existingUser) {
      const error = new HttpError(errMsg.USERS_EXIST_ALREADY,422);
      return next(error);
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError(errMsg.COULD_NOT_CREATE_USER,500);
      return next(error);
    }
    
    const createdUser = new User({
        email,
        password: hashedPassword,
        });
    
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(errMsg.SIGNING_UP_FAILES,500);
        return next(error);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email },jwtKey,{ expiresIn: jwtTimeExpires }
      );
    } catch (err) {
      const error = new HttpError(errMsg.SIGNING_UP_FAILES,500);
      return next(error);
    }
  
    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(errMsg.LOGGING_IN_FAILED,500);
        return next(error);
    }
    
    if (!existingUser) {
        const error = new HttpError(errMsg.INVALID_CREDENTIALS,403);
        return next(error);
    }

    let isValidPassword = false;
    
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(errMsg.COULD_NOT_LOGIN,500);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(errMsg.INVALID_CREDENTIALS,403);
        return next(error);
    }

    
    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, jwtKey,{ expiresIn: jwtTimeExpires });
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again later.',500);
        return next(error);
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });

};

const passwordReset = (req, res, next) => {

}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.passwordReset = passwordReset;

