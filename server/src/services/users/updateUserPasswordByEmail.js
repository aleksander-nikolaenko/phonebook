const { User } = require("../../models/user");

const updateUserPasswordByEmail = (userEmail, userPassword) => {
  const result = User.findOneAndUpdate(
    { email: userEmail },
    { password: userPassword },
    {
      select: "-createdAt -updatedAt",
      new: true,
    }
  );
  return result;
};

module.exports = updateUserPasswordByEmail;
