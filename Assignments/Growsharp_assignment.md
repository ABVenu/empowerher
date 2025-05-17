

### **Project: Build a React Todo Application**

---

### **Objective**

Create a **functional Todo Application** using React that allows users to:

* Add new todos
* List all todos
* Edit/update existing todos
* Delete todos

You must utilize the following React hooks:

* `useState`
* `useEffect`
* `useRef`

---

### **Functional Requirements**

1. **Add Todo**

   * User can enter a todo using an input field.
   * Pressing "Add" should append the todo to the list.
   * Empty entries should not be allowed.

2. **List Todos**

   * Display all added todos in a list.
   * Each todo item should show the task and options to edit or delete.

3. **Update Todo**

   * Allow editing of an existing todo.
   * Clicking "Edit" should load the todo into the input box for editing.
   * Once updated, the changes should reflect in the list.

4. **Delete Todo**

   * Provide a "Delete" button to remove a todo from the list.

---

### **Technical Requirements**

* Use `useState` for managing todos and form inputs.
* Use `useEffect` to:

  * Log changes to the todo list.
  * Optionally simulate data fetch (e.g., loading todos from localStorage).
* Use `useRef` to:

  * Focus on the input field when the component mounts.
  * Retain references during editing if needed.

---

### **Bonus (Optional)**

* Add a **"Mark as Complete"** feature.
* Add a **filter** to show:

  * All todos
  * Completed todos
  * Incomplete todos
* Persist todos in `localStorage` using `useEffect`.

---

### **Deliverables**

* A working React app built using **Vite or Create React App (CRA)**.
* A clean UI with basic styling (CSS or Tailwind preferred).
* Proper usage of all mentioned hooks.

---

