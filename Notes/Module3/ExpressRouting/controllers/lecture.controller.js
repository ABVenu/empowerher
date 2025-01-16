const fs = require("fs");

const addLecture = (req, res) => {
  /// req.body is the details of the lecture
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    data.lectures.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(201).send("Lecture Created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while creating the lecture");
  }
};

const getLectureById = (req, res) => {
  //req.params.id  is the lecture id

  try {
    let lectureId = req.params.id;
    console.log(lectureId);
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    console.log(data);
    let isLectureFound = false;
    data.lectures.forEach((el, i) => {
      if (el.id == lectureId) {
        isLectureFound = true;
        res.status(200).json({ lecture: el });
      }
    });

    if (isLectureFound == false) {
      res.status(404).json({ msg: "No Lectures Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while getting the lecture");
  }
};

const updateLectureById = (req, res) => {
  try {
    let lectureId = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let isLectureFound = false;
    let updatedData = data.lectures.map((el, i) => {
      if (el.id == lectureId) {
        isLectureFound = true;
        return { ...el, ...req.body };
      } else {
        return el;
      }
    });
    if (isLectureFound == false) {
      res.status(404).json({ msg: "No Lectures Found" });
    } else {
      data.lectures = updatedData;
      fs.writeFileSync("./db.json", JSON.stringify(data));
      res.status(200).json({ msg: "Lecture Updated" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while updating the lecture");
  }
};

const deleteLectureById = (req, res) => {
  try {
    let lectureId = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let isLectureFound = false;
    let filetredData = data.lectures.filter((el, i) => {
      if (el.id == lectureId) {
        isLectureFound = true;
      } else {
        return el;
      }
    });
    if (isLectureFound == false) {
      res.status(404).json({ msg: "No Lectures Found" });
    } else {
      data.lectures = filetredData;
      fs.writeFileSync("./db.json", JSON.stringify(data));
      res.status(200).json({ msg: "Lecture Deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while deleting the lecture");
  }
};

module.exports = {
  addLecture,
  getLectureById,
  updateLectureById,
  deleteLectureById,
};
