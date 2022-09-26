const serviceContacts = require("../../services/contacts");

const getAllContacts = async (req, res) => {
  const { id } = req.user;
  const result = await serviceContacts.getAllContacts(id);
  res.status(200).json(result);
};
module.exports = getAllContacts;
