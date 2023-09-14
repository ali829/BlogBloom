const express = require("express");
const authRouter = require("./routes/auth.routes");
const dashboardRouter = require("./routes/dashboard.routes");
const cookieParser = require("cookie-parser");

// custom middlewares
const { checkUser } = require("./middlewares/auth.middleware");

const app = express();

const { PORT } = require("./configs/config");
// json parser
app.use(express.json());
// formData parser
app.use(express.urlencoded({ extended: true }));
// use cookie parser
app.use(cookieParser());
// serve static folder
app.use(express.static("public"));
// setup view engine
app.set("view engine", "ejs");

// routers middleware
app.use("*", checkUser); //Apply checkUser if logged in middleware
app.use(authRouter);
app.use(dashboardRouter);
app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port : ${PORT}`);
});
