const express = require("express");
const connectToDB = require("./db_configs/mongo.config");
const ContactRouter = require("./routes/contact.routes");
const app = express();
app.use(express.json())
app.use("/", ContactRouter)
app.listen(8080, ()=>{
    connectToDB()
    console.log("server started")
});
