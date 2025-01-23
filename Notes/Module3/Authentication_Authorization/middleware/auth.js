var jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    // checks whether use logged in with valid token

    // if token present, check for validity
    // if valid token 
    // allow next for protected route
    // if no, send him a response as Unauthorised
    let token = req.headers.authorization.split(" ")[1]
    //console.log(token);
    if(!token){
        res.status(403).json({msg:"User Not Logged In"})
        return
    }
    
    try{
        // token present, need to verify 
        var decoded = jwt.verify(token, 'shhhhh');
        if(decoded){
            /// valid token, in that allow next
            req.body.userId = decoded.userId
            next()
        }else{
            // in valid token 
            res.send("UnAuthorised")
        }
        
    }catch(err){
        console.log(err);
        res.send("Something went wrong, please try again later")
    }
    
}

module.exports = authMiddleware;