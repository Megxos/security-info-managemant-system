const router = require("express").Router();
const Case = require("../models/record");
const methodOverride = require("method-override"),
  auth = require("../auth/auth").isAdmin;

router.use(methodOverride("_method"));
router.use(
  require("body-parser").urlencoded({
    extended: true,
  })
);

router.put("/update/:id", auth, (req, res) => {
  const data = req.body.content;
  const id = req.params.id;
  Case.findByIdAndUpdate(id, data, {
    new: true,
    useFindAndModify: false,
  })
    .then((success) => {
      req.flash("success", "Status Updated");
      res.redirect("back");
    })
    .catch((error) => {
      req.flash("error", "something went wrong");
      res.redirect("back");
    });
});

module.exports = router;
