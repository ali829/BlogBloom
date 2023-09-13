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

exports.checkUsernameNotInUse = (users, requestedUser, results) => {
  const user = users.find(
    (user) => user.username.trim() === requestedUser.trim()
  );
  if (user) {
    results.errors.push({
      value: "", // Provide the value causing the error
      msg: "This username already Exists",
      param: "username", // Replace with the actual field name
      location: "body",
    });
    console.log(true);
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

exports.profileImgValidator = async (image, results) => {
  const imgMimeType = image.mimetype.startsWith("image/");
  if (!imgMimeType) {
    results.errors.push({
      value: "", // Provide the value causing the error
      msg: "File must be an image.",
      param: "profileImg", // Replace with the actual field name
      location: "body",
    });
  }
};

exports.validationResult = (req) => validationResult(req);
