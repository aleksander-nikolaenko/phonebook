const register = require("./register");
const verifyEmail = require("./verifyEmail");
const repeatVerifyEmail = require("./repeatVerifyEmail");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const deleteUser = require("./deleteUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register,
  verifyEmail,
  repeatVerifyEmail,
  googleAuth,
  googleRedirect,
  login,
  logout,
  currentUser,
  deleteUser,
  updateSubscription,
  updateAvatar,
};
