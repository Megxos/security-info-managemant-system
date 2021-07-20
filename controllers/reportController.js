const router = require("express").Router();
const Case = require("../models/record");
const auth = require("../auth/auth").isAdmin;
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.use(require("body-parser").urlencoded({ extended: true }));

router.get("/report", auth, function (req, res) {
  res.render("report", { title: "Report" });
});

router.post("/report/new", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, matric_no, department, gender, rating, crime, description } =
      req.body;

    const newCase = new Case({
      name,
      matric_number: matric_no,
      department,
      gender,
      rating,
      crime,
      description,
    });

    if (req.file) {
      newCase.image.buffer = req.file.buffer;
      newCase.image.contentType = req.file.mimetype;
    }

    const result = await Case.create(newCase);

    if (!result) throw new Error();

    req.flash("success", "Successfully registered a new case");
    return res.redirect("/");
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/addreport/:id", auth, async function (req, res) {
  const id = req.params.id;
  const report = await Case.findById(id);
  if (report)
    return res.render("addReport", {
      title: "Report",
      report,
    });
});

router.post("/report/add", auth, async (req, res) => {
  var name = req.body.name;
  var matric_number = req.body.matric_no;
  var department = req.body.department;
  var gender = req.body.gender;
  var rating = req.body.rating;
  var description_1 = req.body.description_1;
  var description_2 = req.body.description_2;

  newCase = new Case({
    name: name,
    matric_number: matric_number,
    department: department,
    gender: gender,
    rating: rating,
    description_1: description_1,
    description_2: description_2,
  });
  newCase.image.url = req.file.path;
  newCase.image.id = req.file.filename;

  Case.create(newCase)
    .catch((err) => {
      req.flash("error", "Something went wrong");
      res.redirect("back");
    })
    .then((success) => {
      req.flash("success", "Successfully registered a new case");
      res.redirect("/");
    });
});

module.exports = router;
