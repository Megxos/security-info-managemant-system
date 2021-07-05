require("./config/database")();
const express = require("express"),
  flash = require("connect-flash"),
  Admin = require("./models/user");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  require("express-session")({
    secret: "I there",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.data = req.flash("data");
  res.locals.warning = req.flash("warning");
  res.locals.current_user = req.session.user;
  next();
});

//import the controllers
const homeController = require("./controllers/homeController"),
  reportController = require("./controllers/reportController"),
  recordsController = require("./controllers/recordsController"),
  searchController = require("./controllers/searchController"),
  dashboardController = require("./controllers/dashboardController"),
  updateController = require("./controllers/updateController"),
  register = require("./controllers/registerController"),
  login = require("./controllers/loginController"),
  complaint = require("./controllers/complaintsController");
const userController = require("./controllers/userController");

//connect controllers to server
app.use(homeController);
app.use(reportController);
app.use(recordsController);
app.use(searchController);
app.use("/dashboard", dashboardController);
app.use(updateController);
app.use("/register", register);
app.use(login);
app.use("/complaints", complaint);
app.use("/users", userController);

module.exports = app;
