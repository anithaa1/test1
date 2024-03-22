const Joi = require('joi');
const getMenuById = {
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  };
  const createMenu = {
    body: Joi.object().keys({
       menu_Name: Joi.string().trim().required(),
        type: Joi.string().required(),
        status: Joi.string().required(),
        order_no: Joi.string().required(),
        link: Joi.string().trim().required(),
        target: Joi.string().required(),
        
      }),}

const updateMenu = {
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
    body: Joi.object().keys({
       name: Joi.string().trim(),
        type: Joi.string().trim(),
        status: Joi.string().trim(),
        orderno: Joi.string().trim(),
        link: Joi.string().trim(),
        target: Joi.string().trim(),

      }),}
// const listMenus={
// params: Joi.object().keys({
//         id: Joi.number().required(),
//       }),
// }
const deleteMenu={
    params: Joi.object().keys({
        id: Joi.number().required(),
      }),
}


module.exports = {
    deleteMenu,
    // listMenus,
    updateMenu,
    createMenu,
    getMenuById,
 
};