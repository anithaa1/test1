/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-async-promise-executor */
/* eslint-disable camelcase */
const Sequelize = require('sequelize');
const axios = require('axios');
const  bannerService  = require('../services/bannerServices');
const db = require('../../model/index');

const { Op } = Sequelize;
const banner={}
banner.createbanner = async (req, res) => {
    console.log("kkk",req.body);

    console.log("Creating banner...", req.body.group);
  try {
    const user= bannerService.getuser(req.body.id);

      const data = await bannerService.create(req.body);
      console.log("gh",data);
      res.status(200).send({ status: true, message: 'Banner created successfully', data });
  
  } catch (err) {
    res.status(500).send({ status: false, message: err?.message });
  }
};

banner.getId = async (req, res) => {
    console.log("bhb");
  try {
    const data = await bannerService.getById(req.params.id);
    if (!data) {
      res.status(404).send({ status: false, message: 'Banner Data not found' });
      return;
    }
    // if (data.group && req.jwt.claims.groups.includes(data.group)) {
    res.status(200).send({ status: true, data });
    // } else {
    //   res.status(401).send({ message: 'unauthorized' });
    // }
  } catch (err) {
    res.status(500).send({ status: false, message: err?.message });
  }
};

banner.updatebanner = async (req, res) => {
    console.log("re",req.params.id);
    console.log("re",req.body);

  try {
  
       const dataget = await bannerService.getById(req.params.id);
      console.log("j",dataget);
      if (!dataget) {
        res.status(404).send({ status: false, message: 'Banner Data not found' });
        return;
      }
      
      await bannerService.updateById(req.params.id, req.body);
      res.status(200).send({ message: 'Banner updated succesfully' });
    
    
  } catch (err) {
    res.status(500).send({ status: false, message: err?.message });
  }
};

banner.deletebanner= async (req, res) => {
  try {
    // Get banner data by ID
    const dataget = await bannerService.getById(req.params.id);

    // Check if the user is an admin and has access to delete the banner
    
      // Delete the banner
      const data = await bannerService.dropId(req.params.id);
      if (!data) {
        res.status(404).send({ status: false, message: 'Banner not found' });
        return;
      }
      res.status(200).send({ status: true, message: 'Banner deleted successfully' });
    
  } catch (err) {
    // Handle errors
    res.status(500).send({ status: false, message: err?.message });
  }
};

  banner.findAll = async (req, res) => {
    try {
      const allBanners = await bannerService.getAll();
      res.status(200).send({ status: true, banners: allBanners });
    } catch (err) {
      console.error("Error fetching banners:", err);
      res.status(500).send({ status: false, message: "Failed to fetch banners" });
    }
  };

  
banner.findAllSecure = (req, res) => {
  const { page_no = 1, page_size: limit = 10, search, type, status, col, order } = req.query;

  let condition = null;
  const fsearch = [];
  let listData;

  fsearch.push({ group: { [Op.in]: req.jwt.claims.groups } });

  if (search) {
    fsearch.push({ name: { [Op.iLike]: `%${search}%` } });
  }
  if (type) {
    fsearch.push({ banner_type: `${type}` });
  }
  if (status) {
    fsearch.push({ status: `${status}` });
  }

  if (fsearch.length > 0) {
    condition = {
      [Op.and]: fsearch,
    };
  }
  const offset = (page_no - 1) * limit;

  if (col === 'name') {
    if (order === 'asc') {
      listData = db.banners.findAndCountAll({ where: condition, order: [['name', 'ASC']], limit, offset });
    } else {
      listData = db.banners.findAndCountAll({ where: condition, order: [['name', 'DESC']], limit, offset });
    }
  } else if (col === 'order') {
    if (order === 'desc') {
      listData = db.banners.findAndCountAll({ where: condition, order: [['order_number', 'DESC']], limit, offset });
    } else {
      listData = db.banners.findAndCountAll({ where: condition, order: [['order_number', 'ASC']], limit, offset });
    }
  } else {
    // listData = db.banners.findAndCountAll({ where: condition, order: [['updatedAt', 'DESC']], limit, offset });
    listData = db.banners.findAndCountAll({ where: condition, order: [['id', 'DESC']], limit, offset });
  }

  // db.banners.findAndCountAll({ where: condition, order: [['name', 'ASC']], limit, offset })
  listData
    .then((data) => {
      const { count: totalbanners, rows: banners } = data;

      const totalPageCount = Math.ceil(totalbanners / limit);

      

      const pageperdata = banners.length;
      res.send({ totalbanners, totalPageCount, page_no, pageperdata, page_size: limit, banners });
    })
    .catch((err) => {
      res.status(500).send({
        message: err?.message,
      });
    });
};





module.exports = banner
 