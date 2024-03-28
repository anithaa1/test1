const Joi = require('joi');

const register={
    body: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string().required().regex(/^\d{10,15}$/).message('Please enter a valid phone number'), // Adjust the regex as per your phone number format requirements
    dob: Joi.date().required(),
    role:Joi.string()
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }),
};

const forgotpassword = {
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
  }),
};

const resetpassword = {
  body: Joi.object().keys({
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};



module.exports = {
    register,
  login,
  forgotpassword,
  resetpassword,
  logout,
 
};
