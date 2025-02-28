const express = require("express");
var jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserRoutes = express.Router();

UserRoutes.post("/signup", async (req,res)=>{
    // check whether user is present in the DB
    // if so, response as please login else store in DB by hashing the password

    let user = await UserModel.findOne({email: req.body.email})

    try{
        if(user){
            // user already present 
            res.status(303).json({msg:"User Already Present, Please Login"})
        }else{
            // user not foun, hash and store the password
            bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                // Store hash in your password DB.
    
                if(err){
                    return res.status(500).json({msg:"Something went wrong"})
                }
    
                await UserModel.create({...req.body, password:hash})
                res.status(201).json({msg:"Signup Sucess"})
            });
    
        }
    }catch(err){
        return res.status(500).json({msg:"Something went wrong"})
    }
})

UserRoutes.post("/login", async (req,res)=>{
    // check whether user is present in the DB
    // if so, response as please login else store in DB by hashing the password

    let user = await UserModel.findOne({email: req.body.email})

    try{
        if(user){
            // user already present , comapre the password then generate token and send the token
            bcrypt.compare(req.body.password, user.password).then(function(result) {
                // result == true

                if(result){
                    // generate token 
                    var token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn:"30mins"});
                    res.status(200).json({msg:"Login Sucess", token})
                }else{
                    res.status(403).json({msg:"Wrong Password"})
                }
            });
            
            // res.status(303).json({msg:"User Already Present, Please Login"})
        }else{
            // user not foun,send him to signup
            res.status(303).json({msg:"User Not Present, Please Signup"})
    
        }
    }catch(err){
        return res.status(500).json({msg:"Something went wrong"})
    }
})

module.exports = UserRoutes;