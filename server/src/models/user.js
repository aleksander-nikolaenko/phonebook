const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const nameRegexp = /^[A-z][A-z0-9-_-\s?]{2,}$/;
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    subscription: {
      type: String,
      enum: {
        values: ["starter", "pro", "business"],
        message:
          "{VALUE} is not supported, have to choose between 'starter', 'pro' or 'business' ",
      },
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.createToken = function () {
  const payload = {
    id: this._id,
    roles: this.subscription,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
  });
};

const registerSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(2).max(50).required().messages({
    "string.base":
      "Sorry! It looks like something went wrong. Please try later.",
    "string.pattern.base":
      "Please fill a valid name contains letters, numbers and symbols '-'' '_' ",
    "string.empty": "Name is not allowed to be empty",
    "string.min": "Name length must be at least 2 characters long",
    "string.max":
      "Name length must be less than or equal to 50 characters long",
  }),
  email: Joi.string().pattern(emailRegexp).min(6).max(50).required().messages({
    "string.base":
      "Sorry! It looks like something went wrong. Please try later.",
    "string.pattern.base": "Please fill a valid email address",
    "string.empty": "Email is not allowed to be empty",
    "string.min": "Email length must be at least 6 characters long",
    "string.max":
      "Email length must be less than or equal to 50 characters long",
  }),
  password: Joi.string()
    .regex(passwordRegexp)
    .min(6)
    .max(50)
    .required()
    .messages({
      "string.base":
        "Sorry! It looks like something went wrong. Please try later.",
      "string.pattern.base":
        "Password must contain 6 to 50 letters and numbers",
      "string.empty": "Password is not allowed to be empty",
      "string.min": "Email length must be at least 6 characters long",
      "string.max":
        "Password length must be less than or equal to 50 characters long",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(6).max(50).required().messages({
    "string.base":
      "Sorry! It looks like something went wrong. Please try later.",
    "string.pattern.base": "Please fill a valid email address",
    "string.empty": "Email is not allowed to be empty",
    "string.min": "Email length must be at least 6 characters long",
    "string.max":
      "Email length must be less than or equal to 50 characters long",
  }),
  password: Joi.string()
    .regex(passwordRegexp)
    .min(6)
    .max(50)
    .required()
    .messages({
      "string.base":
        "Sorry! It looks like something went wrong. Please try later.",
      "string.pattern.base":
        "Password must contain 6 to 50 letters and numbers",
      "string.empty": "Password is not allowed to be empty",
      "string.min": "Email length must be at least 6 characters long",
      "string.max":
        "Password length must be less than or equal to 50 characters long",
    }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(6).max(50).required().messages({
    "string.base":
      "Sorry! It looks like something went wrong. Please try later.",
    "string.pattern.base": "Please fill a valid email address",
    "string.empty": "Email is not allowed to be empty",
    "string.min": "Email length must be at least 6 characters long",
    "string.max":
      "Email length must be less than or equal to 50 characters long",
  }),
});

const schemas = {
  register: registerSchema,
  login: loginSchema,
  update: updateSubscriptionSchema,
  verify: verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
