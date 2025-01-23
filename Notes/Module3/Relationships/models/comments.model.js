const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    desc:{type:String, required:true},
    likes:{type:Number, default:0}, 
    postId:{type: mongoose.Schema.Types.ObjectId, ref:"post"} // core part of relationship
})


const CommentModel = mongoose.model("comment", CommentSchema);

module.exports = CommentModel;