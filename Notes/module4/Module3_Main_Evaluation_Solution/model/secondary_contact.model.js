// _id (MongoDB-generated unique identifier, serves as primaryContactId).
// email
// phoneNumber
// isPrimary (Boolean, always true).
// secondaryContactIds (Array of references to SecondaryContact documents).

const mongoose = require("mongoose");

const SecondaryConatctSchema = new mongoose.Schema({
    email:String,   // body
    phoneNumber:String,  // body
    isPrimary:Boolean, /// added through BE logic
}, {
    timestamps:{
        createdAt:true,
        updatedAt:true,
    }
})


const SeconadryContactModel = mongoose.model("secondarycontact", SecondaryConatctSchema);

module.exports = SeconadryContactModel;