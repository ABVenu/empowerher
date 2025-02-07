const mongoose = require("mongoose");


const SubmissionSchema = new mongoose.Schema({
    ans:String,  // req.body sent by students
    assignmentId:{type:mongoose.Schema.Types.ObjectId, ref:"assignmnet"}, //  from req.body by students
    submiitedBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"}, // come from auth MW
    
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})


const SubmissionModel = mongoose.model("submission", SubmissionSchema);

module.exports = SubmissionModel