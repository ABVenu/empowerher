const mongoose = require("mongoose");



const connectToDb = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/testempher").then(()=> console.log("connected")).catch(()=>{
        console.log("Failed to connect")
    })
}

module.exports = connectToDb;