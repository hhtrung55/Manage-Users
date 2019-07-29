const md5 = require('md5');
const db = require("../db");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  let user = db
    .get("users")
    .find({ email: req.body.email })
    .value();
  if (!user) {
    res.render("auth/login", { error: "Wrong email", values: req.body });
    return;
  }

  let hashedPassword = md5(req.body.pwd);
  if (user.password !== hashedPassword) {
    res.render("auth/login", { error: "Wrong password", values: req.body });
    return;
  }

  res.cookie("userId", user.id);
  res.redirect("/users");
};
