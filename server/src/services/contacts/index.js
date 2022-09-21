const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContactById = require("./deleteContactById");
const deleteContactsByOwner = require("./deleteContactsByOwner");
const updateContactById = require("./updateContactById");
const updateContactFavoriteById = require("./updateContactFavoriteById");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  deleteContactsByOwner,
  updateContactById,
  updateContactFavoriteById,
};
