
const menuService = require('../services/menusServices');
const rescodes = require('../utils/rescode');
const menus = {}
//
menus.createMenu = async (req, res) => {
    try {
        const { childmenu, ...mainmenus } = req.body;
        let mainmenusId;
        // Check if the user is an admin

        // Check if the main menu ID is provided and if it matches the ID in the request params
        if (mainmenus?.id && mainmenus?.id === req.params.id) {
            // Update the main menu
            const updatedMainmenu = await menuService.updateMenu(mainmenus.id, mainmenus);
            console.log("Main menu updated successfully", updatedMainmenu);
            mainmenusId = mainmenus.id;
        } else {
            // Create a new main menu
            const createdMainMenus = await menuService.createMenu([mainmenus]);
            mainmenusId = createdMainMenus[0].id;
        }

        // Process child menus
        if (childmenu) {
            for (const { subchildmenu, ...item } of childmenu) {
                let childmenuId;

                // Check if the child menu ID is provided
                if (item?.id) {
                    // Update the child menu
                    const updatedChildMenu = await menuService.updateMenu(item.id, item);
                    console.log("Child menu updated successfully", updatedChildMenu);
                    childmenuId = item.id;
                } else {
                    // Create a new child menu
                    item.mainmenuid = mainmenusId;
                    const createdChildMenu = await menuService.createMenu([item]);
                    childmenuId = createdChildMenu[0].id;
                }

                // Process subchild menus
                if (subchildmenu) {
                    for (const citem of subchildmenu) {
                        if (citem?.id) {
                            // Update the subchild menu
                            const updatedSubchildMenu = await menuService.updateMenu(citem.id, citem);
                            console.log("Subchild menu updated successfully", updatedSubchildMenu);
                        } else {
                            // Create a new subchild menu
                            citem.mainmenuid = childmenuId;
                            await menuService.createMenu([citem]);
                        }
                    }
                }
            }
        }



        res.status(200).send({ status: true, message: 'Menu created/updated successfully' });
    } catch (err) {
        res.status(500).send({ status: false, message: err?.message });
    }
};


menus.findAll = async (req, res) => {
    try {
        const data = await menuService.getAll(req.body);
        const mainmenu = [];
        const submenus = [];

        // Filter main menu items and submenus
        data.forEach(item => {
            if (item.mainmenuid === null && item.status === true) {
                mainmenu.push({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    status: item.status,
                    orderno: item.orderno,
                    link: item.link,
                    target: item.target,
                    mainmenuid: item.mainmenuid,
                    childmenu: [] // Initialize childmenu array for main menu
                });
            } else if (item.mainmenuid !== null && item.status === true) {
                submenus.push({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    status: item.status,
                    orderno: item.orderno,
                    link: item.link,
                    target: item.target,
                    mainmenuid: item.mainmenuid
                });
            }
        });

        // Attach submenus to corresponding main menu items
        mainmenu.forEach(mainItem => {
            mainItem.childmenu = getSubMenus(mainItem.id, submenus);
        });

        if (!data) {
            res.status(404).send({ status: false, message: 'Menu Data not found' });
            return;
        }
        res.status(200).send({ mainmenu });
    } catch (err) {
        res.status(500).send({ status: false, message: err?.message });
    }
}

// Function to recursively fetch submenus
const getSubMenus = (parentId, submenus) => {
    const result = [];
    submenus.forEach(subItem => {
        if (subItem.mainmenuid === parentId) {
            const subMenu = {
                id: subItem.id,
                name: subItem.name,
                type: subItem.type,
                status: subItem.status,
                orderno: subItem.orderno,
                link: subItem.link,
                target: subItem.target,
                mainmenuid: subItem.mainmenuid
            };
            const subChildMenus = getSubMenus(subItem.id, submenus);
            if (subChildMenus.length > 0) {
                subMenu.childmenu = subChildMenus;
            }
            result.push(subMenu);
        }
    });
    return result;
}

