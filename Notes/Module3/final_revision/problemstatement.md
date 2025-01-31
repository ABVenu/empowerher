### **Problem Statement: Task Tracker System**

### **Objective**

Develop a **Task Tracker System** using **Express.js, Mongoose, Middleware, and JWT Authentication**. The system should allow users to **manage tasks**, **Add an collaborator on tasks**, and **view public tasks** while enforcing strict authentication and authorization policies. The system should also include **logging**, **task validity enforcement**, and **structured project organization** following best coding practices.

### **Submission Instructions**

Please code in the **Masai Github Repo** and submit the same **Masai Github Repo**

---

### **1. Project Requirements & Best Practices**

1. **Maintain a structured project folder organization**:

   - **`models/`** → Define Mongoose schemas.
   - **`routes/`** → Implement API endpoints.
   - **`controllers/`** → Handle business logic for each route.
   - **`middlewares/`** → Include authentication, validation, and logging middlewares.
   - **`config/`** → Store database connection and configuration files.
   - **`.env`** → Securely store sensitive environment variables.

2. **Follow standard coding practices**, including:
   - Implement **environment variables** for storing secrets such as JWT keys and database URIs.
   - Use **middlewares** for authentication, validation, and error handling.
   - Ensure **RESTful API design** with proper status codes and response structures.
   - **Commit code regularly** (every **15-20 minutes**).
   - **Handle errors properly in all routes and functions**:
     - Use **try-catch blocks** for `async/await` functions or `.then().catch()` for **promise-based** operations.
     - Ensure that errors are handled gracefully so that the **server does not crash** due to unhandled exceptions.

---

###  **2. Database Schema Design**

### **User Schema**

Represents a user in the system.

- `name` (String, required) → Stores the full name of the user.
- `email` (String, required, unique) → Stores the email of the user.
- `password` (String, required) → Stores the hashed password.
- `createdAt` (Date, default: current timestamp) → Stores the time when the user was created.

---

### **Task Schema**

Represents a task in the system.

- `title` (String, required) → Stores the title of the task.
- `description` (String, optional) → Stores the details about the task.
- `priority` (String, required, enum: [Low, Medium, High]) → Defines the priority level of the task.
- `deadline` (Date, required) → Stores the deadline of the task.
- `status` (String, required, enum: [Pending, In Progress, Completed], default: "Pending") → Represents the current status of the task.
- `isPublic` (Boolean, default: false) → Determines if the task is visible to everyone.
- `owner` (ObjectId, required, ref: 'User') → Stores the user ID of the creator of the task. Maintains a relationship with the User collection.
- `collaborator` (ObjectId, optional, ref: 'User') → Stores the user ID of the assigned collaborator. Maintains a relationship with the User collection.
- `createdAt` (Date, default: current timestamp) → Stores the time when the task was created.

---

### **3. API Endpoints & Functionalities**

#### **User Authentication Routes (`/user/`)**

- **`POST /user/signup`** → Allows new users to register by storing their details in the database. The password should be **hashed** before saving.
- **`POST /user/login`** → Authenticates users by comparing their stored hashed password. Generates a **JWT token** with an expiry of **30 minutes**.
- **`POST /user/resetpassword`** → Allows users to reset their password.
  - The email is provided via **query parameters**.
  - The new password is provided in the **request body**.
  - The password should be **hashed** before updating in the database.

---

#### **Task Management Routes (`/tasks/`)**

#### **1. Protected Task Routes (Require Authentication)**

- **`POST /tasks/add`** → Creates a new task.

  - This is a **protected route** (requires authentication).
  - The `owner` field should be **automatically attached** from the authenticated user in the backend.
  - The `collaborator` ID should be provided in the request body.

- **`GET /tasks/get`** → Fetches all tasks created by the logged-in user.

  - This is a **protected route**.
  - Only the tasks where the logged-in user is the **owner** should be retrieved.

- **`PATCH /tasks/update/:id`** → Updates an existing task.

  - This is a **protected route**.
  - Only the **owner** of the task can update it.

- **`DELETE /tasks/delete/:id`** → Deletes an existing task.
  - This is a **protected route**.
  - Only the **owner** of the task can delete it.

---

#### **2. Special Task Routes**

- **`GET /tasks/public/get`** → Fetches all tasks that are marked as **public**.

  - This is an **unprotected route** (no authentication required).
  - It should return all tasks where `isPublic = true`.

- **`GET /tasks/collaborator/get`** → Fetches all tasks where the logged-in user is a **collaborator**.

  - This is a **protected route**.
  - It should return tasks where the logged-in user is assigned as a `collaborator`.

- **`PATCH /tasks/collaborator/update/:id`** → Allows a **collaborator** to update a task.

  - This is a **protected route**.
  - Only the **assigned collaborator** can update the task.

- **`GET /tasks/mytasks/total`** → Retrieves the **total number of tasks** created by the logged-in user.

  - This is a **protected route**.

- **`GET /tasks/collaborator/total`** → Retrieves the **total number of tasks** where the logged-in user is a collaborator.

  - This is a **protected route**.

- **`GET /tasks/pending`** → Retrieves all **pending tasks** of the logged-in user.
  - This is a **protected route**.
  - Only tasks where `status = Pending` should be returned.

---

### **4. Middleware Implementation**

#### **Authentication Middleware (`AuthMw`)**

- Ensures that only authenticated users can access **protected routes**.
- Extracts the **JWT token** from the request headers.
- Validates the token and attaches the `userId` to `req.body`.

#### **Task Validity Middleware (`validityCheck`)**

- Prevents users from **updating or deleting tasks whose deadline crossed/apssed**, but it should allow to change the status **status to "Completed"** irrespective of deadline.

#### **Logging Middleware**

- Uses **Morgan** to log all incoming API requests.
- Logs should be stored in a file named **`access.log`**.

---

### **5. Environment & Configuration**

- Use **`.env`** file to store:

  - `JWT_SECRET` → Secret key for JWT authentication.
  - `MONGO_URI` → Database connection string.
  - Other sensitive configurations.

- Configure database connection in **`config/database.js`** file.
- Keep all routes, models, controllers, and middlewares in separate files for modularity.

---

### **6. Documentation & References**

- **Mongoose Documentation** → [https://mongoosejs.com/docs/](https://mongoosejs.com/docs/)
- **JWT Authentication** → [https://jwt.io/introduction/](https://jwt.io/introduction/)
- **Express.js Guide** → [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)
- **Morgan Logging** → [https://www.npmjs.com/package/morgan](https://www.npmjs.com/package/morgan)
- **Environment Variables with dotenv** → [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

---
