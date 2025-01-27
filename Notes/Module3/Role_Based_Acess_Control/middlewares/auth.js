var jwt = require("jsonwebtoken");

const authMiddleware = (...allowedRole)=>{
    // console.log("allowedrole", allowedRole)
    return (req,res,next)=>{
        /// need to check the token
     
        let token = req.headers.authorization.split(" ")[1];
     
        if(!token){
         res.status(403).json({msg:"Token not found, please login"})
        }else{
         // token is present
         // check the validity of token
         /// how??
         var decoded = jwt.verify(token, 'shhhhh');
         //console.log(decoded)
         if(decoded){
             /// token is valid
             // userId and role from decoded
             // need to check the role...???
            // console.log("allowedRole", allowedRole, "role from token", decoded.role)
             if(allowedRole.includes(decoded.role) ){
                req.body.userId = decoded.userId;
                next()
             }else{
                res.status(403).json({msg:"Unauthorised....."})
             }
            
         }else{
             res.status(403).json({msg:"Please login Again..."})
         }
        }
     
     }
}

module.exports = authMiddleware;