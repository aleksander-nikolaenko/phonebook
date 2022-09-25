const bcrypt = require("bcrypt");
const serviceUsers = require("../../services/users");
const { createError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await serviceUsers.getUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw createError(400, "Email or password is wrong");
  }
  if (!user.verify) {
    throw createError(403, "Email not verify");
  }
  const token = user.createToken();
  const updToken = await serviceUsers.updateUserTokenById(user._id, token);
  if (!updToken) {
    throw createError(401, "Not registered, token missed");
  }
  res.json({
    message: "Authentification success.",
    token,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
