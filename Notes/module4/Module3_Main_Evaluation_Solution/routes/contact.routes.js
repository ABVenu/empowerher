const express = require("express");
const PrimaryContactModel = require("../model/primary_contact.model");
const SeconadryContactModel = require("../model/secondary_contact.model");

const ContactRouter = express.Router();

ContactRouter.post("/identify", async (req,res)=>{
    /// name and email is coming from body
    /// first check in primary model
    // if found, (doc having same email and phone number), 
    // then send as it is as a response
    // else create it under primary model
    // if name or email is present, then created under secondary and attach to primary
    const {email, phoneNumber} = req.body;
    let existingContact = await PrimaryContactModel.findOne({email,phoneNumber});
    // console.log(existingContact)
    if(existingContact){
        res.json({data:existingContact});
        return 
    }
    /// which means no contact with that email id is found, 
    // in that case find only email or phone number is found....
    let existingContactsArray = await PrimaryContactModel.find({$or:[{email},{phoneNumber}]});
    if(existingContactsArray.length > 0){
        /// we have documents alreay present as primary contact
        // we need to create an secondary contact and attach its id to primary contact
        // I may get max one document in the array
        let newSecondaryContact = await SeconadryContactModel.create({...req.body, isPrimary:false});
        /// attach this newSecondaryContact's _id in primaryContact which is coming from existingContactsArray
        let existingPrimaryContact = existingContactsArray[0]; 
        // pushing the secondaryContact_id into array of primaryContactDocument
        existingPrimaryContact.secondaryContactIds.push(newSecondaryContact._id);
        await existingPrimaryContact.save()
        res.json({msg:"Added as Secondary Contact", primaryContactDetails: existingPrimaryContact})
    }else{
        //// nothing is found
        /// create a primary contact
        let newPrimaryContact = await PrimaryContactModel.create({...req.body,isPrimary:true});
        res.json({msg:"Added as Primary Contact", primaryContactDetails: newPrimaryContact})
    }
})


ContactRouter.get("/search", async(req,res)=>{
    /// email or phone number from query params
    const {email, phoneNumber } = req.query;
    //console.log(email)
    let primaryContactDetailsArray = await PrimaryContactModel.find({$or:[{email},{phoneNumber}]});
    if(primaryContactDetailsArray.length > 0){
        // which means , the data is present in the primary model itself
        // no need to search in secondary 
        res.json({msg:"Primary Contact Details", data:primaryContactDetailsArray});
        return 
    }
    // which the array is empty, now search the same thing is secondary model 
    let secondaryContactDetail = await SeconadryContactModel.findOne({$or:[{email},{phoneNumber}]});
    if(secondaryContactDetail){
        // secondary details are present, search for its respective primary detail???
        //secondaryContactIds is an array, 
        // cannot directly use key value pair like secondaryContactIds: id
        // method 1 directly using mongoose query by using $in 
        // let   primaryContactDetail = await PrimaryContactModel.findOne({secondaryContactIds:{$in:[secondaryContactDetail._id]}});
        // res.json({msg:"Input is identified as secondary contact, sending its primary contact", primaryContactDetail})

        /// method 2--> using JS loop, since i don't know $in operator
        /// find all the primary contact, run a  loop, then check for the secondary id is present in that primary document
        let   primaryContactDetail = await PrimaryContactModel.find();
        // the above one is array 
        let filteredData = primaryContactDetail.filter((el,i)=>{
            // el is each primary contact document
            if(el.secondaryContactIds.includes(secondaryContactDetail._id)){
                return el
            }
        })
        // i get array of atleast 1 document as filtered data or else empty array;
        res.json({msg:"Input is identified as secondary contact, sending its primary contact", primaryContactDetail:filteredData})




    }else{
        res.json({msg:"No Contact Details Found"})
    }
})

ContactRouter.put("/contact/:id", async(req,res)=>{
    // the contactId is coming from req.params, the contact may be primary or secondary
    /// the things to get updated is coming from req.body
    const  {email, phoneNumber, isPrimary} = req.body;
    let isPrimaryContact = await PrimaryContactModel.findOne({_id:req.params.id});
    let isSecondaryContact = await SeconadryContactModel.findOne({_id:req.params.id});
    if(isPrimary !=false){
        // general email or phone number updation
        // directly call findById&update and finish it

        if(isPrimaryContact){
            // the param id is primary conatct id
            let updatedContact = await PrimaryContactModel.findByIdAndUpdate(req.params.id, {email,phoneNumber}, {new:true});
            res.json({msg:"Identified as primary contact and it is updated", updatedContact})
        }else if(isSecondaryContact){
            let updatedContact = await SeconadryContactModel.findByIdAndUpdate(req.params.id, {email,phoneNumber}, {new:true});
            res.json({msg:"Identified as secondary contact and it is updated", updatedContact})

        }else{
            res.json({msg:"No Contact Details Found"})
        }
        
    }else{
        /// changing primary to secondary , secondary to primary is not required
        if(isSecondaryContact){
            res.json({msg:"Not Allowed"});
            return 
        }
        // need to create a new document in primary model 
        /// what should the id??, id should be same as first secondary Id, 
        let _id = isPrimaryContact.secondaryContactIds[0];
        let firstSecondaryContacDetails = await SeconadryContactModel.findOne({_id});
       // console.log(firstSecondaryContacDetails)
        // console.log({...firstSecondaryContacDetails,isPrimary:true})

        let dataToBeInsertedAsPrimary = {_id:firstSecondaryContacDetails._id,email:firstSecondaryContacDetails.email,phoneNumber:firstSecondaryContacDetails.phoneNumber, isPrimary:true }
        let newPrimaryContact = await PrimaryContactModel.create(dataToBeInsertedAsPrimary)
        //////////////
        let dataToBeInsertedAsSecondary = {_id:isPrimaryContact._id, email:isPrimaryContact.email, phoneNumber: isPrimaryContact.phoneNumber,isPrimary:false}
        let newSecondaryContact = await SeconadryContactModel.create(dataToBeInsertedAsSecondary)
        /// push the remaining contact ids, in the newPrimary Contact array
        // let otherSecondaryIds =  isPrimaryContact.secondaryContactIds.shift()
        //console.log("other secondary ", [...isPrimaryContact.secondaryContactIds.slice(1)])
        newPrimaryContact.secondaryContactIds.push(...isPrimaryContact.secondaryContactIds.slice(1),newSecondaryContact._id)
        await newPrimaryContact.save();
        /// then delete older ones 
        /// delete primary contact from primary model and 
        // delete secondary contact from secondary model 
        await PrimaryContactModel.findByIdAndDelete(isPrimaryContact._id);
        await SeconadryContactModel.findByIdAndDelete(firstSecondaryContacDetails._id)
        res.json({msg:"Shifted Primary Contact To Secondary", newPrimaryDetails: newPrimaryContact})
    }
    

})
module.exports = ContactRouter