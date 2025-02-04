const mongoose = require("mongoose");
require('dotenv').config()

// create a function which connects mongoose and mongodb
const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
       console.log("Connected to db")
    }catch(err){
        console.log("Failed to connect the db")
    }
}

module.exports = connectToDB;