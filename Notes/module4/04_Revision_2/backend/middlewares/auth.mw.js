var jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles)=>{
  /// allowedRoles is the array paased in the route
  /// particular route decides whom to allow 
  return (req, res, next) => {
    /// login token is generally sent through the headers
    let token = req.headers?.authorization?.split(" ")[1];
    try {
      if (!token) {
        res.status(403).json({ msg: "Token Missing, Please Login Again " });
      } else {
        // token is present
        /// check its validity
        var decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
        if (decoded) {
          // token verified
          /// attach the userId to req
          //console.log(decoded)
          if(allowedRoles.includes(decoded.role)){
            req.userId = decoded.userId;
            next();
          }else{
            res.status(403).json({ msg: "UnAuthorized"});
          }
          
        } else {
          res.status(500).json({ msg: "Error in verifying token " });
        }
      }
    } catch (err) {
      res.status(500).json({ msg: "Error in verifying token " });
    }
  }; 
}

module.exports = authMiddleware;
