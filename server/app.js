const express = require("express");
const app = express();
const {signup, login, logout} = require("./controllers/users");
const {getDiary, saveItemToDiary} = require("./controllers/diaries");
const {verifyToken} = require("./authenticate");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.post("/user/signup", signup);

app.post("/user/login", login);

app.get("/user/logout", verifyToken, logout);

app.post("/diary/item", verifyToken, saveItemToDiary);

app.post("/diary", verifyToken, getDiary); // get one diary by date

app.listen(3000);
