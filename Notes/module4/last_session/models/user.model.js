const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String },
  mobileNumber: String,
  gender: { type: String, enum: ["male", "female"] },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
});


const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;