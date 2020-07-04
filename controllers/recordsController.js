const router  = require("express").Router(),
            Case = require("../models/cases");

router.get("/records", function (req, res) {
    Case.find({}, (err, cases) => {
        if (err){
            req.flash("error", "Could not complete request due to an internal error");
            res.redirect("back")
        }else{
        res.render("records", {
            cases,
            title: "Records"
        })
    }
    })
})

module.exports = router;
