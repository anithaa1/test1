const express = require('express');

const {createbanner,deletebanner,getId, updatebanner, findAll } = require('../controller/bannersController');
const validate = require('../../src/middleware/validate');
const bannerValidation = require('../validation/bannerValidation')
//const oktaAuthRequired = require('../../utils/oktaAuthRequired');
const { checkRole ,authenticateToken} = require('../middleware/auth');

const router = express.Router();

//router.route('/secure').get(oktaAuthRequired, validate(userValidation.findall), bannerController.findAllSecure);
router.post('/',authenticateToken, checkRole('admin'),createbanner);
router.put('/:id',authenticateToken, checkRole('admin'),updatebanner);
router.delete('/:id', authenticateToken,checkRole('admin'),deletebanner);

//  validate(bannerValidation.findall)
 router.get('/:id',authenticateToken,validate(bannerValidation.getId),getId);
//  router.get('/testapi',authenticateToken,testApi);
 router.get('/',authenticateToken,findAll);

module.exports = router;
