const { User } = require("../../models/user");

const deleteUserById = (id) => {
  const result = User.findByIdAndRemove(id);
  return result;
};

module.exports = deleteUserById;
