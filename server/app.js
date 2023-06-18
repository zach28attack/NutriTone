const express = require("express");
const app = express();
const User = require("./models/user");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/user/signup", async (req, res, next) => {
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  const result = await user.saveNew();

  if (result) {
    res.status(200).json({
      id: result.insertedId,
    });
  } else {
    res.status(400).json();
    console.error("failed to save");
  }
});

app.listen(3000);
