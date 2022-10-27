const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const userController = require('../controllers/users');

router.get('/register', userController.renderRegister);

router.post('/register', catchAsync(userController.register));

router.get('/login', userController.renderLogin);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), userController.login);

router.get('/logout', userController.logout);

module.exports = router;