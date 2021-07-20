require("dotenv").config();
const router = require("express").Router(),
  Case = require("../models/record"),
  mongoose = require("mongoose");

router.use(require("body-parser").urlencoded({ extended: true }));

router.post("/search", async (req, res) => {
  if (mongoose.connection.readyState == 1) {
    const { keyword, filter } = req.body;
    const cases = await Case.find({});
    if (!cases) return res.status(500).send("An error occured");
    let matches;
    if (filter == "name") {
      matches = cases.filter((result) => result.name.includes(keyword));

      return res.status(200).send(matches);
    } else if (filter == "crime") {
      matches = cases.filter(
        (result) =>
          (result.description_1 && result.description_1.includes(keyword)) ||
          (result.description_2 && result.description_2.includes(keyword)) ||
          (result.crime && result.crime.includes(keyword))
      );

      res.status(200).send(matches);
    } else {
      matches = cases.filter(
        (result) =>
          result.matric_number && result.matric_number.includes(keyword)
      );

      return res.status(200).send(matches);
    }
  }
});

module.exports = router;
