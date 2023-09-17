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
    if (req.method == "PATCH") {
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
      if (req.method == "PATCH") {
        return res
          .status(401)
          .json({ message: "Unauthorized", code: res.statusCode });
      }
      res.redirect("/");
    }
  } else {
    if (req.method == "PATCH") {
      return res
        .status(404)
        .json({ message: "Not found", code: res.statusCode });
    }
    res.render("404");
  }
};
