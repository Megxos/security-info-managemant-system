const router = require("express").Router();
const ComplaintModel = require("../models/complaint");

const { isAdmin } = require("../auth/auth");

router.get("/", isAdmin, async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const complaints = await ComplaintModel.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();

  const count = await ComplaintModel.countDocuments();
  return res.render("complaints", {
    title: "Complaints",
    complaints,
    page,
    limit,
    count,
  });
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      matric_no,
      gender,
      department,
      address,
      phone_number,
    } = req.body;

    const complaint = await ComplaintModel.create({
      name,
      description,
      gender,
      matric_no,
      department,
      address,
      phone_number,
    });

    if (!complaint) throw new Error();

    res.redirect("/complaints");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/new", isAdmin, (req, res) =>
  res.render("addComplaint", { title: "New Complaint" })
);

module.exports = router;
