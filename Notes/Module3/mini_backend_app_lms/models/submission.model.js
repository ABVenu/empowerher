const mongoose = require("mongoose");


const SubmissionSchema = new mongoose.Schema({
    answer:String, 
    assignmentId:{type:mongoose.Schema.Types.ObjectId, ref:"assignment"},
    submiitedAt:{type:String, default:Date.now()},
    studentId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    marks:{type:Number, default:0},
    isverified:{type:Boolean, default:false}
},
{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})


const SubmissionModel = mongoose.model("submission", SubmissionSchema);

module.exports = SubmissionModel;