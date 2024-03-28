const Joi = require('joi');
const getMenuById = Joi.object({
  params: Joi.object({
      id: Joi.number().required()
  }).required()
});

  const createMenu = Joi.object().keys({
    menu_Name: Joi.string().trim().optional(),
    status: Joi.string().valid('enabled', 'disabled').optional(),
    link: Joi.string().uri().optional(),
    type: Joi.number().valid('main', 'sub').optional(),
    target: Joi.number().integer().min(0).optional(),
    order_no: Joi.number().integer().min(1).optional(),
    childmenu: Joi.array().items(Joi.object().keys({
        menu_Name: Joi.string().trim().optional(),
        status: Joi.string().valid('enabled', 'disabled').optional(),
        link: Joi.string().uri().optional(),
        type: Joi.number().valid('main', 'sub').optional(),
        target: Joi.number().integer().min(0).optional(),
        order_no: Joi.number().integer().min(1).optional(),
        subchildmenu: Joi.array().items(Joi.object().keys({
            menu_Name: Joi.string().trim().optional(),
            status: Joi.string().valid('enabled', 'disabled').optional(),
            link: Joi.string().uri().optional(),
            type: Joi.number().valid('main', 'sub').optional(),
            target: Joi.number().integer().min(0).optional(),
            order_no: Joi.number().integer().min(1).optional()
        }))
    }))
});

  // const createMenu = {
  //   body: Joi.object().keys({
  //      menu_Name: Joi.string().trim().optional(),
  //       type: Joi.string().optional(),
  //       status: Joi.boolean().optional(),
  //       order_no: Joi.number().optional(),
  //       link: Joi.string().trim().optional(),
  //       target: Joi.number().optional(),
        
  //     }),}

  const updateMenu = Joi.object().keys({
    menu_Name: Joi.string().trim().optional(),
    status: Joi.string().valid('enabled', 'disabled').optional(),
    link: Joi.string().uri().optional(),
    type: Joi.number().valid('main', 'sub').optional(),
    target: Joi.number().integer().min(0).optional(),
    order_no: Joi.number().integer().min(1).optional(),
    childmenu: Joi.array().items(Joi.object().keys({
        menu_Name: Joi.string().trim().optional(),
        status: Joi.string().valid('enabled', 'disabled').optional(),
        link: Joi.string().uri().optional(),
        type: Joi.number().valid('main', 'sub').optional(),
        target: Joi.number().integer().min(0).optional(),
        order_no: Joi.number().integer().min(1).optional(),
        subchildmenu: Joi.array().items(Joi.object().keys({
            menu_Name: Joi.string().trim().optional(),
            status: Joi.string().valid('enabled', 'disabled').optional(),
            link: Joi.string().uri().optional(),
            type: Joi.number().valid('main', 'sub').optional(),
            target: Joi.number().integer().min(0).optional(),
            order_no: Joi.number().integer().min(1).optional()
        }))
    }))
});
// const listMenus={
// params: Joi.object().keys({
//         id: Joi.number().required(),
//       }),
// }
const deleteMenu=Joi.object({
  params: Joi.object({
      id: Joi.number().required()
  }).required()
});

module.exports = {
    deleteMenu,
    // listMenus,
    updateMenu,
    createMenu,
    getMenuById,
 
};