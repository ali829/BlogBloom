const {
  validationResult,
  blogImgValidator,
  profileImgValidator,
} = require("../middlewares/validator.middleware");

const {
  addBlog,
  getBlogsByUserId,
  getAllBlogs,
  getOneBlog,
  editBlogById,
  deleteBlogById,
} = require("../services/blog.service");
const { v4: uuidV4 } = require("uuid");

exports.postBlog = async (req, res) => {
  const { title, slug, content } = req.body;
  const results = validationResult(req);
  profileImgValidator(req.file, results);
  blogImgValidator(req.file, results);
  if (!results.isEmpty()) {
    return res.json({ errors: results.array() });
  }
  const blogImg = null || req.file.filename;
  const { user } = res.locals;
  const newBlog = await addBlog({
    title,
    slug,
    content,
    blogImg,
    author: user.id,
    views: 0,
    id: uuidV4(),
  });
  res.json(newBlog);
};

exports.getOwnBlogs = async (req, res) => {
  const { user } = res.locals;
  const myOwnBlogs = await getBlogsByUserId(user.id);
  res.json(myOwnBlogs);
};

exports.getBlogs = async (req, res) => {
  const blogs = await getAllBlogs();
  const data = {
    blogs,
    title: "Home page",
  };
  res.render("home", data);
};

exports.getSingleBlog = async (req, res) => {
  const blog = await getOneBlog(req.params.id);
  if (blog) {
    const data = {
      blog,
      title: blog.title,
    };
    return res.render("singlePost", data);
  }
  res.render("404");
};

exports.editBlog = async (req, res) => {
  const { title, slug, content } = req.body;
  const results = validationResult(req);
  profileImgValidator(req.file, results);
  blogImgValidator(req.file, results);
  if (!results.isEmpty()) {
    return res.json({ errors: results.array() });
  }
  const blogImg = null || req.file.filename;
  const newBlog = await editBlogById(
    {
      title,
      slug,
      content,
      blogImg,
    },
    req.params.id
  );
  res.json({ title, slug, content, blogImg });
};

exports.getEditBlog = async (req, res) => {
  const blog = await getOneBlog(req.params.id);
  const data = {
    title: blog.title,
    blog,
  };
  res.render("editBlog", data);
};

exports.deleteBlog = async (req, res) => {
  const deletedBlog = await deleteBlogById(req.params.id);
  res.json({ deletedBlog }); 
};
