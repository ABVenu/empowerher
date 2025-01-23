const express = require("express");
const PostModel = require("../models/post.model");

const PostRouter = express.Router();


PostRouter.post("/add", async (req,res)=>{
   try{
    let post = await PostModel.create(req.body)

    res.status(201).json({msg:"Post Created", data:post})
   }catch(err){
    console.log(err);
    res.status(500).json({msg:"Something went wrong in adding Post"})
   }
})

module.exports = PostRouter;