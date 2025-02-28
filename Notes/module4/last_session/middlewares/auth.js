var jwt = require("jsonwebtoken");

const AuthMiddleware = (role) => {
    // role is array of allowed roles
  return (req, res, next) => {
    let token = req.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded) {
          // token is valid
          // attach user Id and role to req.body
          //console.log(decoded.role)
          if (role.includes(decoded.role)) {
            // rol based auth
            req.userId = decoded.userId;
            req.role = decoded.role;
            next();
          } else {
            res.status(400).json({ msg: "UnAuthorised" });
          }
        } else {
          res.status(402).json({ msg: "Token Vlidation Failed, Please Login" });
        }
      } else {
        // token is not present

        res.status(403).json({ msg: "Token Not Found, Please Login" });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  };
};

module.exports = AuthMiddleware
