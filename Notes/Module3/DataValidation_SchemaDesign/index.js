const express = require("express");
const connectToMongoDb = require("./config");
const UserRouter = require("./routes/user.routes");
const loggerMw = require("./middlewares/logger");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const app = express();
app.use(express.json()); ///

app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  res.send("File Uploaded");
});

app.use(loggerMw);

app.use("/users", UserRouter);

app.listen(8080, async () => {
  await connectToMongoDb();
  console.log("server started");
});
