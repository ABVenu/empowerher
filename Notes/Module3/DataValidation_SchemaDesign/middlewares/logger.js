const fs = require("fs")

const loggerMw = (req,res,next)=>{
    let reqDetails = `Method: ${req.method} | url: ${req.url} | date: ${Date.now()} \n`
    fs.appendFileSync("./logs.txt", reqDetails);
    next()
}


module.exports = loggerMw;