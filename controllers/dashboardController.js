const router = require("express").Router(),
            Case = require("../models/cases");

router.get("/dashboard/:id", (req, res) => {
    Case.findById(req.params.id, (err, detail) => {
        if (err) {
            req.flash("error", "Error connecting to database")
            res.redirect("back")
        } else {
            res.render("dashboard", {
                detail,
                title: "Dashboard"
            })
        }
    })
})

module.exports = router;