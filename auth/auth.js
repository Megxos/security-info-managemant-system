exports.isAdmin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "You are not logged in, please login first!");
    return res.redirect("/auth/login");
  }
  req.user = req.session.user;
  return next();
};

exports.isSuperAdmin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "You are not logged in, please login first!");
    return res.redirect("/auth/login");
  } else if (!req.session.user.is_super_admin) {
    req.flash("warning", "Unauthorized");
    return res.redirect("back");
  }
  req.user = req.session.user;
  return next();
};
