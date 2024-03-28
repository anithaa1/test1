const ApiService = require('../services/apiServices');

const info = 'API call  Data not found';


const GetId = async (req, res) => {
  try {
    const getdata = await ApiService.getById(req.params.id);
    if (!getdata) {
      res.status(404).send({ status: false, message: info });
      return;
    }
    res.status(200).send({ status: true, getdata });
  } catch (err) {
    res.status(500).send({ status: false, message: err?.message });
  }
};

const GetAll = async (req, res) => {
  try {
    const event= await ApiService.getAll()
    res.status(200).send({ status: true, data:event });

    // const { email, status, type } = req.query;

    // const filter = {};
    // if (email !== undefined) {
    //   filter.email = email;
    // }
    // if (status !== undefined) {
    //   filter.status = status;
    // }
    // if (type !== undefined) {
    //   filter.type = type;
    // }
    // const page = parseInt(req.query.page, 10) || 1;//10content
    // const limit = parseInt(req.query.limit, 10) || 100000;
    // const offset = (page - 1) * limit;
    // const [data, totalPages, totalCount] = await ApiService.getAll(filter,limit, offset);
    // res.status(200).json({
    //   totalPages,
    //   totalRecords: totalCount,
    //   currentPage: page,
    //   offset,
    //   data,
    // });
  } catch (err) {
    res.status(500).send({ status: false, message: err?.message });
  }
};
// app.get('/api/dropdowns', authenticateUser, (req, res) => {
//   // Check if the user is an admin
//   if (req.user.role === 'admin') {
//     res.json(allDropdowns);
//   } else {
//     res.status(403).json({ error: 'Unauthorized access' });
//   }
// });
// app.get('/api/dropdown/:id', authenticateUser, (req, res) => {
//   const dropdownId = parseInt(req.params.id);
//   // Check if the user is authorized to view this dropdown
//   if (dropdownId === 1) {
//     // Allow access for the first dropdown (example)
//     const dropdown = allDropdowns.find(d => d.id === dropdownId);
//     if (dropdown) {
//       res.json(dropdown);
//     } else {
//       res.status(404).json({ error: 'Dropdown not found' });
//     }
//   } else {
//     res.status(403).json({ error: 'Unauthorized access' });
//   }
// });





module.exports = {
  GetAll,
  GetId,
}
