const { Router } = require("express");
const router = Router();

// middlewares
const {
  authCheck,
  permissionToAction,
} = require("../middlewares/auth.middleware");
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
  editBlog,
  getEditBlog,
  deleteBlog,
} = require("../controllers/blogs.controller");

const validationList = [titleValidator(), slugValidator(), contentValidator()];

router.get("/", getBlogs);
router.get("/blogs", [authCheck], getOwnBlogs);
router.post(
  "/blog/add",
  [authCheck, upload.single("blogImg"), ...validationList],
  postBlog
);
router.get("/blog/edit/:id", [authCheck, permissionToAction], getEditBlog);
router.patch(
  "/blog/edit/:id",
  [authCheck, permissionToAction, upload.single("blogImg"), ...validationList],
  editBlog
);

router.delete("/blog/delete/:id", [authCheck, permissionToAction], deleteBlog);
router.get("/blog/:id", getSingleBlog);

module.exports = router;
