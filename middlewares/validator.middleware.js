const { body, validationResult } = require("express-validator");

exports.emailValidator = () =>
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .isString()
    .notEmpty()
    .withMessage("Email cannot be empty");

exports.usernameValidator = () =>
  body("username")
    .isString()
    .notEmpty()
    .withMessage("Username cannot be empty");

exports.checkUsernameNotInUse = async (users, requestedUser) => {
  const user = await users.find((user) => user.username === requestedUser);
  if (user) {
    throw new Error("This username already Exists");
  }
};
exports.pwdValidator = () =>
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be between 6 and 15 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one number, and one special character"
    );

exports.profileImgValidator = async (image) => {
  const imgMimeType = image.mimetype.startsWith("image/");
  if (!imgMimeType) {
    throw new Error("File must be an image.");
  }
};

exports.validationResult = (req) => validationResult(req);
