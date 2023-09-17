const { body, validationResult } = require("express-validator");
const { decodePassword } = require("../utils/auth.util");

// register validations
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
  if (image) {
    const imgMimeType = image.mimetype.startsWith("image/");
    if (!imgMimeType) {
      results.errors.push({
        value: "", // Provide the value causing the error
        msg: "File must be an image.",
        param: "profileImg", // Replace with the actual field name
        location: "body",
      });
    }
  }
};

// login validations
exports.checkCredentialsIsExists = (requestedUser, allUsers, results) => {
  const user = allUsers.find((user) => {
    return requestedUser.email === user.email;
  });
  if (!user) {
    return results.errors.push({
      value: "", // Provide the value causing the error
      msg: "email is not valid!",
      param: "email", // Replace with the actual field name
      location: "body",
    });
  }

  const pwdIsValid = decodePassword(requestedUser.password, user.password);
  if (!pwdIsValid) {
    return results.errors.push({
      value: "", // Provide the value causing the error
      msg: "Password is not valid!",
      param: "password", // Replace with the actual field name
      location: "body",
    });
  }
  return user.id;
};

// blogs validator

exports.titleValidator = () =>
  body("title")
    .notEmpty()
    .withMessage("title cannot be empty")
    .isLength({ min: 10, max: 20 })
    .withMessage("Title must be between 10 and 20 characters");

exports.slugValidator = () =>
  body("slug")
    .notEmpty()
    .withMessage("Slug cannot be empty")
    .isLength({ min: 10, max: 30 })
    .withMessage("Slug must be between 10 and 30 characters");

exports.contentValidator = () =>
  body("content")
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isLength({ min: 10 })
    .withMessage("Content must be more than 10 characters");

exports.blogImgValidator = (image, results) => {
  if (!image) {
    return results.errors.push({
      value: "", // Provide the value causing the error
      msg: "Please upload image for your blog post.",
      param: "blogImg", // Replace with the actual field name
      location: "body",
    });
  }
};

exports.validationResult = (req) => validationResult(req);
