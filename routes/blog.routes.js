const { Router } = require("express");
const router = Router();

// middlewares
const { authCheck } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/media.middleware");
const {
  titleValidator,
  slugValidator,
  contentValidator,
  blogImgValidator,
} = require("../middlewares/validator.middleware");

const { postBlog } = require("../controllers/blogs.controller");

const validationList = [titleValidator(), slugValidator(), contentValidator()];

router.get("/");
router.get("/blogs");
router.post(
  "/blog/add",
  [authCheck, upload.single("blogImg"), ...validationList],
  postBlog
);
router.put("/blog/edit/:id");
router.delete("/blog/:id");

module.exports = router;
