const jwt = require("jsonwebtoken");
const User = require("../models/user");

function isLogin(req, res, next) {
  let token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded) {
      if (!err) {
        User.findById(decoded.userId).then(function(user) {
          if (user) {
            req.userId = decoded.userId;
            next();
          }
        });
      } else {
        res.status(500).json({ message: `access denied` });
      }
    });
  } else {
    res.status(500).json({ message: `access denied` });
  }
}

module.exports = isLogin;
