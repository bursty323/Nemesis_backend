const express = require("express");
const router = express.Router();
const { User, validate } = require("../Models/user");

router.get("/", async (req, res) => {
  const users = await User.find().sort("username");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    username: req.body.username,
    mobile_no: req.body.mobile_no,
    email: req.body.email,
    address: req.body.address,
  });

  await user.save();
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) res.status(400).send("invalid user");
  // User.remove(user);
  res.send(user);
});

module.exports = router;
