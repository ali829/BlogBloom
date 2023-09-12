const { Router } = require("express");
const router = Router();
const {
  getLogin,
  getRegister,
  createUser,
  authUser,
} = require("../controllers/auth.controller");

router.get("/register", getRegister);
router.get("/login", getLogin);
router.post("/register", createUser);
router.post("/login", authUser);

module.exports = router;
