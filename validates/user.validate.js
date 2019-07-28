module.exports.postCreate = (req, res, next) => {
  let errors = [];
  if (!req.body.name) {
    errors.push("Name is not valid.");
  }
  if (!req.body.phone) {
    errors.push("Phone is not valid.");
  }
  if (errors.length) {
    res.render("users/create", { errors: errors, value: req.body });
    return;
  }
  next();
};
