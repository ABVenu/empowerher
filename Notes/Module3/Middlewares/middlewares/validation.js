const fs = require("fs");
const loggerMiddleWare = (req, res, next) => {
  let data = `Method: ${req.method} | url: ${req.url} | Date: ${Date.now()} \n`;
  fs.appendFileSync("./logs.txt", data);
  next();
};

module.exports = loggerMiddleWare;
