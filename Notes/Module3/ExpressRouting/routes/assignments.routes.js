const express = require("express");

const assignmentRouter = express.Router();
/// what ever endpints w.r.t assignments are created in index.js
/// all will be kept here

assignmentRouter.post("/assignments/add", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    data.assignments.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(201).send("Assignment Created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while creating the assignment");
  }
});

assignmentRouter.get("/assignments/get/:id", (req, res) => {
  //req.params.id  is the lecture id

  try {
    let assignmentsId = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let isassignmentsFound = false;
    data.assignments.forEach((el, i) => {
      if (el.id == assignmentsId) {
        isassignmentsFound = true;
        res.status(200).json({ assignments: el });
      }
    });

    if (isassignmentsFound == false) {
      res.status(404).json({ msg: "No assignmentss Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while getting the assignments");
  }
});

assignmentRouter.patch("/assignments/update/:id", (req, res) => {
  try {
    let lectureId = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let isLectureFound = false;
    let updatedData = data.assignments.map((el, i) => {
      if (el.id == lectureId) {
        isLectureFound = true;
        return { ...el, ...req.body };
      } else {
        return el;
      }
    });
    if (isLectureFound == false) {
      res.status(404).json({ msg: "No assignments Found" });
    } else {
      data.assignments = updatedData;
      fs.writeFileSync("./db.json", JSON.stringify(data));
      res.status(200).json({ msg: "Lecture Updated" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while updating the assignments");
  }
});

assignmentRouter.delete("/assignments/delete/:id", (req, res) => {
  try {
    let assignmentsId = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let isassignmentsFound = false;
    let filetredData = data.assignments.filter((el, i) => {
      if (el.id == assignmentsId) {
        isassignmentsFound = true;
      } else {
        return el;
      }
    });
    if (isassignmentsFound == false) {
      res.status(404).json({ msg: "No assignments Found" });
    } else {
      data.assignments = filetredData;
      fs.writeFileSync("./db.json", JSON.stringify(data));
      res.status(200).json({ msg: "assignments Deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while deleting the assignments");
  }
});

module.exports = assignmentRouter;
