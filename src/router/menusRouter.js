const express = require('express');
const router = express.Router();
//const oktaAuthRequired = require('../utils/authRequired');
const { createMenu,getMenuById,deleteMenu,deleteSubmenusId, updateMenu, findAll } = require('../controller/menusController');
const validate = require('../middleware/validate');
const menuValidation = require('../validation/menuValidation');
const { checkRole ,authenticateToken,verifyuser} = require('../middleware/auth');

router.post('/',authenticateToken, checkRole('admin'), validate(menuValidation.createMenu), createMenu);
router.get('/:id', authenticateToken,validate(menuValidation.getMenuById), getMenuById);
router.put('/:id',authenticateToken,checkRole('admin'),createMenu);
router.delete('/:id',authenticateToken,checkRole('admin'), validate(menuValidation.deleteMenu),deleteMenu);
router.delete('/submenu/:id',authenticateToken,checkRole('admin'), validate(menuValidation.deleteMenu),deleteSubmenusId)
router.get('/',authenticateToken,findAll);
// router.post(
//     "/",
//     userAuth,
//     checkRole(["admin", "super-admin"]),
//     async (req, res) => {
//       addItem(req.body, res);
//     }
//   );

module.exports= router;

