const bcrypt = require('bcryptjs');

const hashPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(plainPassword, salt);
};

const checkHashedPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  checkHashedPassword
}