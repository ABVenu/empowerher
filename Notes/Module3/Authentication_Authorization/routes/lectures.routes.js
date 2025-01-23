const express = require("express");
const LectureModel = require("../models/lecture.model");
const authMiddleware = require("../middleware/auth");

const LectureRouter = express.Router();

/// This is protected route
LectureRouter.post("/add", authMiddleware ,async (req,res)=>{
    // req.body --> title, attendance
    ///console.log(req.body)
    await LectureModel.create(req.body)
    res.send("Lecture Created")
})

module.exports = LectureRouter;