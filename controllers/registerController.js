const router  = require("express").Router(),
            passport = require("passport"),
            passportLocal = require("passport-local"),
            Admin = require("../models/admin");

router.use(passport.initialize());
router.use(passport.session());

passport.use(new passportLocal(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser())

router.get("/register", (req, res)=>{
    res.render("register", { title: "Register - Admin" })
})

router.post("/register", function (req, res) {
    //getting data sent in the form
    console.log(req.body)
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email

    var newAdmin = new Admin({
        username: username,
        email: email
    })
    Admin.register(newAdmin, password, function (err, result) {
        if (err) {
            req.flash("error", "Something went wrong!" + err)
            res.render("register", { title: "Register - Admin" })
        } else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "You are now an Admin")
                res.redirect("/home")
            })
        }
    });
});

module.exports = router;