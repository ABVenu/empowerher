const express = require("express");
const AuthMiddleware = require("../middlewares/auth");
const TicketModel = require("../models/ticket.model");

const TicketRoutes = express.Router();

TicketRoutes.post("/customer/add",  AuthMiddleware(["customer", "admin"]),  async (req, res) => {
    ///   perHeadPrice: Number,  //body
    //   from: String,   // body
    //   to: String,     // body
    //   numberOfPassengers: Number,  // body
    // totalPrice: Number, //Auto-calculated (perHeadPrice * numberOfPassengers)
    let totalPrice = req.body.numberOfPassengers * req.body.perHeadPrice;
    try {
      let ticket = await TicketModel.create({ ...req.body, totalPrice, userId: req.userId });
      res.status(201).json({ msg: "Ticket Created", ticket });
    } catch (err) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  }
);


TicketRoutes.patch("/customer/update/:ticketId",  AuthMiddleware(["customer", "admin"]),  async (req, res) => {
    let ticket = await TicketModel.findById(req.params.ticketId);
   

    const {numberOfPassengers, modeOfTravel, perHeadPrice,from, to} = req.body;
  try{
    if(ticket){
        // console.log(ticket.userId, req.userId)
        // if(ticket.userId !== req.userId){
        //     res.status(401).json({msg:"Authorised"});
        //     return 
        //  }
         
         // checking Date validity before 24 hours
        let currentDate = new Date().getHours();
        let ticketDate = new Date(ticket.dateOfTravel).getHours()
        // console.log(currentDate, ticketDate)
        if(ticketDate - currentDate <=0){
        res.status(403).json({msg:"Updation Not Allowed within 24 hours"});
        return 
        }


        if(perHeadPrice || from || to){
            res.status(403).json({msg:"perHeadPrice,from, to, updations are not allowed"})
        }else{
            // m1
            if(numberOfPassengers){
                let totalPrice = numberOfPassengers * ticket.perHeadPrice;
                ticket.numberOfPassengers = numberOfPassengers;
                ticket.totalPrice = totalPrice;
            }
            if(modeOfTravel){
                ticket.modeOfTravel = modeOfTravel
            }
            await ticket.save()

            // m2

            // await TicketModel.findByIdAndUpdate(req.params.ticketId, {numberOfPassengers,totalPrice,modeOfTravel})
           res.status(200).json({msg:"Ticket Upadted"})
        }
        // do the updations
       }else{
        res.status(400).json({msg:"Ticket Not Found, Please Check The Ticket Number"})
       }
  }catch (err) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
    
});

module.exports = TicketRoutes;
