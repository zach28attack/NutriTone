const jwt = require("jsonwebtoken");
const User = require("./models/user");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "12341234");
      const user = new User(); // initialize user object
      user.id = decoded.id;
      user.token = token;
      const tokenValid = await user.validateToken(); // check if token is revoked
      if (tokenValid) {
        req.user = user; // if token is valid attach user obj to req obj
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(400).json();
    }
  } else {
    res.status(400).json();
  }
};
