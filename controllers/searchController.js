require("dotenv").config();
const router = require("express").Router(),
            Case = require("../models/cases"),
            mongoose = require("mongoose");


router.use(require("body-parser").urlencoded({ extended: true }));

router.post("/search", (req, res) => {
    if (mongoose.connection.readyState == 1) {
        const keyword = req.body.keyword;
        const filter = req.body.search_by;
        if (filter == "name") {
            Case.find({}, (err, results) => {
                if (err) {
                    req.flash("error", "Something went wrong! Please try again.")
                    res.redirect("back")
                }
                matches = [];
                for (var i = 0; i < results.length; i++) {
                    if (results[i].name.includes(keyword)) {
                        matches.push(results[i])
                    }
                }
                if (matches.length == 0) matches = null;
                req.flash("data", matches)
                res.redirect("back");
            })
        } else {
            Case.find({}, (err, results) => {
                if (err) {
                    req.flash("error", "Something went wrong! Please try again.")
                    res.redirect("back")
                }
                matches = [];
                for (var i = 0; i < results.length; i++) {
                    if (results[i].description_1 && results[i].description_1.includes(keyword) || results[i].description_2 && results[i].description_2.includes(keyword)) {
                        matches.push(results[i])
                    }
                }
                if (matches.length == 0) matches = null;
                req.flash("data", matches)
                res.redirect("back");
            })
        }
    }

})

module.exports = router;