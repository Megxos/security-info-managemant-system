const express = require("express"),
            ejs           = require("ejs"),
            mongoose = require("mongoose"),
            Case             = require("./models/cases"),
            Offender    = require("./models/offenders"),
            Crime           = require("./models/crimes"),
            bodyParser = require("body-parser"),
            flash = require("connect-flash"),
            config = require("./config/config")();
            
const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  require("express-session")({
    secret: "I there",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash())

app.use( (req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.data = req.flash("data");
    next();
})

//import the controllers
const homeController = require("./controllers/homeController"),
            reportController = require("./controllers/reportController"),
            recordsController = require("./controllers/recordsController"),
            searchController = require("./controllers/searchController"),
            detailsController = require("./controllers/dashboardController"),
            updateController = require("./controllers/updateController");

//connect controllers to server
app.use("/", homeController);
app.use("/", reportController);
app.use("/", recordsController);
app.use("/", searchController);
app.use("/", detailsController);
app.use("/",updateController);

const { LOCAL_PORT } = process.env;
const port = process.env.PORT || LOCAL_PORT
app.listen(port, function(){
    console.log("we're up and running on PORT >>>", port)
})