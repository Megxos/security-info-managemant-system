const router = require("express").Router()

module.exports.isAdmin = (req, res, next) =>{
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You are not logged in, please login first!")
    res.redirect("/login")
}