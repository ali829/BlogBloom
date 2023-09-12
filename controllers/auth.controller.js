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
  if (checkUsernameNotInUse(allUsers,username)) {
    
  }
  if (!results.isEmpty()) {
    return res.json({ errors: results.array() });
  }
  const newUser = await addUser(
    { username, email, password, profileImg: req.file.filename },
    saltRound
  );
  res.json(req.file);
};

exports.authUser = (req, res) => {
  const { password, email } = req.body;
  res.json({ email, password });
};
