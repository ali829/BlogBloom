const { getDashboard } = require("../controllers/dashboard.controller");
const { Router } = require("express");
const router = Router();

const { authCheck } = require("../middlewares/auth.middleware");

router.get("/dashboard", authCheck, getDashboard);

module.exports = router;
