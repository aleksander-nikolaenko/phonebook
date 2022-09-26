const { createError } = require("../../helpers");
const serviceContacts = require("../../services/contacts");

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await serviceContacts.deleteContactById(id);
  if (!result) {
    throw createError(404);
  }
  res.status(200).json({
    message: "Contact deleted successfully",
    contact: result,
  });
};

module.exports = deleteContactById;
