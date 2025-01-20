const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const todoRouter = require("./routes/todo.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is test route");
});

app.use("/users", userRouter);
app.use("/todos", todoRouter)

app.listen(8080, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/empher");
    console.log("connected to db");
  } catch (err) {
    console.log("error in connecting the db");
    console.log(err);
  } finally {
    console.log("server started");
  }
});
