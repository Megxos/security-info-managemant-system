exports.isAdmin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "You are not logged in, please login first!");
    return res.redirect("/login");
  }
  req.user = req.session.user;
  return next();
};
