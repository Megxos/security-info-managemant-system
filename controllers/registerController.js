const router = require("express").Router();
const { hash } = require("bcryptjs");
const AdminModel = require("../models/admin");

router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register - Admin" });
});

router.post("/register", async (req, res) => {
  //getting data sent in the form
  let { email, password } = req.body;

  password = await hash(password, 10);

  const newAdmin = new AdminModel({
    password,
    email,
  });

  const admin = await AdminModel.create(newAdmin);

  if (!admin) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }

  req.session.user = admin;
  res.redirect("/dashboard/users");
});

module.exports = router;
