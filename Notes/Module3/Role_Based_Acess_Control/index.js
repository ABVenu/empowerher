const express = require("express");
const connectToDb = require("./config");
const UserRoute = require("./routes/user.routes");
const LectureRoute = require("./routes/lectures.routes");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is test route");
});

app.use("/users", UserRoute);

app.use("/lectures", LectureRoute)

app.listen(8080, () => {
  connectToDb();
  console.log("server started");
});
