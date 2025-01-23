const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    role:{type:String, enum:["student", "admin"], default:"student"}
});


const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;