const { Contact } = require("../../models/contact");

const getAllContacts = (id) => {
  const result = Contact.find({ owner: id }, "-createdAt -updatedAt");

  return result;
};

module.exports = getAllContacts;
