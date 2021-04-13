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

router.get("/records/count", auth, async (req, res) => {
  try {
    const { record } = req.query;
    let recordCount = 0;
    let query = {};
    if (record == "open") query.is_open = true;
    else if (record == "closed") query.is_open = false;

    recordCount = await Case.countDocuments(query);

    return res.status(200).send(recordCount);
  } catch (error) {
    return res.status(500).send(false);
  }
});

module.exports = router;
