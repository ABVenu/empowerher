const express = require("express");
const connectToDb = require("./config");
const UserRouter = require("./routes/user.routes");
const LectureRouter = require("./routes/lectures.routes");
const app = express();


// setup the logger
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is test route");
});


app.use("/users", UserRouter);

app.use("/lectures", LectureRouter)

app.listen(8080, async () => {
  await connectToDb();
  console.log("server started");
});