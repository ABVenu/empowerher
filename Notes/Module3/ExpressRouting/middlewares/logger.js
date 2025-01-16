const fs = require("fs");

const loggerMiddleware = (req, res, next) => {
  let data = `method: ${req.method} | url: ${req.url} | Date: ${Date.now()} \n`;
  fs.appendFileSync("./logs.txt", data);
  next();
};

module.exports = loggerMiddleware;
