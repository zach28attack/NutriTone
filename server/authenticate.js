const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (token) {
    const decoded = jwt.verify(token, "12341234");
    req.id = decoded.id;
    console.log("verified user");
    next();
  } else {
    console.log("token", token);
    res.status(401).json();
  }
};
