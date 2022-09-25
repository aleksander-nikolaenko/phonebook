const bcrypt = require("bcrypt");
const randomize = require("randomatic");
const { createError } = require("../../helpers");
const { sendNewPassword } = require("../../services/email");
const serviceUsers = require("../../services/users");

const sendPassword = async (req, res) => {
  const { email } = req.body;

  const user = await serviceUsers.getUserByEmail(email);
  if (!user) {
    throw createError(400, "Email is wrong, user not found");
  }
  const newPassword = randomize("Aa0)", 8);
  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(process.env.HASH_POWER)
  );
  const updateUser = await serviceUsers.updateUserPasswordByEmail(
    email,
    hashPassword
  );
  if (!updateUser) {
    throw createError(400, "Email is wrong, user not found");
  }
  await sendNewPassword(email, newPassword);

  res.status(200).json({
    message: `New password sent to ${email} email address`,
  });
};

module.exports = sendPassword;
