const router = require("express").Router();
const { createTransport } = require("nodemailer");
const UserModel = require("../models/user");

router.get("/:user_id/deactivate", async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      user_id,
      { is_active: false },
      { new: true, useFindAndModify: false }
    );

    req.flash("success", "User deactivate");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/:user_id/activate", async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      user_id,
      { is_active: true },
      { new: true, useFindAndModify: false }
    );

    req.flash("success", "User reactivated");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/:user_id/delete", async (req, res) => {
  try {
    const { user_id } = req.params;

    await UserModel.findOneAndDelete({ _id: user_id });

    req.flash("success", "User deleted successfully");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

module.exports = router;
