const bcrypt = require("bcrypt");

exports.decodePassword = (password, hashedPwd) => {
  return bcrypt.compareSync(password, hashedPwd)
};
