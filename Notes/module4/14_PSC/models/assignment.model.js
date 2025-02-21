const mongoose = require("mongoose");


const AssignmentSchema = new mongoose.Schema({
    title:String,  // req.body 
    startDateTime:Date, // req.body 
    endDateTime:Date, // req.body 
    lectureId:{type:mongoose.Schema.Types.ObjectId, ref:"lecture"}, //  req.body after creation of course
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"}, // come from auth MW
    submissions:[{type:mongoose.Schema.Types.ObjectId, ref:"submission"}]  // will be updated by another route when students submit the assignment
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})


const AssignmentModel = mongoose.model("assignmnet", AssignmentSchema);

module.exports = AssignmentModel