

const lectureValidation = (req,res,next)=>{
    if(!req.body.name){
        res.send("Name of lecture is manadatory")
    }else{
        next()
    }
}


module.exports = lectureValidation;
