const express = require("express");
const UserModel = require("../models/user.model");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("This is user get route");
});

userRouter.post("/add", async (req, res) => {
  try {
    /// req.body will the be the user details coming from client
    console.log(req.body);
    /// need to insert the req.body into the UserModel
    // req.body is an object
    let user = await UserModel.create(req.body);
    res.status(201).json({ msg: "User Created", data: user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong in adding the user");
  }
});

userRouter.get("/get", async (req, res) => {
  let data = await UserModel.find({},{password:0, __v:0});
  /// hides password and versionkey and give the raw data
  res.send(data);
});

userRouter.patch("/update/:id", async (req, res) => {
  /// id is coming from params
  /// changes/updations is coming from body
  await UserModel.findByIdAndUpdate(req.params.id, req.body);
  res.send("user Details Updated");
});

userRouter.delete("/delete/:id", async (req, res) => {
  /// id is coming from params
  await UserModel.findByIdAndDelete(req.params.id);
  res.send("User Deleted");
});

userRouter.get("/get/:id", async (req, res) => {
  // req.params is having an id
  console.log(req.params);
  let user = await UserModel.find({ _id: req.params.id });
  res.send(user);
});

module.exports = userRouter;
