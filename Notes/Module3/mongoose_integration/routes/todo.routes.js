const express = require("express");

const todoRouter = express.Router();

todoRouter.get("/", (req,res)=>{
    res.send("This is todo get route")
})

module.exports = todoRouter;