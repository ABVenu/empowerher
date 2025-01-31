const TaskModel = require("../models/task.model")


const taskValidityCheck = async (req,res, next)=>{
    /// id is coming from req.params
    let task = await TaskModel.findOne({_id: req.params.id});
     // console.log(task.deadline < Date.now())
    if(task.deadline < Date.now()){
        /// deadline is passed
        res.status(405).json({msg:"Deadline passed, unable to update"})
    }else{
        // deadline not passed 
        next()
    }
}


module.exports = taskValidityCheck;