const router = require("express").Router(),
  Case = require("../models/cases"),
  auth = require("../auth/auth").isAdmin;

router.get("/records", auth, async (req, res) => {
  const { filter, from, to } = req.query;
  let query_filter = {};
  if (filter == "open") query_filter = { is_open: true };
  else if (filter == "closed") query_filter = { is_open: false };

  if (from && to) {
    query_filter.date_reported = {
      $gte: new Date(from).toISOString(),
      $lt: new Date(to).toISOString(),
    };
  }

  const cases = await Case.find(query_filter);

  if (!cases) {
    req.flash("error", "Could not complete request due to an internal error");
    return res.redirect("back");
  } else {
    return res.render("records", {
      cases,
      title: "Records",
    });
  }
});

module.exports = router;
