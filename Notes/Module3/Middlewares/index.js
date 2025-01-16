const express = require("express");
const cors = require("cors");
const limiter = require("./middlewares/rate_limiter");
const userRouter = require("./routes/user.routes");
const todoRouter = require("./routes/todos.routes");
const loggerMiddleWare = require("./middlewares/validation");

const app = express();

app.use(express.json()); /// inbuilt middleware that parses the json body
app.use(express.text()); /// inbuilt middleware that parses the text body
app.use(cors());

app.use(limiter);
/// just calling the routes here
app.use(loggerMiddleWare);
app.use("/users", userRouter);

app.use("/todos", todoRouter);

app.listen(8080, () => {
  console.log("server started");
});
