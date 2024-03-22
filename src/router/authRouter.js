
const express = require('express');
const { register,loginUser, forgotPassword, logOut, resetPassword, refreshtoken } = require('../controller/authController');
const validate = require('../middleware/validate');
const userValidation = require('../validation/joiValidation');
const auth = require('../middleware/auth');

const router = express.Router();
router.post('/register', validate(userValidation.register), register);
router.post('/login', validate(userValidation.login), loginUser);
router.post('/forgotpassword', validate(userValidation.forgotpassword), forgotPassword);
router.post('/resetpassword', validate(userValidation.resetpassword), resetPassword);
router.post('/logout', validate(userValidation.logout), logOut);
//router.post('/refreshtoken', auth, validate(userValidation.refreshtoken), refreshtoken);

module.exports= router;

