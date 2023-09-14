const { Router } = require("express");
const { upload } = require("../middlewares/media.middleware");
const {
  emailValidator,
  pwdValidator,
  usernameValidator,
} = require("../middlewares/validator.middleware");
const router = Router();
const {
  getLogin,
  getRegister,
  createUser,
  authUser,
  logoutUser,
} = require("../controllers/auth.controller");

router.get("/register", getRegister);
router.get("/login", getLogin);
router.post(
  "/register",
  [
    upload.single("profileImg"),
    emailValidator(),
    pwdValidator(),
    usernameValidator(),
  ],
  createUser
);
router.post("/login", authUser);
router.post("/logout", logoutUser);

module.exports = router;
