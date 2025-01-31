const mongoose = require("mongoose");


const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB")
    }catch(err){
        console.log("Error in connecting the db")
        console.log(err)
    }
}
module.exports = connectToDb;