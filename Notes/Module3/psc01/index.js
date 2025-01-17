const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.text());
//app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));  // For form data parsing
/// render a static in express

app.get("/signup", (req,res)=>{
   // i want to send that form 
   console.log("current dir name", `${__dirname}\\public\\signup.html`)
   res.sendFile( `${__dirname}\\public\\signup.html`)
   // res.send("hello")
})

app.post("/signup", (req,res)=>{
    console.log(req.body)
    res.send("Thanks for signingup.....")
})



app.get("/", (req, res) => {
  res.send("This is a test route");
});

app.get("/read", (req, res) => {
  console.time("Read");
  let initialMemory = process.memoryUsage();
  //console.log(initialMemory.rss)
  //console.log(initialMemory.heapUsed)
  try {
    let data = fs.readFileSync("./data.txt", "utf-8");
    //console.log(data)
    res.send(data);
  } catch (err) {
    console.log(err);
  } finally {
    let finalMemory = process.memoryUsage();
    //console.log(finalMemory.rss - initialMemory.rss)
    console.timeEnd("Read");
    console.log("READ RAM", (finalMemory.rss - initialMemory.rss) / (1024), "KB");
    console.log("READ Heap Memory", (finalMemory.heapUsed - initialMemory.heapUsed)/(1024), "KB")
  }
});

app.get("/stream", (req,res)=>{
    const stream = fs.createReadStream('./data.txt', {encoding:"utf-8"});
    console.time("stream");
    let initialMemory = process.memoryUsage();
    stream.on("open", ()=>{
        // stream.on("data", (chunk)=>{
        //     console.log(chunk)
        // })
        stream.pipe(res)
    })
    stream.on("end", ()=>{
        //res.send("This route will stream the data")
        let finalMemory = process.memoryUsage();
        //console.log(finalMemory.rss - initialMemory.rss)
        console.timeEnd("stream");
        console.log("Stream RAM", (finalMemory.rss - initialMemory.rss) / (1024), "KB");
        console.log("Stream Heap Memory", (finalMemory.heapUsed - initialMemory.heapUsed)/(1024), "KB")
    })
   
})



app.listen(8080, () => {
  console.log("Server started");
});
