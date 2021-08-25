const express = require("express");
const app = express();
const auth = require("./routes/auth");
const user = require("./routes/users");
const mongoose = require("mongoose");

const port = process.env.PORT || 3900;

require("./cors")(app);
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/user", user);
// app.use("/api/user/getusers", user);

const db = "mongodb://localhost/project";
mongoose.connect(db).then(() => console.log(`Connected to ${db}...`));

const server = app.listen(port, () =>
  console.log(`listening on port ${port}...`)
);
module.exports = server;
