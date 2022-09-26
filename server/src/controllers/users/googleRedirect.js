const queryString = require("query-string");
const axios = require("axios");
const bcrypt = require("bcrypt");
const serviceUsers = require("../../services/users");
const serviceContacts = require("../../services/contacts");
const { createError } = require("../../helpers");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { id, name, email, picture: avatarURL } = userData.data;
  const hashPassword = await bcrypt.hash(id, Number(process.env.HASH_POWER));
  let user = await serviceUsers.getUserByEmail(email);
  if (!user) {
    user = await serviceUsers.addUser({
      name,
      email,
      password: hashPassword,
      avatarURL,
      verificationToken: "google-auth",
      verify: true,
    });
    await serviceContacts.addContact({
      name: "My contacts",
      email,
      phone: "+111111111111",
      owner: user._id,
    });
  }
  const token = user.createToken();
  const updToken = await serviceUsers.updateUserTokenById(user._id, token);
  if (!updToken) {
    throw createError(401, "Not registered, token missed");
  }
  res.redirect(`${process.env.FRONTEND_URL}/redirect?token=${token}`);
};
module.exports = googleRedirect;
