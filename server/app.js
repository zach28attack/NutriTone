const express = require("express");
const app = express();
const User = require("./models/user");

app.get("/", (req, res, next) => {
  const user = new User();
  user.saveNew();
});

app.listen(3000);
