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

    
  } catch (err) {
    res.status(500).send({ status: false, message: err?.message });
  }
};





module.exports = {
  GetAll,
  GetId,
}
