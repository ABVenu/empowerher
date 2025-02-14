const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const saltRounds = Number(process.env.SALT_ROUNDS);
const UserRouter = express.Router();
const nodemailer = require("nodemailer");

UserRouter.get("/getusers", (req, res) => {
  res.send("This is test user route");
});

// UserRouter.post("/signup", (req,res)=>{
//     // email, name, passsword, role coming from req.body from postman
//     UserModel.create(req.body).then(()=>{res.status(201).json({msg:"Signup Sucess"})}).catch((err)=>{ res.status(500).json({msg:"Error in signup"})})
// })

UserRouter.post("/signup", async (req, res) => {
  // email, name, passsword, role coming from req.body from postman
  try {
    let myPlaintextPassword = req.body.password; // it is raw password coming from body
    bcrypt.hash(myPlaintextPassword, saltRound, async function (err, hash) {
      // Store hash in your password DB.

      if (err) {
        res.status(500).json({ msg: "Error in signup" });
      } else {
        /// we got the hashed password
        /// hash the password & replace it with raw password before storing into the db
        let userInfo = { ...req.body, password: hash };
        await UserModel.create(userInfo);
        res.status(201).json({ msg: "Signup Sucess" });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Error in signup" });
  }
});

UserRouter.post("/login", async (req, res) => {
  // email, name, passsword, role coming from req.body from postman
  try {
    const { email, password } = req.body;
    // compare the raw password from body with the hashed password stored in db
    // to compare,  i should get the user from db

    let userInDB = await UserModel.findOne({ email });

    // is user exists, then compare the password else just respond as User Not found
    if (userInDB) {
      // user found, now compare the raw password with hashed password
      let myPlaintextPassword = password; // which is req.body.password destructured above
      let hashedPassword = userInDB.password; // which is hashed password stored in db
      bcrypt.compare(
        myPlaintextPassword,
        hashedPassword,
        function (err, result) {
          if (err) {
            res.status(500).json({ msg: "Error in login" });
          } else {
            /// either password matched whose result is true
            // or
            // pasworrd match failed whose resukt is false

            if (result) {
              // need to send a token which will be valid for next 20 mins so that user can use other features seamlessly
              /// how to send a token??
              // use jwt, encode userId and role in the token 
              var token = jwt.sign({ userId: userInDB._id, role: userInDB.role}, process.env.JWT_SCERET_KEY,{ expiresIn: '20min' } );
              res.status(200).json({ msg: "Login sucess..", token });
            } else {
              res.status(403).json({ msg: "Wrong Password" });
            }
          }
        }
      );
    } else {
      res.status(404).json({ msg: "User Not Found" });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({ msg: "Error in Login" });
  }
});

UserRouter.post("/forget-password", async (req,res)=>{
 
  // it accepts the email from the body
  /// now generate the jwt token adnd attach with the hoisting domain and send to user's emai

  let  userInDB = await UserModel.findOne({email: req.body.email})
   if(!userInDB){
    /// user not found
    res.status(404).json({msg:"User Not Found, Please Signup/Register"})
   }else{
    /// user if found
    // generate a token 
    var token = jwt.sign({ userId: userInDB._id}, process.env.JWT_SCERET_KEY,{ expiresIn: '30min' } );
    let linkToBeSent = `http://localhost:8080/users/reset_password/${token}`;
    // console.log(linkToBeSent)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.USER_EMAIL ,
        pass: process.env.USER_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: '"Venugopal Burli 👻" <venubjms@gmail.com>', // sender address
      to: userInDB.email, 
      // to: "venugopal.burli@masaischool.com, mayurishinde24304@gmail.com, ayushishandilya787@gmail.com,pathakshubhi4682@gmail.com, premat5567@gmail.com,niharika.sureddi@gmail.com,kumbhareashwini04@gmail.com,sandhya85.b@gmail.com,patanabida1106@gmail.com", // list of receivers
      subject: "Reset Password", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Hello Dear User, Please click on below link to reset password, Please finish within 20 mins</b>
              <h5>${linkToBeSent }</h5>`, // html body
    });
    res.send("Email Sent, Please check the email and click on reset password link")
    
   }
   
  UserRouter.get("/reset_password/:token", (req,res)=>{
    try{
      // token from params
      let token = req.params.token
      var decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
      // console.log("decoded", decoded)
     // console.log(token)
     if(decoded){
      res.send(`<form action="/users/reset_password/${token}" method="POST" >
        <h3>Please Enter Password To Be Reset</h3>
        <input name="password" placeholder="Enter Password to be reset" />
        <input type="submit" value="Reset Password" />
        </form>`)
     }else{
      res.status(403).json({msg: "Link Expired"})
     }
      
      }catch(err){
        res.status(500).json({msg:"Error in reset"})
      }

  })

  UserRouter.post("/reset_password/:token",async (req,res)=>{
    // token from params
    try{
      let token = req.params.token
      var decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
      const newPassword = req.body.password;
      // console.log(req.body)
      if(decoded){
        // token is valid
        await UserModel.findByIdAndUpdate(decoded.userId, {password:newPassword})
        res.send("Passsword Reset Sucess")
      }else{
        res.status(403).json({msg: "Link Expired"})
      }
    }catch(err){
      res.status(500).json({msg:"Error in reset"})
    }
    

})
   


})

module.exports = UserRouter;
