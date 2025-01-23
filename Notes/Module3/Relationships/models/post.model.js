const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
    title:{type:String, required:true},
    desc:String,
    likes:{type:Number, default:0}, 
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:"comment"}]

},{
    versionKey:false
})


const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel