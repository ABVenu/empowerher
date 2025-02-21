const express = require("express");
const authMiddleware = require("../middlewares/auth.mw");
const CourseModel = require("../models/course.model");
const LectureModel = require("../models/lecture.model");
var cron = require('node-cron');
const Redis = require("ioredis");
const ObjectsToCsv = require('objects-to-csv');
// redis-11607.c305.ap-south-1-1.ec2.redns.redis-cloud.com:11607
const redis = new Redis(
    {
        host: 'redis-11607.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 11607,
        username: 'default',
        password: 'xUtLJ4A9M5iXgwACnHxU7LP84HpkGTmp',
    }
); 
const AdminRoutes = express.Router();

cron.schedule('* * * * *', async () => {
    /// get the added course from redis and push into mongodb
    const cachedData = await redis.get("addcourses");
   if(cachedData){
    let parsedData = JSON.parse(cachedData)
    // parsedData is array of courses
   // console.log("from Cron Job", parsedData)
    // push the data into Mongo
    await CourseModel.insertMany(parsedData)
    console.log("courses added from Redis to Mongo")
    // then remove the data from redis as it is already pushed into Mongo
    await redis.del("addcourses")
    console.log("Courses Deleted From Redis")
   }else{
    console.log("No Courses To Add In Redis")
   }
  });

/// Adding the course
AdminRoutes.post("/course/add",authMiddleware(["admin"]), async (req,res)=>{
    /// This is a protected route only authneticated users that too admins should use this
    /// title:String, startDateTime:Date,  endDateTime:Date, 
    //  createdBy should be attached from req.userId
    try{
        
        let course = await CourseModel.create({...req.body,createdBy: req.userId })
        res.status(201).json({msg:"Course Created From Backend", course})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Error in adding the course"})
    }
})
// getting the course
AdminRoutes.get("/course/get", async (req,res)=>{
    /// This is a protected route only authneticated users that too admins should use this
    /// title:String, startDateTime:Date,  endDateTime:Date, 
    //  createdBy should be attached from req.userId
    try{
        const cacheKey = "courses";
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({ msg: "Course List - Redis", courses: JSON.parse(cachedData) });
        }else{
            let courses = await CourseModel.find()
              // Store data in Redis with a 1-minute expiry
            await redis.set(cacheKey, JSON.stringify(courses), "EX", 160);
            res.status(200).json({msg:"Course List-Mongo", courses})
        }
       
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Error in getting the course"})
    }
})

AdminRoutes.get("/course/report", async(req,res)=>{
    let data = await CourseModel.find().lean();
    // .lean to remove hidden key value pair which is added behind scenes from mongo
    const csv = new ObjectsToCsv(data);
     // Save to file:
     await csv.toDisk('./testempher.csv');
     res.download("./testempher.csv")
})
/// Adding the course in bulk 
AdminRoutes.post("/course/bulkadd", async (req,res)=>{
    /// This is a protected route only authneticated users that too admins should use this
    /// title:String, startDateTime:Date,  endDateTime:Date, 
    //  createdBy should be attached from req.userId
    ////////////
    /// Store the data in the redis and send response
    /// aftersometime push all the stored redis data into DB
    try{
        const cacheKey = "addcourses";
        const cachedData = await redis.get(cacheKey);
        if(cachedData){
            // means some storage is already present,push the incoming course into Redis
            let parsedCachedData = JSON.parse( cachedData)
            parsedCachedData.push(req.body)
            await redis.set(cacheKey, JSON.stringify(parsedCachedData));
            res.status(201).json({msg:"Course Created"})

        }else{
            // means not stoarge in Redis, then create and push the incoming course into Redis
            let cachedCourse = [req.body];
            await redis.set(cacheKey, JSON.stringify(cachedCourse));
            res.status(201).json({msg:"Course Created"})

        }
        // let course = await CourseModel.create({...req.body,createdBy: req.userId })
       // res.status(201).json({msg:"Course Created From Backend", course})
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
