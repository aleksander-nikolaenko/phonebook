const getContacts = require("./getContacts");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactsById");
const addContact = require("./addContact");
const deleteContactById = require("./deleteContactById");
const updateContactById = require("./updateContactsById");
const updateContactFavoriteById = require("./updateContactFavoriteById");

module.exports = {
  getContacts,
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateContactFavoriteById,
};
