const express = require('express');
const router = express.Router();

const { createMenu,getMenuById, updateMenu,deleteMenu,listMenus } = require('../controller/menusController');
const validate = require('../middleware/validate');
const menuValidation = require('../validation/menuValidation');


router.post('/', validate(menuValidation.createMenu), createMenu);
router.get('/:id', validate(menuValidation.getMenuById), getMenuById);
router.put('/:id', validate(menuValidation.updateMenu), updateMenu);
router.delete('/:id', validate(menuValidation.deleteMenu),deleteMenu);
router.get('/',listMenus);
//router.post('/refreshtoken', auth, validate(menuValidation.refreshtoken), refreshtoken);

module.exports= router;

