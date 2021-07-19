const router = require("express").Router();
const UserModel = require("../models/user");
const ComplaintModel = require("../models/complaint");
const ReportModel = require("../models/cases");
const { isSuperAdmin } = require("../auth/auth");

router.use(isSuperAdmin);

router.get("/", async (req, res) => {
  try {
    const reports = await ReportModel.countDocuments();
    const open = await ReportModel.countDocuments({ is_open: true });
    const closed = await ReportModel.countDocuments({ is_open: false });
    const complaints = await ComplaintModel.countDocuments();
    return res.status(200).json({ reports, complaints, open, closed });
  } catch (error) {
    return res.status(500).send(false);
  }
});

router.get("/users", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const admins = await UserModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await UserModel.countDocuments();

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
