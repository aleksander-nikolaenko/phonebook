const getContacts = require("./getContacts");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContactById = require("./deleteContactById");
const deleteContactsByOwner = require("./deleteContactsByOwner");
const updateContactById = require("./updateContactById");
const updateContactFavoriteById = require("./updateContactFavoriteById");

module.exports = {
  getContacts,
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  deleteContactsByOwner,
  updateContactById,
  updateContactFavoriteById,
};
