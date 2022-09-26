const { Contact } = require("../../models/contact");

const updateContactById = (contactId, contact) => {
  const result = Contact.findByIdAndUpdate(
    { _id: contactId },
    {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    },
    {
      select: "-createdAt -updatedAt",
      new: true,
    }
  );
  return result;
};

module.exports = updateContactById;
