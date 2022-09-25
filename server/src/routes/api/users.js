const express = require("express");
const ctrlUsers = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { validation, auth } = require("../../middleware");
const { schemas } = require("../../models/user");

const router = new express.Router();

router.post(
  "/register",
  validation(schemas.register),
  ctrlWrapper(ctrlUsers.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrlUsers.verifyEmail));
router.post(
  "/verify",
  validation(schemas.verify),
  ctrlWrapper(ctrlUsers.repeatVerifyEmail)
);
router.post(
  "/forgot-password",
  validation(schemas.verify),
  ctrlWrapper(ctrlUsers.sendPassword)
);

router.get("/google", ctrlWrapper(ctrlUsers.googleAuth));

router.get("/google-redirect", ctrlWrapper(ctrlUsers.googleRedirect));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrlUsers.login));

router.get("/logout", auth, ctrlWrapper(ctrlUsers.logout));

router.get("/", auth, ctrlWrapper(ctrlUsers.currentUser));

router.delete("/", auth, ctrlWrapper(ctrlUsers.deleteUser));

// router.patch(
//   "/",
//   validationToken,
//   validationReqBody(schemas.update),
//   ctrlWrapper(ctrlUsers.updateSubscription)
// );

// router.patch(
//   "/avatars",
//   validationToken,
//   fileUpload.single("avatar"),
//   ctrlWrapper(ctrlUsers.updateAvatar)
// );

module.exports = router;
