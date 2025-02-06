const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const saltRounds = Number(process.env.SALT_ROUNDS);
const UserRouter = express.Router();

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
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
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

module.exports = UserRouter;
