const router = require("express").Router(),
    passport = require("passport"),
    passportLocal = require("passport-local"),
    Admin = require("../models/admin");

router.get("/login", (req, res)=>{
    res.render("login", { title: "Login - Admin" })
})

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome back!"
    }), function (req, res) {
    })

router.get("/logout", (req, res)=>{
    req.logOut()
    req.flash("warning", "You've been logged out")
    res.redirect("/login")
})

module.exports = router;