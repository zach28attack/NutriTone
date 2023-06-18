const jwt = require("jsonwebtoken");

exports.genToken = (id) => {
  const payload = {id};
  const secretKey = "12341234";
  return jwt.sign(payload, secretKey, {expiresIn: "24h"});
};
