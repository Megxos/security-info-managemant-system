const router = require("express").Router();
const Case = require("../models/cases");
const imageParser = require("./imageParser");

router.use(require("body-parser").urlencoded({ extended: true }))

router.get("/report", function (req, res) {
    res.render("report", { title: "Report" })
});

router.post("/report/new", imageParser.single("image"), function (req, res) {

    var name = req.body.name
    var matric_number = req.body.matric_no
    var department = req.body.department
    var gender = req.body.gender
    var rating = req.body.rating
    var description_1 = req.body.description_1
    var description_2 = req.body.description_2

    newCase = new Case({
        name: name,
        matric_number: matric_number,
        department: department,
        gender: gender,
        rating: rating,
        description_1: description_1,
        description_2: description_2
    })
    newCase.image.url = req.file.path;
    newCase.image.id = req.file.filename;

    Case.create(newCase).catch(err =>{
        req.flash("error", "Something went wrong")
        res.redirect("back")
    }).then(success =>{
         req.flash("success", "Successfully registered a new case")
         res.redirect("/")
    })
})

module.exports = router;