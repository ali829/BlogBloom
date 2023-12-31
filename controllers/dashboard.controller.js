const {
  validationResult,
  profileImgValidator,
  checkUsernameNotInUse,
} = require("../middlewares/validator.middleware");
const { editUserById, getAllUsers } = require("../services/auth.service");

exports.getDashboard = (req, res) => {
  res.render("dashboard");
};

exports.getProfileUser = (req, res) => {
  const { user } = res.locals;
  res.render("profile", user);
};
exports.editUser = async (req, res) => {
  const { username, email } = req.body;
  const allUsers = await getAllUsers();
  const results = validationResult(req);
  const { user } = res.locals;
  if (user.username !== username) {
    checkUsernameNotInUse(allUsers, username, results);
  }
  profileImgValidator(req.file, results);
  if (!results.isEmpty()) {
    return res.json({ errors: results.array() });
  }
  const userEdited = await editUserById(
    { username, email, profileImg: req.file.filename },
    req.params.id
  );
  res.json(userEdited);
};
