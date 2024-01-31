const jwt = require("jsonwebtoken");
const config = require("./config/config.json")
const sessionModel = require("./models/sessionModel");


module.exports = {
  trainee: async (req, res, next) => {
    try {
      const token = req.cookies.auth;

      if (!token || token == undefined) {
        return res.send({
          error: "unauthorized User",
        });
      }
      jwt.verify(token, config.jwt.secret, async (error, user) => {
        if (error) {
          return res.send({
            error: error,
          });
        }

        const session = await sessionModel.getSession(user.userId, token);

        if (session.error || !session.response) {
          return res.send({
            error: "unauthorized User",
          });
        }
        if (user.role !== "trainee") {
          return res.send({
            error: "unauthorized User",
          });
        }
        next();
      });
    } catch (error) {
      return res.send({
        error: "unauthorized User",
      });
    }
  },

  instructor: async (req, res, next) => {
    try {
      console.log("cookies ", req.cookies);
      const token = req.cookies.auth.token;

      if (!token || token == undefined) {
        return res.send({
          error: "unauthorized User",
        });
      }
      jwt.verify(token, config.jwt.secret, async (error, user) => {
        console.log("user ", user);
        if (error) {
          return res.send({
            error: error,
          });
        }

        const session = await sessionModel.getSession(user.userId, token);

        if (session.error || !session.response) {
          return res.send({
            error: "unauthorized User",
          });
        }

        if (user.role !== "instructor") {
          return res.send({
            error: "unauthorized User",
          });
        }
        next();
      });
    } catch (error) {
      return res.send({
        error: "unauthorized User",
      });
    }
  },
admin: async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    if (!token || token == undefined) {
      return res.send({
        error: "unauthorizedddd User",
      });
    }

    jwt.verify(token, config.jwt.secret, async (error, user) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
        if (user.role !== "admin") {
        return res.send({
          error: "unauthorizeddd User",
        });
      }
      next();
    });
  } catch (error) {
    return res.send({
      error: "unauthorized User",
    });
  }
},
logout: async (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (!token || token.trim() === "") {
      return res.json({ error: "Unauthorized User" });
    }

    jwt.verify(token, config.jwt.secret, async (error, user) => {
      console.log("userId", token)
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return res.json({ error: "Token Expired" });
        }
        return res.json({ error: "Unauthorized User" });
      }

      // logout logic here to validate
      
      const deleteSession = await sessionModel.deleteSession(user.userId);

      if (deleteSession.error) {
        return res.json({ error: "Internal Server Error" });
      }

      // Clear client-side cookie
      res.clearCookie("auth");

      return res.json({ response: "Logout successful" });
    });
  } catch (error) {
    return res.json({ error: "Internal Server Error" });
  }
}
}