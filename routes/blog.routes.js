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

const {
  postBlog,
  getOwnBlogs,
  getBlogs,
  getSingleBlog,
} = require("../controllers/blogs.controller");

const validationList = [titleValidator(), slugValidator(), contentValidator()];

router.get("/", getBlogs);
router.get("/blogs", [authCheck], getOwnBlogs);
router.post(
  "/blog/add",
  [authCheck, upload.single("blogImg"), ...validationList],
  postBlog
  );
  router.put("/blog/edit/:id", [authCheck]);
  router.delete("/blog/:id");
  router.get("/blog/:id", getSingleBlog);

module.exports = router;
