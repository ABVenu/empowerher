const express = require("express");
const connectToDb = require("./config");
const UserRoute = require("./routes/user.routes");
const LectureRoute = require("./routes/lectures.routes");
const AdminRoutes = require("./routes/admin.routes");
const StudentRoutes = require("./routes/student.routes");
const app = express();
app.use(express.json());
require('dotenv').config()
app.get("/", (req, res) => {
  res.send("this is test route");
});

app.use("/users", UserRoute);

app.use("/admin", AdminRoutes)

app.use("/students", StudentRoutes)

app.listen(8080, () => {
  connectToDb();
  console.log("server started");
});
