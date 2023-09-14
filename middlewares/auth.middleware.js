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
