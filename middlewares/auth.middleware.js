const jwt = require("jsonwebtoken");
require("dotenv").config();

const { getOneByID } = require("../services/auth.service");

exports.authCheck = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    if (req.method == "PATCH" || req.method === "DELETE") {
      return res
        .status(401)
        .json({ message: "Unauthorized", code: res.statusCode });
    }
    res.redirect("/login");
  }
};

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await getOneByID(decoded.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

exports.ensureAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, encoded) => {
      if (!err) {
        res.redirect("/dashboard");
      } else {
        next();
      }
    });
  } else {
    next();
  }
};

// check that the user have the access to edit or delete a blog post
exports.permissionToAction = async (req, res, next) => {
  const { user } = res.locals;
  const postId = req.params.id;
  const requestedBlog = await require("../services/blog.service").getOneBlog(
    postId
  );
  if (requestedBlog) {
    if (requestedBlog.author === user.id) {
      console.log("allowed to edit or delete");
      next();
    } else {
      if (req.method == "PATCH" || req.method == "DELETE") {
        return res
          .status(401)
          .json({ message: "Unauthorized", code: res.statusCode });
      }
      res.redirect("/");
    }
  } else {
    if (req.method == "PATCH" || req.method == "DELETE") {
      return res
        .status(404)
        .json({ message: "Not found", code: res.statusCode });
    }
    res.render("404");
  }
};

// check access  to edit user
const axiosApi = require("../api/axios.api.js");
const api = new axiosApi("users");
exports.permissionToEditProfile = async (req, res, next) => {
  const { user } = res.locals;
  const requestedProfileId = req.params.id;
  try {
    const response = await api.getOneById(requestedProfileId);
    const userFromDb = await response.data;
    if (user.id === userFromDb.id) {
      return res.json({
        message: "you can not access to this route",
        code: res.statusCode,
      });
    } else {
      next();
    }
  } catch (err) {
    res.json({ message: err.message, code: res.statusCode });
  }
};
