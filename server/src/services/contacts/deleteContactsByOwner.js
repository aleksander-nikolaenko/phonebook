const { Contact } = require("../../models/contact");

const deleteContactsByOwner = (contactsOwner) => {
  const result = Contact.deleteMany({ owner: contactsOwner });
  return result;
};

module.exports = deleteContactsByOwner;
