const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");


const User = require('../../models/User');



// @route    POST api/users
// @desc     Register user
// @access   Public

// @route    POST api/login
// @desc     Log on user
// @access   Public

// @route    POST api/login
// @desc     Password recovery
// @access   Public

// @route    GET api/users
// @desc     Get list of all users
// @access   Private, Admin Only


