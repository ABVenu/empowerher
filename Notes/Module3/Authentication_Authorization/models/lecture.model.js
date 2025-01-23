const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    title:String, 
    attendance:{type:Number, default:0},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
})


const LectureModel = mongoose.model("lecture", LectureSchema);

module.exports = LectureModel;