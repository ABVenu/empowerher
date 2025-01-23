

const protectedRoute = (req,res,next)=>{
    /// /comments are not accessible

    if(req.url.includes("/admin")){
        res.status(404).send("This is protected route")
    }else{
      /// let this mw allows to next logic
      next()
    }
};


module.exports = protectedRoute;