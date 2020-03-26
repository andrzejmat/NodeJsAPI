const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const checkAuth = require('../../middleware/check-auth');

const usersController = require('../../controller/users-controllers');

router.post('/signup', 
[
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
], usersController.signup);

router.post('/login', usersController.login);

router.use(checkAuth);

router.get('/', usersController.getUsers);


module.exports = router;
