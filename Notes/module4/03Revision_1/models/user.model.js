const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,   /// req.body but not compulsory
    email:{type:String, required:true},  // req.body and compulsary
    password:{type:String, default:"pass123"},  /// req.body but not compulsary
    role:{type:String, default:"student", enum:["admin", "student","parent", "genuser"]}  // req.body compulsary if role is other than student 
})


const UserModel = mongoose.model("user", UserSchema);


module.exports = UserModel;



