const express = require("express");
const authRouter = require("./routes/auth.routes");

const app = express();

const { PORT } = require("./configs/config");
// json parser
app.use(express.json());
// formData parser
app.use(express.urlencoded({ extended: true }));
// serve static folder
app.use(express.static("public"));
// setup view engine
app.set("view engine", "ejs");

// routers middleware
app.use(authRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port : ${PORT}`);
});
