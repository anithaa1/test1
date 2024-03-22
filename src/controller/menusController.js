
const menuService = require('../services/menusServices');
const rescodes = require('../utils/rescode');
const menus={}

menus.createMenu = async (req, res,next) => {
    const  { menu_Name,status,link,type,target,order_no } = req.body; 
    console.log("req.body",req.body);
    try {
        const newMenu = await menuService.createMenu({
            menu_Name:menu_Name,
            status:status,
            link:link,
            type:type,
            target:target,
            order_no:order_no
        });
        console.log("newMenu",newMenu);
        res.response = { code: 201,data: { status: 'success',message: rescodes?.success } } 
     return next();                   
                 
    } catch (error) {
        console.error(error);
        res.response = {
            code: 500,
            data: { status: 'Error', message: rescodes?.wentWrong },
          };
          return next(); 
        }
    }


menus.updateMenu = async (req, res,next) => {
    const { id } = req.params;
    const updatedMenuData = req.body;
    try {
        const updatedMenu = await menuService.updateMenu(id, updatedMenuData);
        res.response = { code: 201,data: { status: 'success',message: rescodes?.success } } 
     return next();                   
                 
    } catch (error) {
        console.error(error);
        res.response = {
            code: 500,
            data: { status: 'Error', message: rescodes?.wentWrong },
          };
          return next(); 
        }
};

menus.getMenuById = async (req, res,next) => {
    const { id } = req.params;
    try {
        const menu = await menuService.getMenuById(id);
        console.log("menu",menu);
        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        // return res.status(200).json({ isSuccess: true, data: menu });
        res.response = { code: 201,data: { status: 'success',message: rescodes?.success,additionalData: menu} } 
        return next();                   
                    
       } catch (error) {
           console.error(error);
           res.response = {
               code: 500,
               data: { status: 'Error', message: rescodes?.wentWrong },
             };
             return next(); 
           }
};

menus.listMenus = async (req, res,next) => {
    try {
        const menus = await menuService.listMenus();
        console.log("data",menus);
        res.response = { code: 201,data: { status: 'success',message: rescodes?.success,data:menus } } 
        return next();                   
                    
       } catch (error) {
           console.error(error);
           res.response = {
               code: 500,
               data: { status: 'Error', message: rescodes?.wentWrong },
             };
             return next(); 
           }
};

menus.deleteMenu = async (req, res,next) => {
    const { id } = req.params;
    try {
        await menuService.deleteMenu(id);
        res.response = { code: 201,data: { status: 'success',message: rescodes?.success } } 
     return next();                   
                 
    } catch (error) {
        console.error(error);
        res.response = {
            code: 500,
            data: { status: 'Error', message: rescodes?.wentWrong },
          };
          return next(); 
        }
};

module.exports= menus
  
