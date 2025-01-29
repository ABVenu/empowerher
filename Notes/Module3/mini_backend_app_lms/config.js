const mongoose = require("mongoose");


const connectToDb = async()=>{
   try{
      console.log("mongo url from .env", process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to db")
   }catch(err){
      console.log(err)
    console.log("failed to connect to db")
   }
}

module.exports = connectToDb