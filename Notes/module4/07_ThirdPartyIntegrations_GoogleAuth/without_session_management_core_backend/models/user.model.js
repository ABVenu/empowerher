const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    googleId:{type:String, unique:true},
    name:String,
    email:{type:String, unique:true}
})

const UserModel = mongoose.model("user", UserSchema);


module.exports = UserModel;