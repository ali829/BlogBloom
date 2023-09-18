const axiosApi = require("../api/axios.api.js");
const bcrypt = require("bcrypt");
const { v4: uuidV4 } = require("uuid");

const api = new axiosApi("users");

exports.addUser = async (user, saltRound) => {
  const { username, email, password, profileImg } = user;
  const genSalt = bcrypt.genSaltSync(saltRound, "a");
  const hash = bcrypt.hashSync(password, genSalt);
  const response = await api.addOne({
    username,
    email,
    password: hash,
    profileImg,
    id: uuidV4(),
  });
  return response.data;
};

exports.getAllUsers = async () => {
  const response = await api.getAll();
  return response.data;
};

exports.getOneUserByEmail = async (email) => {
  const allUsers = await this.getAllUsers();
  const userByEmail = allUsers.find((user) => email === user.email);
  return userByEmail.id;
};

exports.getOneByID = async (id) => {
  const response = await api.getOne(id);
  return response.data[0];
};

exports.editUserById = async (user, userId) => {
  const response = await api.editOne(user, userId);
  return response.data;
};
