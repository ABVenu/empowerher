const express = require("express");
const fs = require("fs")
const { getUser } = require("../controllers/user.controller");
/// all user route logic here
const userRouter = express.Router();

userRouter.get("/", (req,res)=>{
    res.send("This is Get User Route")
})


userRouter.post("/signup", (req,res)=>{
    ///req.body --> has name and email 
    console.log(req.body);
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"))
    data.users.push({...req.body, id:Date.now()})
    fs.writeFileSync("./db.json", JSON.stringify(data))
    res.json({msg: "signup sucess...."})
})

module.exports = userRouter;