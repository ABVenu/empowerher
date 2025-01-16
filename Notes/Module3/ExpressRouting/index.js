const express = require("express");
const lectureRouter = require("./routes/lecture.routes");
const assignmentRouter = require("./routes/assignments.routes");
const loggerMiddleware = require("./middlewares/logger");
const app = express();
app.use(express.json()); /// imp fn

/// whoseever req endpoint is /lectures/ that will be sent to the lectureRouter
app.use(loggerMiddleware)
app.use("/lectures", lectureRouter)
app.use("/assignents", assignmentRouter)
  
app.listen(8080, () => {
  console.log("server started");
});
