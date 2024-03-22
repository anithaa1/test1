
const db = require('../../model/index');
const menuService = {};

menuService.createMenu = async (menuData) => {
    try {
        const newMenu = await db.menus.create(menuData);
        console.log("newmenu",newMenu);
        return newMenu;
    } catch (error) {
        throw error;
    }
};

menuService.updateMenu = async (id, updatedMenuData) => {
    try {
        const [rowsUpdated, [updatedMenu]] = await db.menus.update(updatedMenuData, {
            where: { id },
            returning: true // Return the updated record
        });
        if (rowsUpdated === 0) {
            throw new Error('Menu not found or not updated');
        }
        return updatedMenu;
    } catch (error) {
        throw error;
    }
};

menuService.getMenuById = async (id) => {
    try {
        const menu = await db.menus.findByPk(id);
        return menu;
    } catch (error) {
        throw error;
    }
};

menuService.listMenus = async () => {
    try {
        const viewdetails= await db.menus.findAll({});
        console.log(viewdetails);
        if (!viewdetails || viewdetails.length === 0) {
            return { isSuccess: false, message: "No records Found!" };
          }
          return viewdetails;
    } catch (error) {
        throw error;
    }
};


menuService.deleteMenu = async (id) => {
    try {
        const rowsDeleted = await db.menus.destroy({
            where: { id }
        });
        if (rowsDeleted === 0) {
            throw new Error('Menu not found or not deleted');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = menuService




// const db = require('../../model/index');

// const createMenu = async (updatebody) => {
//   return db.menus.bulkCreate(updatebody);
// };

// const getById = async (id) => {
//   return db.menus.findOne({
//     attributes: ['id', 'name', 'type', 'status', 'mainmenuid'],
//     where: {
//       id,
//     },
//     group: ['menus.id'],
//   });
// };

// const getAll = async () => {
//   return db.menus.findAll({});
// };

// const updateById = async (id, updateBody) => {
//   await db.menus.update(updateBody, { where: { id } });
// };

// const dropId = async (id) => {
//   return db.menus.destroy({ where: { id } });
// };

// module.exports = {
//   createMenu,
//   getById,
//   getAll,
//   dropId,
//   updateById,
// };
