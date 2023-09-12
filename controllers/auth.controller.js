const authApi = require("../api/auth.api.js");
const api = new authApi();
const bcrypt = require("bcrypt");
const { v4: uuidV4 } = require("uuid");

const saltRound = 10;

exports.getRegister = (req, res) => {
  res.render("register");
};
exports.getLogin = (req, res) => {
  res.render("login");
};
exports.createUser = async (req, res) => {
  const { username, email, password, profileImg } = req.body;
  const genSalt = bcrypt.genSaltSync(saltRound, "a");
  const hash = bcrypt.hashSync(password, genSalt);
  const response = await api.addUser({
    username,
    email,
    password: hash,
    profileImg,
    id: uuidV4(),
  });
  const newUser = response.data;
  res.json(newUser);
};

exports.authUser = (req, res) => {
  const { password, email } = req.body;
  res.json({ email, password });
};