menus.deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        // Get all menus including main menus and their submenus
        const menus = await menuService.getAll();

        // Find the main menu to delete by ID
        const mainMenuToDelete = menus.find(menu => menu.id === id);

        if (!mainMenuToDelete) {
            res.status(404).send({ status: false, message: 'Main menu not found' });
            return;
        }

        // Add menu IDs to delete (including child and subchild menus)
        const idsToDelete = [];

        // Function to recursively collect child and subchild menu IDs
        const collectMenuIds = (menu) => {
            idsToDelete.push(menu.id);
            if (menu.childmenu && menu.childmenu.length > 0) {
                menu.childmenu.forEach(child => {
                    collectMenuIds(child);
                    if (child.subchildmenu && child.subchildmenu.length > 0) {
                        child.subchildmenu.forEach(subchild => {
                            idsToDelete.push(subchild.id);
                        });
                    }
                });
            }
        };

        // Collect IDs starting from the main menu
        collectMenuIds(mainMenuToDelete);

        // Delete menus by IDs
        const deletedIds = await menuService.dropId(idsToDelete);

        // Check if all menu IDs were successfully deleted
        if (!deletedIds) {
            res.status(404).send({ status: false, message: 'Menus not found' });
            return;
        }

        res.status(200).send({ status: true, message: 'Menu and associated data deleted successfully' });
    } catch (err) {
        res.status(500).send({ status: false, message: err?.message });
    }
};




menus.deleteSubmenusId = async (req, res) => {
    try {
        const mainMenuId = req.params.id;

        // Get all menus including main menus and their child menus
        const allMenus = await menuService.getAll();

        // Find the main menu and its child menus based on the provided main menu ID
        const submenusToDelete = allMenus.filter(menu => menu.id === mainMenuId || menu.mainmenuid === mainMenuId);

        // Extract IDs of the main menu and its child menus
        const idsToDelete = submenusToDelete.map(menu => menu.id);

        // Delete the main menu and its child menus
        const deletedSubmenus = await menuService.dropId(idsToDelete);

        if (!deletedSubmenus) {
            res.status(404).send({ status: false, message: 'Menus not found' });
            return;
        }

        res.status(200).send({ status: true, message: 'Main menu and its child menus deleted successfully' });
    } catch (err) {
        res.status(500).send({ status: false, message: err?.message });
    }
};

menus.getMenuById = async (req, res) => {

    try {
        const data = await menuService.getAll(req.body);
        const mainMenus = [];
        const submenus = [];

        // Filter main menu items and submenus
        data.forEach(item => {
            if (item.mainmenuid === null) {
                mainMenus.push({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    status: item.status,
                    orderno: item.orderno,
                    link: item.link,
                    target: item.target,
                    mainmenuid: item.mainmenuid,
                    childmenu: [] // Initialize childmenu array for main menu
                });
            } else {
                submenus.push({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    status: item.status,
                    orderno: item.orderno,
                    link: item.link,
                    target: item.target,
                    mainmenuid: item.mainmenuid
                });
            }
        });

        // Attach submenus to corresponding main menu items
        mainMenus.forEach(mainItem => {
            mainItem.childmenu = getSubMenus(mainItem.id, submenus);
        });

        // Filter menu data by ID
        const { id } = req.params;
        const singleData = mainMenus.find(item => item.id === id);

        if (!singleData) {
            res.status(404).send({ status: false, message: 'Menu Data not found' });
            return;
        }
        res.status(200).send({ status: true, singleData });
    } catch (err) {
        res.status(500).send({ status: false, message: err?.message });
    }
};

// Recursive function to fetch submenus including subchild menus
const getSubMenuss = (parentId, submenus) => {
    const result = [];
    submenus.forEach(subItem => {
        if (subItem.mainmenuid === parentId) {
            const subMenu = {
                id: subItem.id,
                name: subItem.name,
                type: subItem.type,
                status: subItem.status,
                orderno: subItem.orderno,
                link: subItem.link,
                target: subItem.target,
                mainmenuid: subItem.mainmenuid,
                childmenu: [] // Initialize childmenu array for submenu
            };
            // Recursively fetch subchild menus
            const subChildMenus = getSubMenuss(subItem.id, submenus);
            if (subChildMenus.length > 0) {
                subMenu.childmenu = subChildMenus;
            }
            result.push(subMenu);
        }
    });
    return result;
};




module.exports = menus

