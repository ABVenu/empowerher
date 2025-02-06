const express = require("express");
const authMiddleware = require("../middlewares/auth.mw");


const AdminRoutes = express.Router();

// AdminRoutes.use(authMiddleware)
AdminRoutes.post("/lecture/add",authMiddleware, (req,res)=>{
    /// This is a protected route only authneticated users that too admins should use this
    console.log(req.userId)
    res.send("Lecture Added")
})
module.exports = AdminRoutes;
