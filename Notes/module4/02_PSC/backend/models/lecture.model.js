const mongoose = require("mongoose");


const LectureSchema = new mongoose.Schema({
    title:String,  // req.body 
    startDateTime:Date, // req.body 
    endDateTime:Date, // req.body 
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:"course"}, // req.body 
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"},  // come from auth MW
    Notes:String, // optional
    attendance:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]  // updated in another route, when student join the lecture
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})


const LectureModel = mongoose.model("lecture", LectureSchema);

module.exports = LectureModel