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

  if (user.password !== req.body.pwd) {
    res.render("auth/login", { error: "Wrong password", values: req.body });
    return;
  }

  res.cookie("userId", user.id);
  res.redirect("/users");
};
