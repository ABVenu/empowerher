const express = require("express");
const TaskModel = require("../models/task.model");


const TaskRoute = express.Router();

TaskRoute.post("/add", async(req,res)=>{
    try{
        let task = await TaskModel.create(req.body);
        res.status(201).json({msg:"Task Created", task})
    }catch(err){
        res.status(500).json({msg:"Error In Adding Task"})
    }
})

TaskRoute.get("/get/:id", async(req,res)=>{
    try{
        let task = await TaskModel.findOne({_id:req.params.id});
        res.status(200).json({msg:"Task Details", task})
    }catch(err){
        res.status(500).json({msg:"Error In Getting Task"})
    }
})

TaskRoute.put("/update/:id", async(req,res)=>{
    try{
        let task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json({msg:"Task Updated", task})
    }catch(err){
        res.status(500).json({msg:"Error In Getting Task"})
    }
})
module.exports = TaskRoute;