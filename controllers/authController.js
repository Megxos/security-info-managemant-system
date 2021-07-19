const router = require("express").Router();
const { createTransport } = require("nodemailer");
const { compare, hash } = require("bcryptjs");
const { genToken } = require("../utils/genToken");
const UserModel = require("../models/user");

const { isSuperAdmin } = require("../auth/auth");

const { MAIL_PASSWORD, MAIL_USER, MAIL_PORT, MAIL_SERVICE, MAIL_HOST } =
  process.env;

const transporter = createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

router.get("/register", isSuperAdmin, (req, res) =>
  res.render("auth/register", { title: "Register - Admin" })
);

router.post("/register", isSuperAdmin, async (req, res) => {
  try {
    //getting data sent in the form
    let { email, password } = req.body;

    const userExists = await UserModel.exists({ email });

    if (userExists) {
      req.flash("error", "User already exists");
      return res.redirect("back");
    }

    const hashedPassword = await hash(password, 10);

    const newAdmin = new UserModel({
      password: hashedPassword,
      email,
    });

    const admin = await UserModel.create(newAdmin);

    if (!admin) {
      req.flash("error", "Something went wrong");
      return res.redirect("back");
    }

    await transporter.sendMail({
      from: `CSIM <${MAIL_USER}>`,
      to: email,
      subject: "CSIM Account",
      html: `You have been recently added as an admin on CSIM. Check below for your login credentials <br>
    <br>
    <strong>Email: </strong>${email} <br>
    <strong>Password: </strong>${password} <br>
    Visit http://${req.hostname}/auth/login to login`,
    });

    res.redirect("/dashboard/users");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/login", (req, res) =>
  res.render("auth/login", { title: "Login - Admin" })
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await UserModel.findOne({ email });

    if (!admin) {
      req.flash("error", "Invalid credentials");
      return res.redirect("back");
    }

    if (!(await compare(password, admin.password))) {
      req.flash("error", "Invalid credentials");
      return res.redirect("back");
    }

    req.session.user = admin;
    return res.redirect("/home");
  } catch (error) {}
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  req.flash("warning", "You've been logged out");
  return res.redirect("/auth/login");
});

router.get("/forgot-password", (req, res) => {
  return res.render("auth/forgot-password");
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const token = genToken();

    await transporter.sendMail({
      from: `CSIM <${MAIL_USER}>`,
      to: email,
      subject: "Password Reset",
      html: `A password reset was requested on your account. Use this code to reset your password <br>
      <p style="font-size:2em;font-weight:bold;letter-spacing:0.5em;">${token}</p>
      Ignore this email if you didn't initiate this process.
      `,
    });

    await UserModel.findOneAndUpdate({ email }, { reset_token: token });

    req.flash("success", "Password reset link sent");
    return res.redirect("/auth/reset-password");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/reset-password", (req, res) => res.render("auth/reset-password"));

router.post("/reset-password", async (req, res) => {
  try {
    const { password, confirm_password, token } = req.body;

    if (password !== confirm_password) {
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    }

    const user = await UserModel.findOne({ reset_token: token });

    if (!user) {
      req.flash("error", "Invalid reset code");
      return res.redirect("back");
    }

    user.password = await hash(password, 10);
    user.reset_token = null;

    await user.save();

    req.flash("success", "Password reset successfully");
    return res.redirect("/auth/login");
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

module.exports = router;
