const db = require("../db");

module.exports.auth = (req, res, next) => {
  if (!req.cookies || !req.cookies.authId) {
    res.redirect('/auth/login');
    return;
  }
  if (!db.get("users").find({ id: req.cookies.authId })) {
    res.redirect("/auth/login");
    return;
  }
  next();
};
