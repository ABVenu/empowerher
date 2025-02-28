const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // auth MW shou d add
  dateOfTravel: Date, /// body
  modeOfTravel: { type: String, enum: ["rail", "road"], default: "rail" }, // body or default
  perHeadPrice: Number,  //body
  from: String,   // body
  to: String,     // body
  numberOfPassengers: Number,  // body
  totalPrice: Number, //Auto-calculated (perHeadPrice * numberOfPassengers)
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

module.exports = TicketModel;
