const express = require("express");
const connectToDB = require("./config/mongo.config");
const UserRoutes = require("./routes/user.routes");
const TicketRoutes = require("./routes/ticket.routes");
require("dotenv").config()
connectToDB()

const app = express();
app.use(express.json())


app.use("/users", UserRoutes)
app.use("/tickets", TicketRoutes)
app.listen(8080, ()=>{
    console.log("Server started")
})