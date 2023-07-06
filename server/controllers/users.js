const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  if (user.email && user.username && user.password && user.password === req.body.passwordConfirmation) {
    try {
      await user.saveNew();
      res.status(200).json({
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

exports.login = async (req, res, next) => {
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  try {
    const success = await user.validateUser();
    if (success) {
      res.status(200).json({
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

exports.logout = async (req, res, next) => {
  const user = req.user;
  const success = await user.revokeToken();
  if (success) {
    res.status(200).json();
  } else {
    res.status(500).json();
  }
};

exports.getLogs = async (req, res, next) => {
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
};

exports.saveNewLog = async (req, res, next) => {
  const user = req.user;
  user.log = req.body.log;
  console.log("userLOG:", user.log);
  const success = await user.saveNewLog();
  if (success) {
    res.status(200).json();
  } else {
    res.status(500).json();
  }
};

exports.deleteLog = async (req, res, next) => {
  const user = req.user;
  user.log = req.body.log;
  const success = await user.deleteLog();
  if (success) {
    res.status(200).json();
  } else {
    res.status(500).json();
  }
};
