var jwt = require("jsonwebtoken");
const jwtSecretkey = process.env.JWT_SECRET_KEY;

const authMw = async (req,res,next)=>{
   /// takes token from req.header
   /// validated the token, if valid, allow next
   /// else send res as UnAuthorised

   try{
    let token = req.headers?.authorization?.split(" ")[1];

    if(!token){
        // token not found
        res.status(403).json({msg:"Token Not Found"})
    }else{
        // token found
        // check the validity of the token
        var decoded = jwt.verify(token, jwtSecretkey);
        if(decoded){
            // token is valid and encrypted data extracted
           // console.log("decoded data", decoded);
            req.body.userId = decoded.userId;
            /// allow to next process
            next()
        }else{
             res.status(403).json({msg:"UnAuthorised, Please Login"})
        }
    }
   }catch (err) {
    console.log(err.errors);
    res.status(500).json({ msg: "Error in Auth Token , (catch)" });
  }
}


module.exports = authMw;