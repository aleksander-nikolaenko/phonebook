const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email({ tlds: false }),
  phone: Joi.string().pattern(/^\+?[0-9]?[0-9]?([0-9]{10})$/),
  favorite: Joi.boolean(),
});
const updateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email({ tlds: false }),
  phone: Joi.string().pattern(/^\+?[0-9]?[0-9]?([0-9]{10})$/),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = {
  add: addSchema,
  update: updateSchema,
  updateFavorite: updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
