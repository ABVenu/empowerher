const express = require("express");
const connectToDb = require("./config");
const PostRouter = require("./routes/post.routes");
const CommentsRouter = require("./routes/comments.routes");
const protectedRoute = require("./middleware/protectedRoute");
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is test route");
});
app.use("/post", PostRouter);
app.use("/comment", CommentsRouter);

app.get("/admin", protectedRoute,(req, res) => {
  res.send("this is admin route");
});

app.listen(8080, async () => {
  await connectToDb();
  console.log("server started");
});
