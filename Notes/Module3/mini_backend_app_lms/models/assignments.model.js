const mongoose = require("mongoose");


const AssignmentSchema = new mongoose.Schema({
    title:String, 
    description:String,
    startDate:{type:Date, default:Date.now()},
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:"course"},
    submissions:[{type:mongoose.Schema.Types.ObjectId, ref:"submission"}]
},
{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})


const AssignmentModel = mongoose.model("assignment", AssignmentSchema);


module.exports = AssignmentModel;