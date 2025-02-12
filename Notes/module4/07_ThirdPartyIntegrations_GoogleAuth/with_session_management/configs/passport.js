var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require("passport");
const UserModel = require('../models/user.model');
var jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
   // console.log("profile",  profile.email)

    /// create a user in mongodb also provide a jwt token...? 
    let user;
    let token; 
    user = await UserModel.findOne({googleId: profile.id})

    if(user){
        // user present 
        // genewrate jwt and send as a response
        token = jwt.sign({ userId: user._id }, 'shhhhh');
    }else{
        // user not present 
        /// create
        user = await UserModel.create({googleId:profile.id,email:profile.email})
        // genrate jwt and send as a response
        token = jwt.sign({ userId: user._id}, 'shhhhh');
    }
    done(null, {user, token})
  }
));