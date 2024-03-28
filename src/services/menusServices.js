
const db = require('../../model/index');
const menuService = {};

// menuService.createMenu = async (menuData) => {
//     try {
//         const newMenu = await db.menus.create(menuData);
//         console.log("newmenu",newMenu);
//         await newMenu.save()
//         return newMenu;
//     } catch (error) {
//         throw error;
//     }
// };
menuService.createMenu = async (menuData) => {
    try {
        if (Array.isArray(menuData)) {
            // Perform bulk creation
            const createdMenus = await db.menus.bulkCreate(menuData);
            return createdMenus;
        } else {
            // Perform single creation
            const newMenu = await db.menus.create(menuData);
            return [newMenu]; // Wrap single menu in an array for consistency
        }
    } catch (error) {
        throw error;
    }
};
menuService.updateMenu = async (id, updateBody) => {
    const [updatedRows] = await db.menus.update(updateBody, { where: { id }, returning: true });
    if (updatedRows === 0) {
        throw new Error('Menu not found or not updated');
    }
    const updatedMenu = await db.menus.findByPk(id);
    return updatedMenu;
};
menuService.dropId = async (id) => {
    return db.menus.destroy({ where: { id } });
  };
  menuService.getAll = async () => {
    return db.menus.findAll({});
    if (!viewdetails || viewdetails.length === 0) {
      return { isSuccess: false, message: "No records Found!" };
  }
  };
  
// menuService.updateMenu= async (id, updateBody) => {
//     await db.menus.update(updateBody, { where: { id } });
//   };
  
  
// menuService.updateMenu = async (id, updatedMenuData) => {
//     try {
//         const [rowsUpdated, [updatedMenu]] = await db.menus.update(updatedMenuData, {
//             where: { id },
//             returning: true // Return the updated record
//         });
//         if (rowsUpdated === 0) {
//             throw new Error('Menu not found or not updated');
//         }
//         return updatedMenu;
//     } catch (error) {
//         throw error;
//     }
// };

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




