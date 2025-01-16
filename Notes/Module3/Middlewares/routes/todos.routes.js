const express = require("express");
const todoRouter = express.Router();

/// all todos route logic here
todoRouter.get("/", (req,res)=>{
    res.send("This is todo get route")
})
module.exports = todoRouter;