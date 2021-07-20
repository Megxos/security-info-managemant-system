const router = require("express").Router();
const pdf = require("html-pdf");
const RecordModel = require("../models/record");
const auth = require("../auth/auth").isAdmin;

router.get("/records", auth, async (req, res) => {
  const { filter, from, to, page = 1, limit = 10 } = req.query;
  let query_filter = {};
  if (filter == "open") query_filter = { is_open: true };
  else if (filter == "closed") query_filter = { is_open: false };

  if (from && to) {
    query_filter.date_reported = {
      $gte: new Date(from).toISOString(),
      $lt: new Date(to).toISOString(),
    };
  }

  const cases = await RecordModel.find(query_filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort("-createdAt")
    .exec();

  const count = await RecordModel.countDocuments(query_filter);
  if (!cases) {
    req.flash("error", "Could not complete request due to an internal error");
    return res.redirect("back");
  } else {
    return res.render("records", {
      cases,
      count,
      page,
      limit,
      title: "Records",
    });
  }
});

router.get("/records/:crime_id/data", async (req, res) => {
  try {
    const { crime_id } = req.params;
    const record = await RecordModel.findById(crime_id);

    const records = await RecordModel.find({
      matric_number: record.matric_number,
    });

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).send(false);
  }
});

router.get("/records/:id", auth, async (req, res) => {
  try {
    const record = await RecordModel.findById(req.params.id);

    if (!record) {
      throw new Error();
    }
    return res.render("dashboard", {
      detail: record,
      title: record.name,
    });
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/records/:id/print", async (req, res) => {
  try {
    const { id } = req.params;
    const record = await RecordModel.findById(id);

    if (!record) {
      req.flash("error", "Record not found");
      return res.redirect("back");
    }

    // pdf image source
    let images = "";

    if (record.images.length) {
      for (let i = 0; i < record.images.length; i++) {
        images += `<img src="data:${
          record.images[i].contentType
        };base64,${record.images[i].buffer.toString(
          "base64"
        )}"  alt="photo of ${record.name}" height="150" />`;
      }
    } else {
      images = `<img src="http://${req.hostname}:${
        req.socket.address().port
      }/img/user.png"  alt="photo of ${record.name}" height="150"/>`;
    }

    const html = `
    <h1 style="text-align:center;">Crime Record</h1>
    <p style="padding:10px 30px;">
    <style>th{text-align:left;}.images{display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:10px;}img{width:150px;}</style>
     <div class="images">
       ${images}
     </div>
    <table>
        <tr>
          <th>Id</th>
          <td>${record._id} </td>
        </tr>
        <tr>
          <th>Name</th>
          <td>${record.name} </td>
        </tr>
        <tr>
          <th>Matric Number</th>
          <td>${record.matric_number}</td>
        </tr>
        <tr>
          <th>Department</th>
          <td>${record.department} </td>
        </tr>
        <tr>
          <th>Gender</th>
          <td>${record.gender}</td>
        </tr>
          </tr>
          <tr>
          <th>Crime</th>
          <td>${record.crime}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>${record.description}</td>
        </tr>
          </tr>
          <tr>
          <th>Date Recorded</th>
          <td>${record.date_reported.toLocaleDateString()}</td>
        </tr>   
    </table>
    </p>`;

    pdf.create(html).toBuffer(function (err, buffer) {
      res.contentType("application/pdf");
      return res.send(buffer);
    });
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
});

router.get("/records/count", auth, async (req, res) => {
  try {
    const { record } = req.query;
    let recordCount = 0;
    let query = {};
    if (record == "open") query.is_open = true;
    else if (record == "closed") query.is_open = false;

    recordCount = await RecordModel.countDocuments(query);

    return res.status(200).send(recordCount);
  } catch (error) {
    return res.status(500).send(false);
  }
});

module.exports = router;
