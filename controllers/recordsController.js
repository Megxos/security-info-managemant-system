const router = require("express").Router(),
  Case = require("../models/cases"),
  auth = require("../auth/auth").isAdmin;

router.get("/records", auth, async (req, res) => {
  const { filter } = req.query;
  let query_filter = {};
  if (filter == "open") query_filter = { is_open: true };
  else if (filter == "closed") query_filter = { is_open: false };
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

router.get("/open", auth, (req, res) => {
  Case.find({}, async (err, cases) => {
    if (err) {
      req.flash("error", "Could not complete request due to an internal error");
      res.redirect("back");
    } else {
      const openCases = await cases.filter((openCase) => openCase.is_open == 1);
      res.render("openCases", {
        cases: openCases,
        title: "Open cases",
      });
    }
  });
});

router.get("/closed", auth, (req, res) => {
  Case.find({}, async (err, cases) => {
    if (err) {
      req.flash("error", "Could not complete request due to an internal error");
      res.redirect("back");
    } else {
      cases = await cases.filter((openCase) => openCase.is_open == 0);
      res.render("closedCases", {
        cases,
        title: "Closed cases",
      });
    }
  });
});

module.exports = router;
