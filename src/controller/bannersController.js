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
      // if (dataget.group === req.body.group) {
      //   await bannerService.updateById(req.params.id, req.body);
      //   res.status(200).send({ message: 'Banner updated succesfully' });
      // } else {
      //   res.status(500).send({ message: 'Something went wrong' });
      // }
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
//   banner.findAll = async (req, res) => {
//     try {
//       console.log("Fetching banners...");
  
//       // Fetch banners data
//       const todayBanners = await bannerService.getAll(req.body);
//       console.log("Banners fetched successfully:", todayBanners);
  
//       // Check if query parameter 'today' is set to 'true'
//       if (req.query.today === 'true') {
//         // Filter banners based on banner_type
//         const result = todayBanners.filter((data) => data.banner_type === 2);
//         const customResult = todayBanners.filter((data) => data.banner_type === 1);
  
//         // Process each banner asynchronously
//         const processedBanners = await Promise.all(result.map(async (data) => {
//           // Prepare headers and auth based on banner properties
//           const headers = {};
//           const auth = { username: '', password: '' };
//           if (data.endpoint_tokentype === 1) {
//             auth.username = data.username;
//             auth.password = data.password;
//           } else {
//             headers.Authorization = data.endpoint_token;
//           }
  
//           try {
//             // Make HTTP request to endpoint_url
//             const resp = await axios({
//               url: data.endpoint_url,
//               method: data.endpoint_type,
//               headers,
//               auth,
//               timeout: 5000,
//             });
  
//             // Process response data
//             Object.entries(resp.data).forEach(([key, value]) => {
//               if (typeof value !== 'object') {
//                 if (data.content.includes(`{{${key}}}`)) {
//                   data.content = data.content.replaceAll(`{{${key}}}`, value);
//                 }
//               }
//             });
  
//             // Update banner status and emailContent if API call is successful
//             if (!data.apibannerStatus || data.apibannerStatus === 'rejected' || data.apibannerStatus === '') {
//               await db.banners.update({ apibannerStatus: 'success', emailContent: '' }, { where: { id: data.id } });
//             }
  
//             return data;
//           } catch (e) {
//             // Update banner status and emailContent if API call fails
//             if (!data.apibannerStatus || data.apibannerStatus === 'success' || data.apibannerStatus === '') {
//               await db.banners.update({ apibannerStatus: 'rejected', emailContent: e.response.statusText || 'Unknown error' }, { where: { id: data.id } });
//             }
  
//             // Reject promise with error details
//             throw { status: e.response ? e.response.status : 500, message: e.code, messagedetail: e.response ? e.response.statusText : 'Unknown error', id: data.id };
//           }
//         }));
  
//         // Combine processed banners with custom banners
//         const homebanner = processedBanners.concat(customResult);
  
//         // Send response with processed banners
//         res.send({ status: true, homebanner });
//       } else {
//         res.status(400).send({ status: false, message: 'Invalid query parameter value for "today"' });
//       }
//     } catch (err) {
//       console.error("Error fetching banners:", err);
//       res.status(500).send({ status: false, message: err?.message });
//     }
//   };
  
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

      // if (banners) {
      //   banners.forEach(async (items) => {
      //     if ((items.end_date === null || items.end_date === '') && items.status === 1) {
      //       await db.banners.update({ status: 1 }, { where: { id: items.id } });
      //     } else if (!items.end_date || new Date() > new Date(items.end_date)) {
      //       await db.banners.update({ status: 2 }, { where: { id: items.id } });
      //     }
      //   });
      // }

      const pageperdata = banners.length;
      res.send({ totalbanners, totalPageCount, page_no, pageperdata, page_size: limit, banners });
    })
    .catch((err) => {
      res.status(500).send({
        message: err?.message,
      });
    });
};

// banner.testApi = (req, res) => {
//   res.send({
//     name: 'js  team',
//     title: ' Upcoming Events',
//     event: [
//       {name: "Node"},
//       {name: "React"},
//       {name: "Angular"},
//     ]
//   });
// };

banner.findbyid = (req, res) => {

  name = Angular

};

module.exports = banner
 