const router = require("express").Router();
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

module.exports = router;
