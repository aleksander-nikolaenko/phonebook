const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const serviceUsers = require("../../services/users");
const serviceContacts = require("../../services/contacts");
const { createError } = require("../../helpers");
const { sendVerifyEmail } = require("../../services/email");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await serviceUsers.getUserByEmail(email);
  if (user) {
    throw createError(409, `Email is already used`);
  }
  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.HASH_POWER)
  );
  const verificationToken = await sendVerifyEmail(email);
  const newUser = await serviceUsers.addUser({
    ...req.body,
    password: hashPassword,
    avatarURL: gravatar.url(email),
    verificationToken,
  });
  await serviceContacts.addContact({
    name: "My contacts",
    email,
    phone: "+111111111111",
    owner: newUser._id,
  });
  res.status(201).json({
    message: `User created. Please check your email: ${email} and confirm then.`,
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
