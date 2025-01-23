const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  hno: String,
  area: String,
  taluk: String,
  district: String,
  State: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  age: { type: Number, min: 20, max: 110 },
  gender: { type: String, required: true, enum: ["male", "female"] },
  password: { type: String, required: true },
  country: { type: String, default: "India" },
  address: [addressSchema],
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
