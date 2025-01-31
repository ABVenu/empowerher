const express = require("express");
const authMw = require("../middlewares/auth.middleware");
const TaskModel = require("../models/task.model");
const taskValidityCheck = require("../middlewares/taskValidityCheck.middleware");
const TaskRoute = express.Router();

TaskRoute.post("/add", authMw, async (req, res) => {
  /// this protected Route
  /// userId is attached to req.body in authMw
  /// other things such as name, deadline etc should come from body via Postman
  //console.log(req.body)
  try {
    let taskToBeCreated = { ...req.body, owner: req.body.userId };
    let task = await TaskModel.create(taskToBeCreated);
    res.status(201).json({ msg: "task created", task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in Creating Task , (catch)" });
  }
});

TaskRoute.get("/get", authMw, async (req, res) => {
  //This is a protected route.
  try {
    let tasks = await TaskModel.find({ owner: req.body.userId });
    if (tasks.length == 0) {
      res.status(200).json({ msg: "No Tasks Found, Please Create Tasks" });
    } else {
      res.status(201).json({ msg: "Owner Task List", tasks });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getting tasks , (catch)" });
  }
});

TaskRoute.get("/public/get", async (req, res) => {
  try {
    let tasks = await TaskModel.find({ isPublic: true });
    if (tasks.length == 0) {
      res.status(200).json({ msg: "No Public Tasks Found" });
    } else {
      res.status(200).json({ msg: "Public Task List", tasks });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getting tasks , (catch)" });
  }
});

TaskRoute.get("/collaborator/get", authMw, async (req, res) => {
  try {
    let tasks = await TaskModel.find({ collaborator: req.body.userId });
    if (tasks.length == 0) {
      res.status(200).json({ msg: "No Collaborator Tasks Found" });
    } else {
      res.status(200).json({ msg: "Collaborator Task List", tasks });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getting tasks , (catch)" });
  }
});

TaskRoute.get("/pending", authMw, async (req, res) => {
  // deadline < Current date
  try {
    let tasks = await TaskModel.find({ owner: req.body.userId });
    //console.log(tasks)

    let pendingTask = tasks.filter((el, i) => {
      console.log(el.deadline < Date.now());
      return el.deadline < Date.now();
    });

    if (pendingTask.length == 0) {
      res.status(200).json({ msg: "No Collaborator  pendingTask Found" });
    } else {
      res.status(200).json({ msg: "Collaborator Task List", pendingTask });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getting  pendingTask , (catch)" });
  }
});

TaskRoute.put("/update/:id",authMw,taskValidityCheck, async (req, res) => {
  try {
    ///task Id is coming from req.params
    // check the validity of task in mw and get back
    let task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json({ msg: "Task Updated", task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in updating task , (catch)" });
  }
});


module.exports = TaskRoute;
