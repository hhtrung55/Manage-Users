const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", { users: db.get("users").value() });
};

module.exports.get = (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/view", {
    user: user
  });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let matchedUsers = db
    .get("users")
    .value()
    .filter(user => user.name.indexOf(q) !== -1);
  res.render("users/index", { users: matchedUsers });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = (req, res) => {
  let errors = [];
  if (!req.body.name) {
    errors.push('Name is not valid.');
  }
  if (!req.body.phone) {
    errors.push('Phone is not valid.')
  }

  if (errors.length) {
    res.render('users/create', { errors: errors, value: req.body })
    return;
  }

  req.body.id = shortid.generate();

  db.update("count", n => n + 1).write();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};
