const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {signup, logout, login} = require("./controllers/users");
const {verifyToken} = require("./authenticate");

app.use(bodyParser.json());

app.post("/user/signup", signup);

app.get("/user/login", login);

app.get("/user/logout", logout);

app.listen(3000);
