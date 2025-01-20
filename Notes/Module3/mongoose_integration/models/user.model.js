const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name:String,
        age:Number,
        email:String,
        password:String,
        isStudent:Boolean

}
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;





// let arr = new Array(); /// constructor function 
// let obj = new Object();

// let arr1 = [];  // Literal way to declare 

