const express = require("express");
const authMiddleware = require("../middlewares/auth");
const LectureModel = require("../models/lectures.model");

const LectureRoute = express.Router();

/// this is a protected route, only authenticated ADMINS should create a lecture
// So there should be an Middleware, whose should check the authenticity and admin role
// if all good, allow to next route
// else send a response stating UnAuthorised
LectureRoute.post("/add", authMiddleware("admin"), async (req, res) => {
  /// title, attendance is coming from req.body
  /// createdBy should be added from backend through token
  try {
    let data = await LectureModel.create(req.body);
    res.status(201).json({ msg: "Lecture Created", data });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

/// this is a protected route, only authenticated admins or students can see the lectures
LectureRoute.get(
  "/all",
  authMiddleware("admin", "student"),
  async (req, res) => {
    /// title, attendance is coming from req.body
    /// createdBy should be added from backend through token
    try {
      let data = await LectureModel.find();
      res.status(201).json({ msg: "Lecture List", data });
    } catch (err) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

LectureRoute.get("/admin/get/onlyme", authMiddleware("admin"),async (req, res) => {
  try {
    let data = await LectureModel.find({ userId: req.body.userId });
    res.status(201).json({ msg: "Lecture List", data });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = LectureRoute;
