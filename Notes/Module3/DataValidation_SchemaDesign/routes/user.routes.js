const express = require("express");
const UserModel = require("../models/user.models");

const UserRouter = express.Router();

UserRouter.post("/add", async (req, res) => {
  /// mongodb, external source, it async in nature,
  // anything that should be happened after mongo operations, need to  wait,
  // hence we use await,
  // await will work only with async function

  // req.body is the data sent by  the client

  // check whether user is present in db;
    // let existingUser = await UserModel.findOne({email:req.body.email})

    // if(existingUser){
    //   res.send("User Already Present Please Login....")
    // }else{
      
    //   if(req.body.password && req.body.email){
    //     let user = await UserModel.create(req.body);
    //     res.json({msg:"user created", details:user})
    //   }else{
    //     res.send("Please provide email & password")
    //   }
      
    // }



  try {
    //.create method
    //let user = await UserModel.create(req.body);
    // .save method
    // let user = new UserModel(req.body);
    // await user.save()
    /// InsertMany
    let user = await UserModel.insertMany([req.body])
    res.status(201).json({ msg: "user created", details: user });
  } catch (err) {
    console.log(err)
    res.status(400).send("Something went wrong while signup....");
  }
});

module.exports = UserRouter;
