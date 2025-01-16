const express = require("express");
const {
  addLecture,
  getLectureById,
  updateLectureById,
  deleteLectureById,
} = require("../controllers/lecture.controller");
const lectureValidation = require("../middlewares/lecture.validation");
const loggerMiddleware = require("../middlewares/logger");
const lectureRouter = express.Router();



lectureRouter.post("/add", lectureValidation, addLecture);


lectureRouter.get("/get/:id", getLectureById);



lectureRouter.patch("/update/:id", updateLectureById);

lectureRouter.delete("/delete/:id", deleteLectureById);

module.exports = lectureRouter;
