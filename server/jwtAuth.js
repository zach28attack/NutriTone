const {requiredEnv} = require("./config");
const jwt = require("jsonwebtoken");

exports.genToken = (id) => {
  const payload = {id};
  const secretKey = requiredEnv("JWT_SECRET");
  return jwt.sign(payload, secretKey, {expiresIn: "24h"});
};
