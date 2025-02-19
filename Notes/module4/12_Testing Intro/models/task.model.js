const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title:String,
    status:Boolean
}) 


const TaskModel = mongoose.model("task", TaskSchema)

module.exports = TaskModel;