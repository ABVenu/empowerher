const app = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
/// test case

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/testempher");
});

afterAll(async ()=>{
    await mongoose.connection.db.dropDatabase()
})

describe("Task Routes", () => {
  test("Testing Home Route", async () => {
    const res = await request(app).get("/home");
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("This is Home Route");
  });

  test("Adding Task", async () => {
    let res = await request(app)
      .post("/tasks/add")
      .send({ title: "Learn Testing", status: false });
    expect(res.statusCode).toBe(201);
  });

  test("Getting Task By Id", async () => {
    let res1 = await request(app)
      .post("/tasks/add")
      .send({ title: "Learn Testing", status: false });
    let task = res1.body.task;
    // console.log("task in testing", task)
    let res2 = await request(app).get(`/tasks/get/${task._id}`);
    expect(res2.statusCode).toBe(200);
  });

  test("Updating Task By Id", async () => {
    let res1 = await request(app)
      .post("/tasks/add")
      .send({ title: "Learn Testing", status: false });
    let task = res1.body.task;
    // console.log("task in testing", task)
    let res2 = await request(app)
      .put(`/tasks/update/${task._id}`)
      .send({ title: "Backend" });
    expect(res2.statusCode).toBe(200);
  });
});

describe("User Routes", ()=>{

})

//   test('Testing Home Route', async () => {
//     const res = await request(app).get("/home")
//     expect(res.statusCode).toBe(200);
//     expect(res.body.msg).toBe("Welcome to Home Page")
//    });
