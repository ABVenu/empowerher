const mongoose = require("mongoose");


const connectToDb = async()=>{
   try{
    await mongoose.connect("mongodb://127.0.0.1:27017/empher")
    console.log("connected to db")
   }catch(err){
    console.log("failed to connect to db")
   }
}

module.exports = connectToDb