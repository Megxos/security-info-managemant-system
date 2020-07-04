const router  = require("express").Router(),
            Case = require("../models/cases");


router.get("/", function (req, res) {
    res.redirect("/home")
})
router.get("/home", function (req, res) {
   Case.find({}, (err, users)=>{
       if(err){
           req.flash("error", "Error retrieving data")
           res.redirect("back")
       }else{
           const recentFive = users.slice(Math.max(users.length - 5, 0));
           const topFive = users.slice(0, 5)
           res.render("home", {
               topFive: topFive,
               recentFive: recentFive,
                title: "Security Management System"
          });
       }
   })
})

module.exports = router;