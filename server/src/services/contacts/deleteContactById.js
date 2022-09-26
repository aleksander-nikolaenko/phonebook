const { Contact } = require("../../models/contact");

const deleteContactById = (contactId) => {
  const result = Contact.findByIdAndRemove(contactId, {
    select: "-createdAt -updatedAt",
  });
  return result;
};

module.exports = deleteContactById;
