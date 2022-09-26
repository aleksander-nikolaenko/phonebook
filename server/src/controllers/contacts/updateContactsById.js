const { createError } = require("../../helpers");
const serviceContacts = require("../../services/contacts");

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await serviceContacts.updateContactById(id, req.body);
  if (!result) {
    throw createError(404);
  }
  res.status(200).json({
    message: "Contact updated successfully",
    contact: {
      name: result.name,
      email: result.email,
      phone: result.phone,
      favorite: result.favorite,
      owner: result.owner,
      _id: result._id,
    },
  });
};

module.exports = updateContactById;
