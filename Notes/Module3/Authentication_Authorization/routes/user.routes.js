const express = require("express");
const bcrypt = require('bcrypt');
const UserModel = require("../models/user.model");
const saltRounds = 10; /// it is very imp and it should be secret 
//const myPlaintextPassword = 's0/\/\P4$$w0rD';  // from body
// const someOtherPlaintextPassword = 'not_bacon';  // another password for comparision
var jwt = require('jsonwebtoken');
const UserRouter = express.Router();

UserRouter.post("/signup", async (req,res)=>{

    /// from req.body --> email and password...
    /// password is raw password 
    /// I need to hash the password and save it, not the raw password
    /// how to hash the password??
    // bcrypt--> hashing module
    let myPlaintextPassword = req.body.password;
    console.log("original password", myPlaintextPassword)
    bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            console.log(err)
        }else{
            // once hashed password is ready
            // then store the user with hashed password in db
            let userData = {...req.body, password: hash};
            await UserModel.create(userData);
            res.send("Signup Sucess")
        }
    });
    // res.send("Hi")
})

UserRouter.post("/login", async(req,res)=>{
    // req.body --> email and raw password

    // check whether user is present is present
    // if yes, compre the hashed password and allow the user
    /// if no, User Not Registered

    let user = await UserModel.findOne({email: req.body.email});

    if(!user){
        res.send("User Not Found Please Register")
    }else{
        // user found, 
        // then comapre the passwords
        let myPlaintextPassword = req.body.password;  // raw password from client 
        let hash = user.password;  // stored hashed password, user if found by findOne above
        bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
        //    console.log(result)

        if(result){
            /// password is matched...
            /// then genrate a token, so that user can explore features comfortably 
            var token = jwt.sign({userId:user._id }, 'shhhhh');
            res.json({msg:"Login Sucess...", token})
        }else{
            res.send("Wrong Password")
        }
        });
    }

    //res.send("Hi")

})

module.exports = UserRouter;