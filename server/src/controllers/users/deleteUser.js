const serviceUsers = require("../../services/users");
const serviceContacts = require("../../services/contacts");
const { createError } = require("../../helpers");

const deleteUser = async (req, res) => {
  const { _id: id } = req.user;

  const user = await serviceUsers.deleteUserById(id);
  if (!user) {
    throw createError(404);
  }
  const result = await serviceContacts.deleteContactsByOwner(id);
  console.log(result);
  if (!result) {
    throw createError(404);
  }

  res.status(200).json({
    message: "User and user information deleted successfully",
    user,
  });
};
module.exports = deleteUser;
