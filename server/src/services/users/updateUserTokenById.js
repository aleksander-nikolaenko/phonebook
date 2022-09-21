const { User } = require("../../models/user");

const updateUserTokenById = (userId, userToken) => {
  const result = User.findByIdAndUpdate(
    userId,
    { token: userToken },
    { new: true }
  );
  return result;
};

module.exports = updateUserTokenById;
