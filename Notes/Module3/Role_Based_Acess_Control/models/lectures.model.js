const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    title:{type:String, required:true},
    attendance:{type:Number, default:0},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
    
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})

const LectureModel= mongoose.model("lecture", LectureSchema);


module.exports = LectureModel;