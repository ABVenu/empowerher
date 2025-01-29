const mongoose = require("mongoose");


const CourseSchema = new mongoose.Schema({
    name:String,
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"}, 
    lectures:[{type:mongoose.Schema.Types.ObjectId, ref:"lecture"}],
    assignments:[{type:mongoose.Schema.Types.ObjectId, ref:"assignment"}],
    students:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
}) 


const CourseModel = mongoose.model("course", CourseSchema);

module.exports = CourseModel;