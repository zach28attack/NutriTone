const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {signup} = require("./controllers/users");

app.use(bodyParser.json());

app.get("/user/signup", signup);

app.listen(3000);
