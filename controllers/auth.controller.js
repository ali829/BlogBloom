const { addUser, getAllUsers } = require("../services/auth.service");
const {
  checkUsernameNotInUse,
  profileImgValidator,
  validationResult,
} = require("../middlewares/validator.middleware");
const { json } = require("express");
const saltRound = 10;

exports.getRegister = (req, res) => {
  res.render("register");
};
exports.getLogin = (req, res) => {
  res.render("login");
};
exports.createUser = async (req, res) => {
  const { username, email, password, profileImg } = req.body;
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
  res.json(newUser);
};

exports.authUser = (req, res) => {
  const { password, email } = req.body;
  res.json({ email, password });
};
