const User = require("../models/user");
const {genToken} = require("../jwtAuth");

exports.signup = async (req, res, next) => {
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  if (user.email && user.username && user.password) {
    const result = await user.saveNew();
    const token = genToken(result.insertedId);

    if (result) {
      res.status(200).json({
        id: result.insertedId,
        token: token,
      });
    } else {
      res.status(400).json();
      console.error("failed to save");
    }
  } else {
    res.status(400).json();
  }
};
