const express = require("express");
const app = express();
const {signup, login, logout, getLogs, saveNewLog, deleteLog} = require("./controllers/users");
const {getDiary, saveItemToDiary, getTenDiaries, updateItem, deleteItem} = require("./controllers/diaries");
const {getCommunity} = require("./controllers/communities");
const {verifyToken} = require("./authenticate");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.get("/community", verifyToken, getCommunity);

app.post("/user/signup", signup);

app.post("/user/login", login);

app.get("/user/logout", verifyToken, logout);

app.post("/diary/item", verifyToken, saveItemToDiary); // new item route

app.put("/diary/item", verifyToken, updateItem);

app.delete("/diary/item", verifyToken, deleteItem);

app.post("/diary", verifyToken, getDiary); // get today's diary

app.post("/diaries", verifyToken, getTenDiaries); // lazy load the past ten days of diaries

app.get("/logs", verifyToken, getLogs);

app.post("/logs", verifyToken, saveNewLog);

app.delete("/logs", verifyToken, deleteLog);

app.listen(3000);
