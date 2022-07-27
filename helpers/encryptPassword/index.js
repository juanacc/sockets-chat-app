const bcrypt = require('bcryptjs');

exports.encryptPassword = password => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

exports.validPassword = (password, passwordDB) => bcrypt.compareSync(password, passwordDB);