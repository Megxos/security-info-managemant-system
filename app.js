require("./config/config")();
const express = require("express"),
  flash = require("connect-flash"),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  Admin = require("./models/admin");

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
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.data = req.flash("data");
  res.locals.warning = req.flash("warning");
  res.locals.current_user = req.user;
  next();
});

//import the controllers
const homeController = require("./controllers/homeController"),
  reportController = require("./controllers/reportController"),
  recordsController = require("./controllers/recordsController"),
  searchController = require("./controllers/searchController"),
  detailsController = require("./controllers/dashboardController"),
  updateController = require("./controllers/updateController"),
  register = require("./controllers/registerController"),
  login = require("./controllers/loginController"),
  complaint = require("./controllers/complaintsController");

//connect controllers to server
app.use(homeController);
app.use(reportController);
app.use(recordsController);
app.use(searchController);
app.use(detailsController);
app.use(updateController);
app.use(register);
app.use(login);
app.use("/complaints", complaint);

const { LOCAL_PORT } = process.env;
const port = process.env.PORT || LOCAL_PORT;
app.listen(port, function () {
  console.log("we're up and running on PORT >>>", port);
});
