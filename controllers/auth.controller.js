const {
  addUser,
  getAllUsers,
  getOneUserByEmail,
} = require("../services/auth.service");
const {
  checkUsernameNotInUse,
  profileImgValidator,
  validationResult,
  checkCredentialsIsExists,
} = require("../middlewares/validator.middleware");

const saltRound = 10;

//TODO:replace this to auth.util
const jwt = require("jsonwebtoken");
const { MAX_AGE } = require("../configs/config");
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: MAX_AGE,
  });
};

exports.getRegister = (req, res) => {
  res.render("register");
};
exports.getLogin = (req, res) => {
  res.render("login");
};
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const allUsers = await getAllUsers();
  const results = validationResult(req);
  checkUsernameNotInUse(allUsers, username, results);
  profileImgValidator(req.file, results);
  if (!results.isEmpty()) {
    return res.json({ errors: results.array() });
  }
  const newUser = await addUser(
    { username, email, password, profileImg: req.file.filename },
    saltRound
  );
  const token = createToken(newUser.id);
  res.cookie("jwt", token);
  res.json({ id: newUser.id, jwt: token });
};

exports.authUser = async (req, res) => {
  const { email, password } = req.body;
  const results = validationResult(req);
  const allUsers = await getAllUsers();
  checkCredentialsIsExists({ email, password }, allUsers, results);
  if (!results.isEmpty()) {
    return res.json({ errors: results.array() });
  }
  const id = await getOneUserByEmail(email);
  const token = createToken(id);
  res.cookie("jwt", token, { maxAge: MAX_AGE });
  res.json({ token });
};

// logout
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.redirect("/login");
};

