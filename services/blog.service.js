const axiosApi = require("../api/axios.api");

const api = new axiosApi("posts");

exports.addBlog = async (blog) => {
  const newBlog = await api.addOne(blog);
  return newBlog.data;
};
