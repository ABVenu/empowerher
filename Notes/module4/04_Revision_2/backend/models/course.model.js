const mongoose = require("mongoose");


const CourseSchema = new mongoose.Schema({
    title:String,  // req.body 
    startDateTime:Date, // req.body 
    endDateTime:Date, // req.body 
    lectures:[{type:mongoose.Schema.Types.ObjectId, ref:"lecture"}], //  will be added while creating a lecture
    students:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}],  // req.body after creation of course
    assignments:[{type:mongoose.Schema.Types.ObjectId, ref:"assignment"}],  // req.body after creation of course
    isActive:{type:Boolean, default:true},   /// default true no need to worry
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"} // come from auth MW

}, {
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})


const CourseModel = mongoose.model("course", CourseSchema);

module.exports = CourseModel