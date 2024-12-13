# Admin Panel for Product Management

## Objective:

Create a simple **Admin Panel** to manage product requests using the DOM and local storage. The panel should include features to add, approve, reject, and display products dynamically, along with conditional CSS styling based on product ratings.

---

## Features to Implement:

### 1. Add Product:

- Build a form to input the following product details:
  - **Name**
  - **Price**
  - **Rating** (from 1 to 5)
  - **Stock**
  - **Image URL**
- On clicking the **Submit** button, the product should be saved in local storage under the key `requestedProducts`.

---

### 2. Display Products:

- Dynamically display all products stored in `requestedProducts` as cards.
- Each product card must include:
  - Product Name
  - Price
  - Rating
  - Stock
  - Product Image (fetched from the provided URL)
  - Two action buttons:
    1. **Approve**:
       - Moves the product to the `approvedProducts` key in local storage.
    2. **Delete**:
       - Moves the product to the `rejectedProducts` key in local storage.
- Automatically update the displayed cards when a product is approved or deleted.

---

### 3. Conditional Styling Based on Rating:

Apply **CSS styling** to each product card dynamically based on the product's rating:

- **Rating < 3:** Apply a red border.
- **Rating 3 to 4 (inclusive):** Apply a pink border.
- **Rating > 4:** Apply a blue border.

Use the `classList` property in JavaScript to add classes dynamically:

```javascript
if (rating < 3) {
  card.classList.add("low-rating");
} else if (rating >= 3 && rating <= 4) {
  card.classList.add("mid-rating");
} else {
  card.classList.add("high-rating");
}
```

---

### 4. Alerts for Actions:

Display alerts for the following actions:

- **On Approval:** Show an alert: `"Product approved successfully!"`
- **On Deletion:** Show an alert: `"Product rejected successfully!"`

---

---

### Goal:

By completing this exercise, you will:

- Practice DOM manipulation techniques for creating and updating elements dynamically.
- Learn to use local storage for data persistence.
- Implement conditional styling using `classList`.
- Enhance your understanding of JavaScript event handling.
