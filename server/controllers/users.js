const User = require("../models/user");
const sharp = require("sharp");

exports.signup = async (req, res) => {
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  if (user.email && user.username && user.password && user.password === req.body.passwordConfirmation) {
    try {
      await user.saveNew();
      res.status(200).json({
        username: user.username,
        id: user.id,
        token: user.token,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json();
    }
  } else {
    res.status(400).json();
  }
};

exports.login = async (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  try {
    const success = await user.validateUser();
    if (success) {
      res.status(200).json({
        username: user.username,
        name: user.name,
        email: user.email,
        id: user.id,
        token: user.token,
      });
    } else {
      res.status(401).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
};

exports.logout = async (req, res) => {
  try {
    const user = req.user;
    const success = await user.revokeToken();
    if (success) {
      res.status(200).json();
    } else {
      res.status(500).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = req.user;
    const {name, username, prevName, prevUsername} = req.body;

    // if new name exists then set name, else set as prevName when saving to db
    if (name) user.name = name;
    else user.name = prevName;

    // if new username exists then set name, else set as prevUsername when saving to db
    if (username) user.username = username;
    else user.username = prevUsername;

    const success = await user.updateUser();
    if (!success) res.status(400).json({message: "name or username is too short"});
    res.status(200).json();
  } catch (error) {
    res.status(500).json();
    console.error(error);
  }
};

exports.updateUserEmail = async (req, res) => {
  try {
    const user = req.user;
    const {email, password} = req.body;
    user.email = email;
    user.password = password;
    const success = await user.updateEmail();
    if (!success) res.status(401).json({message: "password is incorrect"});
    res.status(200).json();
  } catch (error) {
    res.status(500).json();
    console.error(error);
  }
};
exports.updateUserPassword = async (req, res) => {
  try {
    const user = req.user;
    const {password, newPassword, passwordConfirm} = req.body;
    user.password = password;
    user.newPassword = newPassword;
    if (passwordConfirm !== newPassword || newPassword.toString().length <= 2)
      res.status(401).json({message: "New passwords don't match or new password is too short"});
    const success = await user.updatePassword();
    if (!success) res.status(401).json({message: "password is incorrect"});

    res.status(200).json();
  } catch (error) {
    res.status(500).json();
    console.error(error);
  }
};

exports.getLogs = async (req, res) => {
  try {
    const user = req.user;
    const logs = await user.getLogs();
    if (logs && logs.length >= 1) {
      res.status(200).json({
        logs: logs,
      });
    } else if (logs && logs.length === 0) {
      res.status(200).json({
        logs: [],
      });
    } else {
      res.status(500).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.saveNewLog = async (req, res) => {
  try {
    const user = req.user;
    user.log = req.body.log;
    const success = await user.saveNewLog();
    if (success) {
      res.status(200).json();
    } else {
      res.status(500).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const user = req.user;
    user.log = req.body.log;
    const success = await user.deleteLog();
    if (success) {
      res.status(200).json();
    } else {
      res.status(500).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.saveLikedPostId = async (req, res) => {
  try {
    const user = req.user;
    user.likedPostId = req.body.postId;
    const success = await user.saveLikedPostId();
    if (success) {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.removeLikedPostId = async (req, res) => {
  try {
    const user = req.user;
    user.likedPostId = req.params.postId;
    const success = await user.removeLikedPostId();
    if (success) {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getLikedPostIds = async (req, res) => {
  const ids = await req.user.getLikedPostIds();
  res.status(200).json({
    likedPostIds: ids,
  });
};

exports.saveCommunityId = async (req, res) => {
  try {
    req.user.communityId = req.body.communityId;
    const success = await req.user.saveCommunityId();
    if (success) {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.removeCommunityId = async (req, res) => {
  try {
    req.user.communityId = req.body.communityId;
    const success = await req.user.removeCommunityId();
    if (success) {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getBudget = async (req, res) => {
  try {
    const budget = await req.user.getBudget();
    res.status(200).json({
      budget: budget,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.updateBudget = async (req, res) => {
  try {
    req.user.budget = req.body.budget;
    const success = await req.user.updateBudget();
    if (!success) res.status(500).json();
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
};

exports.getUserProfileImage = async (req, res) => {
  try {
    const imageData = await req.user.getImage();
    res.status(200).json({
      imageData: imageData,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getCompressedImage = async (req, res) => {
  try {
    const user = new User();
    user.id = req.params.id;
    const imageData = await user.getCompressedtImage();
    if (!imageData) res.status(500).json();
    res.status(200).json({
      compressedImageData: imageData,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.uploadImage = async (req, res, next) => {
  if (req.body.imageData === undefined) res.status(400).json();
  try {
    const {imageData} = req.body;

    // extract the base64-encoded data from the imageData
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");

    // convert base64 to buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    // compress the image using sharp
    const compressedImageBuffer = await sharp(imageBuffer)
      .resize(800, 800)
      .jpeg({quality: 100}) // Set JPEG quality
      .toBuffer();

    req.user.profilePic = `data:image/jpeg;base64,${compressedImageBuffer.toString("base64")}`;
    await req.user.uploadImage();
    next();
  } catch (error) {
    console.error(error);
  }
};

exports.compressImage = async (req, res) => {
  try {
    const {imageData} = req.body;

    // extract the base64-encoded data from the imageData
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");

    // convert base64 to buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    // compress the image using sharp
    const compressedImageBuffer = await sharp(imageBuffer)
      .resize(200, 200)
      .jpeg({quality: 50}) // Set JPEG quality
      .toBuffer();

    req.user.profilePic = `data:image/jpeg;base64,${compressedImageBuffer.toString("base64")}`;
    const success = await req.user.uploadCompressedImage();
    if (!success) res.status(500).json();
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
};

exports.deleteUser = async (req, res) => {
  const user = req.user;
  const success = await user.deleteUser();
  if (!success) res.status(500).json({message: "Failed to delete user"});
  res.status(200).json();
};
