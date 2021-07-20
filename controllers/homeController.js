const router = require("express").Router(),
  Case = require("../models/record"),
  auth = require("../auth/auth").isAdmin;

router.get("/", auth, function (req, res) {
  res.redirect("/home");
});

router.get("/home", auth, function (req, res) {
  Case.find({}, async (err, users) => {
    if (err) {
      req.flash("error", "Error retrieving data");
      res.redirect("back");
    } else {
      const recentFive = users.slice(Math.max(users.length - 5, 0));
      const topFive = users.slice(0, 5);
      const totalRecords = await Case.countDocuments();
      const openRecords = await Case.countDocuments({ is_open: true });
      const closedRecords = await Case.countDocuments({ is_open: false });
      res.render("home", {
        top: topFive,
        recent: recentFive,
        open: openRecords,
        closed: closedRecords,
        total: totalRecords,
        title: "Security Management System",
      });
    }
  });
});

module.exports = router;
