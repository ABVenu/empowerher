const express = require("express");
const connectToDb = require("./config/mongo.config");
const TaskRoute = require("./routes/task.route");

const app = express();
app.use(express.json());

app.get("/home", (req, res) => {
  res.status(200).json({ msg: "This is Home Route" });
});

app.use("/tasks", TaskRoute);

// app.listen(8080, () => {
//   connectToDb();
//   console.log("Server Started");
// });

module.exports = app;
