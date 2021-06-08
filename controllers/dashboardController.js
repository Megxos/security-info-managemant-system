const router = require("express").Router();
const AdminModel = require("../models/admin");
const ComplaintModel = require("../models/complaint");
const { isSuperAdmin } = require("../auth/auth");

router.use(isSuperAdmin);

router.get("/", (req, res) =>
  res.render("admin/dashboard", { title: "Super Admin" })
);

router.get("/users", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const admins = await AdminModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await AdminModel.countDocuments();

    return res.render("admin/users", { admins, count, page, limit });
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/complaints", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const complaints = await ComplaintModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await ComplaintModel.countDocuments();

    return res.render("admin/complaints", { complaints, page, limit, count });
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

module.exports = router;
