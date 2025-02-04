// _id (MongoDB-generated unique identifier, serves as primaryContactId).
// email
// phoneNumber
// isPrimary (Boolean, always true).
// secondaryContactIds (Array of references to SecondaryContact documents).

const mongoose = require("mongoose");

const PrimaryContactSchema = new mongoose.Schema({
    email:String,   // body
    phoneNumber:String,  // body
    isPrimary:Boolean, /// added through BE logic
    secondaryContactIds:[{type:mongoose.Schema.Types.ObjectId, ref:"secondarycontact"}]
}, {
    timestamps:{
        createdAt:true,
        updatedAt:true,
    }
})


const PrimaryContactModel = mongoose.model("primarycontact", PrimaryContactSchema);

module.exports = PrimaryContactModel;