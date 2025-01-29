const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    title:{type:String},
    startDate:{type:Date, default:Date.now()},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    attendanceDetails:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]
    
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})

const LectureModel= mongoose.model("lecture", LectureSchema);


module.exports = LectureModel;