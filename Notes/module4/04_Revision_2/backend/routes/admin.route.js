const express = require("express");
const authMiddleware = require("../middlewares/auth.mw");
const CourseModel = require("../models/course.model");
const LectureModel = require("../models/lecture.model");


const AdminRoutes = express.Router();


/// Adding the course
AdminRoutes.post("/course/add",authMiddleware(["admin"]), async (req,res)=>{
    /// This is a protected route only authneticated users that too admins should use this
    /// title:String, startDateTime:Date,  endDateTime:Date, 
    //  createdBy should be attached from req.userId
    try{
        let course = await CourseModel.create({...req.body,createdBy: req.userId })
        res.status(201).json({msg:"Course Created", course})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Error in adding the course"})
    }
})
// AdminRoutes.use(authMiddleware)
AdminRoutes.post("/lecture/add",authMiddleware(["admin"]), async (req,res)=>{
    /// This is a protected route only authneticated users that too admins should use this
    // title:String,   startDateTime:Date,         endDateTime:Date, courseId:, // req.body 
    //  createdBy should be attached from req.userId
    try{
        let lecture = await LectureModel.create({...req.body,createdBy: req.userId })
        // once lecture id is generated, put that Id in the Course.lectures array
        let course = await CourseModel.findOne({_id:req.body.courseId})
        course.lectures.push(lecture._id)
        await course.save()
        res.status(201).json({msg:"Lecture Created", lecture})
    }catch(err){
        res.status(500).json({msg:"Error in adding the lecture"})
    }
})
 //// get all the lectures of the course
AdminRoutes.get("/lecture/get/:courseId",authMiddleware(["admin"]), async (req,res)=>{
    /// This is a protected route only authneticated users that too admins should use this
    // courseId is coming from params
    try{
        let courseDetails = await CourseModel.findOne({_id:req.params.courseId}).populate("lectures")
        // console.log(lectures)
        // once lecture id is generated, put that Id in the Course.lectures array
        res.status(201).json({msg:"List of Lectures", lectures: courseDetails.lectures})
    }catch(err){
        res.status(500).json({msg:"Error in getting the lecture by course id"})
    }
})


/// create assignment
module.exports = AdminRoutes;
