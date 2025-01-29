const express = require("express");
const CourseModel = require("../models/course.model");
const authMiddleware = require("../middlewares/auth");
const LectureModel = require("../models/lectures.model");


const AdminRoutes = express.Router();

// need to create a course

AdminRoutes.post("/course/add",authMiddleware("admin") ,async (req,res)=>{
    /// name, students Id from req.body and the userId for createdBy should come from auth Mw
    try{
        let course = await CourseModel.create({...req.body,createdBy:req.body.userId})
        res.status(201).json({msg:"course created", data:course})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Error in creating course"})
    }
})

/// create lecture

AdminRoutes.post("/lecture/add",authMiddleware("admin"), async(req,res)=>{
    try{
    /// title is coming from req.body & the userId for createdBy should come from auth Mw
    let lecture = await LectureModel.create({...req.body,createdBy:req.body.userId})
    res.status(201).json({msg:"lecture created", data:lecture })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Error in creating lecture"})
    }
} )
module.exports = AdminRoutes;