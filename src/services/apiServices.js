const db = require('../../model/index');



const getById = async (id) => {
  return db.apiCall.findOne({
    where: {
      id,
    },
  });
};


const getAll = async (filter, limit, offset,) => {
 const data = await db.api.findAll()
 return data
  // const whereClause = {};
  // if (filter) {
  //   if (filter.email !== undefined) {
  //     whereClause.email = filter.email;
  //   }
  //   if (filter.status !== undefined) {
  //     whereClause.status = filter.status;
  //   }
  //   if (filter.type !== undefined) {
  //     whereClause.type = filter.type;
  //   }
  // }
  // const listData = await db.api.findAndCountAll({
  //   order: [['createdAt', 'DESC']],
  //   limit: limit,
  //   offset: offset,
  //   where: whereClause,
  // });
  // const totalPages = Math.ceil(listData.rows.length / limit);
  // const totalCount = Math.ceil(listData.rows.length);
  // return [listData.rows, totalPages, totalCount];
};

module.exports = {
  getById,
  getAll
};
