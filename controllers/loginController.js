const router = require("express").Router();
const { compare } = require("bcryptjs");
const AdminModel = require("../models/admin");

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login - Admin" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      req.flash("error", "Invalid credentials");
      return res.redirect("back");
    }

    if (!(await compare(password, admin.password))) {
      req.flash("error", "Invalid credentials");
      return res.redirect("back");
    }

    req.session.user = admin;
    if (admin.is_super_admin) return res.redirect("/dashboard");
    return res.redirect("/home");
  } catch (error) {}
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  req.flash("warning", "You've been logged out");
  return res.redirect("/login");
});

module.exports = router;
