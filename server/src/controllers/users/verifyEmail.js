const serviceUser = require("../../services/users");
const { createError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await serviceUser.getUserByVerificationToken(verificationToken);
  if (!user) {
    throw createError(404);
  }
  const token = user.createToken();

  const updToken = await serviceUser.updateUserTokenById(user._id, token);
  if (!updToken) {
    throw createError(404);
  }
  const updVerification = await serviceUser.updateUserVerificationById(
    user._id
  );
  if (!updVerification) {
    throw createError(404);
  }
  res.redirect(`${process.env.FRONTEND_URL}/redirect?token=${token}`);
};

module.exports = verifyEmail;
