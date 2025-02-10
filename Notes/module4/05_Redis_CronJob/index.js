const Redis = require("ioredis");
var cron = require("node-cron");
const redis = new Redis();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: String,
  todos: [String],
});

const TodoModel = mongoose.model("todo", TodoSchema);

app.get("/:userId", async (req, res) => {
  let userId = req.params.userId;
  // check in the Redis  if found, send that data only or else
  let userData = await redis.get(`todos:${userId}`);
  if (userData) {
    /// JSON
    const { getTodos } = JSON.parse(userData);
    res.json({ msg: "Todos coming from Redis", todos: getTodos });
  } else {
    /// find from DB, even store in Redis then send to the user
    let todos = await TodoModel.find({ userId: req.params.userId });
    /// set in the redis
    let userRedisData = { getTodos: todos };
    await redis.set(`todos:${userId}`, JSON.stringify(userRedisData),"EX","120");
    res.json({ msg: "Todos coming from MongoDB", todos });
  }
});

app.post("/todos", async (req, res) => {

  const { userId, todo } = req.body;
  /// push all the todos into the Redis and give the response as todo added
  /// setup a cronjob, where all the todos are pushed into mongo at a time
  let userData = await redis.get(`todos:${userId}`);
  console.log(userData);
  if (userData) {
    const { postTodos } = JSON.parse(userData);
    postTodos.push(todo);
    let userRedisData = { postTodos };
    await redis.set(`todos:${userId}`,  JSON.stringify(userRedisData), "EX",  "120" );
    res.json({ msg: "Todo Added" });
  } else {
    let userRedisData = { postTodos: [todo] };
    await redis.set( `todos:${userId}`,  JSON.stringify(userRedisData),  "EX",  "120");
    res.json({ msg: "Todo Added" });
  }

  /// This is the acutal code without redis directly pushing into MongoDB
  // if userId is present push the todi in the array, else create and push
    //   let userTodo = await TodoModel.findOne({ userId });
    //   if (userTodo) {
    //     /// user is already present, just the todo in the array
    //     userTodo.todos.push(todo);
    //     await userTodo.save();
    //     res.json({ msg: "Todo Added" });
    //   } else {
    //     await TodoModel.create(req.body);
    //     res.json({ msg: "Todo Added" });
    //   }
});
/// write a cronjob, where all todos collected will be pushed into Mongo
app.listen(8080, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/empherredis");
  console.log("server started");
});
