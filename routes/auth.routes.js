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

module.exports = router;
