const bcrypt = require('bcrypt'); 

module.exports.compare = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
}

module.exports.generateHash = async (password) => {
  const salt = await bcrypt.genSaltSync();
  return await bcrypt.hashSync(password, salt);
}