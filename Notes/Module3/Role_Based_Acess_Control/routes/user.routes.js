const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

const UserRoute = express.Router();

UserRoute.get("/", async (req, res) => {
  try {
    let data = await UserModel.find();
    res.status(200).json({ msg: "Users List", data });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

UserRoute.post("/signup", async (req, res) => {
  try {
    // email and password is coming from req.body
    // hash the password, before storing to the db
    /// hash....??
    let myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).json({ msg: "Something went wrong" });
      } else {
        /// password hashed,
        await UserModel.create({ ...req.body, password: hash });
        res.status(200).json({ msg: "User Created" });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

UserRoute.post("/login", async (req, res) => {
  try {
    // email and password is coming from req.body
    // check whether user is present in the db
    let userPresent = await UserModel.findOne({ email: req.body.email });
    if (userPresent) {
      /// compare the password and hashed password
      // how to compare...?
      let myPlaintextPassword = req.body.password; // raw password coming from client
      let hash = userPresent.password; // stored hashed password from DB
      bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
        // result == true

        if (err) {
          res.status(500).json({ msg: "Something went wrong" });
        } else {
          /// got the result
          // if result is true, which means both passwords matched
          if (result) {
            /// need to generate and send the token
            var token = jwt.sign(
              { userId: userPresent._id, role: userPresent.role },
              "shhhhh"
            );
            res.status(200).json({ msg: "Login Sucess", token });
          } else {
            /// result is false, which means the passowrd didnot match
            res
              .status(403)
              .json({
                msg: "Wrong Password, please try again with correct password",
              });
          }
        }
      });
    } else {
      // user not present
      res.status(404).json({ msg: "User Not Found, Please signup first...." });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = UserRoute;
