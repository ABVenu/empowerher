const express = require("express");
require("dotenv").config();
const UserRoute = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const jwtSecretkey = process.env.JWT_SECRET_KEY;
const UserModel = require("../models/user.model");
const saltRounds = Number(process.env.SALT_ROUND);

// console.log(typeof saltRounds )

UserRoute.post("/signup", async (req, res) => {
  try {
    /// name, email, password is coming from req.body
    // hash the password and then store in db
    // to hash, need to call bycrypt
    let rawPassword = req.body.password;
    bcrypt.hash(rawPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).json({ msg: "Error in signup" });
      }
      // hash generated
      // replace the raw password cominng from body with hashed password
      let user = { ...req.body, password: hash };
      /// store user in db
      await UserModel.create(user);
      res.status(201).json({
        msg: "User Created",
        email: req.body.email,
        password: req.body.password,
      });
    });
  } catch (err) {
    console.log(err.errors);
    res.status(500).json({ msg: "Error in signup , (catch)" });
  }
});

UserRoute.post("/login", async (req, res) => {
  // email and password in coming from req.body
  /// check the user is present in DB,
  // if yes, comapre the password and generate jwt token
  // if no, send response as User Not Found
  try {
    let userInDb = await UserModel.findOne({ email: req.body.email });
    if (!userInDb) {
      /// user not found,
      res.status(404).json({ msg: "User Not Found, Please Signup...." });
    } else {
      /// user found
      // comapre the password
      let myPlaintextPassword = req.body.password;
      let hashedPassword = userInDb.password;
      bcrypt.compare(
        myPlaintextPassword,
        hashedPassword,
        function (err, result) {
          // result == true
          if (err) {
            res
              .status(500)
              .json({ msg: "Error in Login, Please Try Again Later" });
          }
          // result
          if (result) {
            // password matched
            // generate jwt token
            let dataToBeEncryptedInToken = { userId: userInDb._id };
            var token = jwt.sign(dataToBeEncryptedInToken, jwtSecretkey, {
              expiresIn: "20mins",
            });

            res.status(200).json({ msg: "Login Sucess...", token });
          } else {
            /// password not matched
            res.status(403).json({ msg: "Wrong Password..." });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in login , (catch)" });
  }
});

UserRoute.post("/resetpassword", async (req, res) => {
  // email is coming from query and password is coming from body
  try {
    let userInDb = await UserModel.findOne({ email: req.query.email });
    console.log(userInDb)
    if (!userInDb) {
      /// user not found,
      console.log("if block")
      res.status(404).json({ msg: "User Not Found, Please Signup...." });
    } else {
      // user is present
      // hash the raw password coming from body
      let rawPassword = req.body.password;
      bcrypt.hash(rawPassword, saltRounds, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          res.status(500).json({ msg: "Error in Reset" });
        }
        // hash generated
        // replace the raw password cominng from body with hashed password
        // update the user witrh new hashed password

        /// update password in db
        //method 1, is .save() method

        // userInDb.password = hash
        // await userInDb.save()

        // method2, findByID& Update
        await UserModel.findByIdAndUpdate(userInDb._id, { password: hash });
        res.status(200).json({
          msg: "Password Reset Sucess...",
          email: req.body.email,
          password: req.body.password,
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in Reset Password , (catch)" });
  }
});
module.exports = UserRoute;
