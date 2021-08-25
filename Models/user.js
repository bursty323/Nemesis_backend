const mongoose = require("mongoose");
const Joi = require("joi-browser");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  address: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().required(),
    mobile_no: Joi.string().min(10).max(10).required(),
    email: Joi.string().min(5).max(255).required().email(),
    address: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
