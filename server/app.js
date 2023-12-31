const express = require("express");
const app = express();
const {verifyToken} = require("./authenticate");

const {
  signup,
  login,
  logout,
  getLogs,
  saveNewLog,
  deleteLog,
  saveLikedPostId,
  getLikedPostIds,
  removeLikedPostId,
  saveCommunityId,
  removeCommunityId,
  updateUser,
  getBudget,
  updateBudget,
  getCompressedImage,
  uploadImage,
  compressImage,
  getUserProfileImage,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
} = require("./controllers/users");
const {getDiary, saveItemToDiary, getTenDiaries, updateItem, deleteItem} = require("./controllers/diaries");
const {getCommunities, saveNewPost, deletePost, updatePost, addLike, removeLike} = require("./controllers/communities");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json({limit: "10mb"}));

app.get("/communities", verifyToken, getCommunities);

app.delete("/community/:communityId/post/:postId/like", verifyToken, removeLike, removeLikedPostId);

app.delete("/community/:communityId/post/:postId", verifyToken, deletePost);

app.patch("/community/:communityId/post/:postId", verifyToken, updatePost);

app.post("/community/post/like", verifyToken, addLike, saveLikedPostId);

app.post("/post", verifyToken, saveNewPost);

app.post("/user/signup", signup);

app.post("/user/login", login);

app.get("/user/logout", verifyToken, logout);

app.get("/user/likedPostIds", verifyToken, getLikedPostIds);

app.post("/user/community", verifyToken, saveCommunityId); // saves a communities id to users joinedCommunities field

app.patch("/user/community", verifyToken, removeCommunityId); // saves a communities id to users joinedCommunities field

app.get("/user/budget", verifyToken, getBudget);

app.patch("/user/budget", verifyToken, updateBudget);

app.get("/user/image/:id", verifyToken, getCompressedImage); // get compressed user profile image

app.get("/user/image", verifyToken, getUserProfileImage); // get hd user profile image

app.patch("/user/image", verifyToken, uploadImage, compressImage);

app.patch("/user/email", verifyToken, updateUserEmail);

app.patch("/user/password", verifyToken, updateUserPassword);

app.patch("/user", verifyToken, updateUser);

app.delete("/user", verifyToken, deleteUser);

app.post("/diary/item", verifyToken, saveItemToDiary); // new item route

app.put("/diary/item", verifyToken, updateItem);

app.delete("/diary/item", verifyToken, deleteItem);

app.post("/diary", verifyToken, getDiary); // get today's diary

app.post("/diaries", verifyToken, getTenDiaries); // lazy load the past ten days of diaries

app.get("/logs", verifyToken, getLogs);

app.post("/logs", verifyToken, saveNewLog);

app.delete("/logs", verifyToken, deleteLog);

app.listen(3000);
