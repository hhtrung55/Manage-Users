const db = require("../db");

module.exports.auth = (req, res, next) => {
  if (!req.cookies || !req.cookies.userId) {
    res.redirect("/auth/login");
    return;
  }
  if (!db.get("users").find({ id: req.cookies.userId })) {
    res.redirect("/auth/login");
    return;
  }
  next();

  res.redirect("/auth/login");
};
