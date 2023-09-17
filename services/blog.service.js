const axiosApi = require("../api/axios.api");

const api = new axiosApi("posts");

exports.addBlog = async (blog) => {
  const newBlog = await api.addOne(blog);
  return newBlog.data;
};

exports.getAllBlogs = async () => {
  const response = await api.getAll();
  const allBlogs = await response.data;
  return allBlogs;
};
exports.getBlogsByUserId = async (userId) => {
  const allBlogs = await this.getAllBlogs();
  const blogUser = allBlogs.filter((blog) => blog.author === userId);
  return blogUser;
};

exports.getOneBlog = async (id) => {
  const allBlogs = await this.getAllBlogs();
  const blogById = allBlogs.find((blog) => blog.id === id);
  return blogById;
};

exports.editBlogById = async (blog, blogId) => {
  const response = await api.editOne(blog, blogId);
  const editedBlog = await response.data;
  return editedBlog;
};
