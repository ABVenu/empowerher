const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, default:"pass@123"},
    role:{type:String, enum:["admin", "student", "parent"], default:"student"}
}) 


const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel;