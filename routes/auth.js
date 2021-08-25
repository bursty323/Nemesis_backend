const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi-browser");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const email = req.body.email;
  const pass = req.body.password;
  if (email !== "admin@nemasys.com" || pass !== "admin123") {
    return res.status(400).send("Invalid Email or Password!");
  }
  const token = jwt.sign(
    {
      isAdmin: true,
    }, //payload
    "jwtPrivateKey" //signature //make in config
  );
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
