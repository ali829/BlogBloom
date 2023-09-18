const {
  getDashboard,
  getProfileUser,
  editUser,
} = require("../controllers/dashboard.controller");
const { Router } = require("express");
const router = Router();

const {
  authCheck,
  permissionToEditProfile,
} = require("../middlewares/auth.middleware");
const {
  usernameValidator,
  emailValidator,
} = require("../middlewares/validator.middleware");
const { upload } = require("../middlewares/media.middleware");

router.get("/dashboard", authCheck, getDashboard);
router.get("/profile", [authCheck], getProfileUser);
router.patch(
  "/profile/:id",
  [
    authCheck,
    permissionToEditProfile,
    upload.single("profileImg"),
    usernameValidator(),
    emailValidator(),
  ],
  editUser
);

module.exports = router;
