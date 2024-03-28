const express = require('express');
const {GetId,GetAll} = require('../controller/apiController');
const validate = require('../middleware/validate');
const apiValidation = require('../validation/apiValidation');
const auth = require('../middleware/auth');
const { checkUser } = require('../services/authServices');

const router = express.Router();
router.get('/',GetAll);
router.get('/:id',GetId);
module.exports = router;
// auth.authenticateToken,auth.checkRole('admin'),validate(apiValidation.GetAll)
// auth.authenticateToken,validate( apiValidation.GetId)