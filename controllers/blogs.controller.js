const {
  validationResult,
  blogImgValidator,
  profileImgValidator,
} = require("../middlewares/validator.middleware");

const { addBlog } = require("../services/blog.service");
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
    id: uuidV4(),
    title,
    slug,
    content,
    blogImg,
    author: user.id,
    views: 0,
  });
  res.json(newBlog);
};
