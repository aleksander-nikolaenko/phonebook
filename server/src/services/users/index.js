const getUserByEmail = require("./getUserByEmail");
const getUserById = require("./getUserById");
const addUser = require("./addUser");
const deleteUserById = require("./deleteUserById");
const updateUserTokenById = require("./updateUserTokenById");
const updateUserSubscriptionById = require("./updateUserSubscriptionById");
const updateUserAvatarById = require("./updateUserAvatarById");
const getUserByVerificationToken = require("./getUserByVerificationToken");
const updateUserVerificationById = require("./updateUserVerificationById");
const updateUserPasswordByEmail = require("./updateUserPasswordByEmail");

module.exports = {
  getUserByEmail,
  getUserById,
  addUser,
  deleteUserById,
  updateUserTokenById,
  updateUserSubscriptionById,
  updateUserAvatarById,
  getUserByVerificationToken,
  updateUserVerificationById,
  updateUserPasswordByEmail,
};
