const express = require("express");
const connectToDb = require("./db_configs/mongo.config");
const UserRouter = require("./routes/user.route");
const AdminRoutes = require("./routes/admin.route");
require("dotenv").config();
const app = express();
app.use(express.json()); /// mw to senses/parses json req
let PORT = process.env.SERVER_PORT;

/// test route
app.get("/", (req, res) => {
  res.send("This is test route");
});
/// other routes below
app.use("/users", UserRouter);

app.use("/admin", AdminRoutes)

app.listen(PORT, () => {
  connectToDb();
  console.log("server started");
});
