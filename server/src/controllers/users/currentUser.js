const serviceUsers = require("../../services/users");
const { createError } = require("../../helpers");
const currentUser = async (req, res) => {
  const user = await serviceUsers.getUserById(req.user._id);
  if (!user) {
    throw createError(404);
  }
  res.status(200).json({
    message: "User authenticate success",
    user: req.user,
  });
};

module.exports = currentUser;
