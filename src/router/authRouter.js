
const express = require('express');
const { register,loginUser, forgotPassword, logOut, resetPassword, verifyUser,refreshtoken, getuser} = require('../controller/authController');
const validate = require('../middleware/validate');
const userValidation = require('../validation/joiValidation');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register-admin',validate(userValidation.register),async (req, res) => {
      await register(req, res,"admin");
    });
    router.post('/register-user',validate(userValidation.register),async (req, res) => {
        await register(req, res,"user");
      });
router.post('/login-admin', validate(userValidation.login), async (req, res) => {
    await loginUser(req, res,"admin");
  });
  router.post('/login-user', validate(userValidation.login), async (req, res) => {
    await loginUser(req, res,"user");
  });
router.post('/forgotpassword', validate(userValidation.forgotpassword), forgotPassword);
router.post('/resetpassword', validate(userValidation.resetpassword), resetPassword);
router.post('/logout', validate(userValidation.logout), logOut);
// router.get('/dashboard-admin',auth.verifyuser,getuser)
// router.get('/dashboard-user',auth.verifyuser,getuser)


module.exports= router;




// module.exports = router;