const express = require("express");
const connectToDb = require("./config/mongo.config");
const UserRoute = require("./routes/user.routes");
const TaskRoute = require("./routes/task.routes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).json({msg:"This is Test Route"})
})

app.use("/users", UserRoute)
app.use("/tasks", TaskRoute)


app.listen(PORT, () => {
  connectToDb();
  console.log("servr started");
});
