const express = require("express");
const ctrlContacts = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validation, auth } = require("../../middleware");
const { schemas } = require("../../models/contact");

const router = new express.Router();

router.get("/", auth, ctrlWrapper(ctrlContacts.getAllContacts));

router.post(
  "/",
  auth,
  validation(schemas.add),
  ctrlWrapper(ctrlContacts.addContact)
);

router.delete("/:id", auth, ctrlWrapper(ctrlContacts.deleteContactById));

router.patch(
  "/:id",
  auth,
  validation(schemas.update),
  ctrlWrapper(ctrlContacts.updateContactById)
);

// router.get("/", auth, ctrlWrapper(ctrlContacts.getContacts));

// router.get("/:id", validationToken, ctrlWrapper(ctrlContacts.getContactById));

// router.patch(
//   "/:id/favorite",
//   validationToken,
//   validationReqBody(schemas.updateFavorite),
//   ctrlWrapper(ctrlContacts.updateContactFavoriteById)
// );

module.exports = router;
