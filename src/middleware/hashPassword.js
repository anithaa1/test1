const bcrypt = require('bcrypt');
function encryptPassword (password)  {
    const saltRounds = 10; // Number of salt rounds
    return bcrypt.hash(password, saltRounds);
  };

function decryptPassword (password)  {
    const saltRounds = 10; // Number of salt rounds
    return bcrypt.hash(password, saltRounds);
  };

  module.exports = {decryptPassword,encryptPassword}