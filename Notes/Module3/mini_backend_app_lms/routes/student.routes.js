const express = require("express");
const CourseModel = require("../models/course.model");
const authMiddleware = require("../middlewares/auth");


const StudentRoutes = express.Router();

/// get my course--> a particular student should get his only course

StudentRoutes.get("/courses/get",authMiddleware("student") ,async(req,res)=>{
    try{
      let courses = await CourseModel.find()

      let myCourse = courses.filter((el)=> el.students.includes(req.body.userId))
      // courses is array of objects
      // i need to filter only a particular studentId course?? 
      res.status(200).json({msg:"Course List", data:myCourse})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Error in getting course"})
    }
})

module.exports = StudentRoutes;