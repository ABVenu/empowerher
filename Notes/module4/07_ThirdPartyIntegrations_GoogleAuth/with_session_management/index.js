const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const connectToDb = require("./configs/mongo.config");
require("dotenv").config();
require("./configs/passport");
app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/signup", (req, res) => {
  res.send(`<a href="/auth/google" >Login with Google </a>`);
});
app.get(  "/auth/google",  passport.authenticate("google", { scope: ["email", "profile"] }));

//   app.get('/auth/google/callback', passport.authenticate( 'google', {session:false}), (req,res)=>{
//     console.log(req.user)
//       res.json({msg: "Welcome to website", token:req.user.token})
//   });

app.get( "/auth/google/callback",  passport.authenticate("google",{
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
} )
);

app.get("/myinfo", (req,res)=>{
    // console.log(req.isAuthenticated())

    if(!req.isAuthenticated()){
       // res.send("Not Allowed, Please Login")
        res.redirect("/auth/google")
    }else{
        res.send("This is my info page")
    }
    
})

app.get("/auth/google/success", (req, res) => {
  res.send("Google Login Sucess");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Google Login Failed");
});
app.listen(8080, () => {
  connectToDb();
  console.log("server started on 8080 port");
});
