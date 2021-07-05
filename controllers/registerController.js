const router = require("express").Router();
const { hash } = require("bcryptjs");
const UserModel = require("../models/user");
const { isSuperAdmin } = require("../auth/auth");

router.use(isSuperAdmin);

router.get("/", (req, res) =>
  res.render("auth/register", { title: "Register - Admin" })
);

router.post("/", async (req, res) => {
  //getting data sent in the form
  let { email, password } = req.body;

  password = await hash(password, 10);

  const newAdmin = new UserModel({
    password,
    email,
  });

  const admin = await UserModel.create(newAdmin);

  if (!admin) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }

  req.session.user = admin;
  res.redirect("/dashboard/users");
});

module.exports = router;
