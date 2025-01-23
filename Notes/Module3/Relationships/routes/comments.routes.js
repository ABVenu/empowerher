const express = require("express");
const CommentModel = require("../models/comments.model");
const PostModel = require("../models/post.model");

const CommentsRouter = express.Router();


CommentsRouter.post("/add",async (req,res)=>{
    try{
        let post = await PostModel.findOne({_id: req.body.postId})
        let comment = await CommentModel.create(req.body);
        console.log(post)
        post.comments.push(comment._id)
        await post.save()
        res.status(201).json({msg:"Comment Created", data:comment})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Something went wrong in adding Comment"})
       }
})


// CommentsRouter.post("/add", async (req,res)=>{
//     try{
//         let comment = await CommentModel.create(req.body)
//     res.status(201).json({msg:"Comment Created", data:comment})
//     }catch(err){
//         console.log(err);
//         res.status(500).json({msg:"Something went wrong in adding Comment"})
//        }
// })


// CommentsRouter.get("/get/:postId", async(req,res)=>{
//     try{
//         // from params i get Post Id
//     let postId = req.params.postId
//     let posts = await CommentModel.find({postId:postId}).populate("postId")
//     res.status(200).json({msg:"Here is the list of the comments", data:posts})
//     }catch(err){
//         console.log(err);
//         res.status(500).json({msg:"Something went wrong in getting Comments"})
//        }
// })

CommentsRouter.get("/get/:postId", async(req,res)=>{
    try{
        // from params i get Post Id
    let postId = req.params.postId
    let post = await PostModel.find({_id:postId}).populate("comments")
    res.status(200).json({msg:"Here is the list of the comments", data:post})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Something went wrong in getting Comments"})
       }
})

module.exports = CommentsRouter;