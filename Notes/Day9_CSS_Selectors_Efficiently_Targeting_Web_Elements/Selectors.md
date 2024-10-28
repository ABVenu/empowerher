### Student Notes

# CSS Selectors: Efficiently Targeting Web Elements

---

#### **Overview of CSS Selectors**

**What are Selectors?**
CSS selectors are the building blocks for styling HTML elements on a webpage. They help developers specify which elements to style, allowing for greater control over the appearance of web content.

**Why are Selectors Needed?**
Selectors are essential for:

1. **Consistent Styling**: Apply the same styles to multiple elements easily.
2. **Targeting Specific Elements**: Allow for unique styling of certain elements.
3. **Efficient Code Management**: Reduce redundancy and promote cleaner code.

---

#### **1. Basic Selectors**

Basic selectors help in applying styles to elements in a straightforward manner.

- **Universal Selector (`*`)**: Selects every element on the page.

  **Example:**

  ```css
  * {
    /* Universal Selector */
    margin: 0; /* Resets margin for all elements */
    padding: 0; /* Resets padding for all elements */
  }
  ```

- **Element Selector**: Targets all instances of a specific HTML tag.

  **Example:**

  ```css
  p {
    /* Element Selector */
    color: blue; /* Makes all <p> text blue */
  }
  ```

- **Class Selector (`.class-name`)**: Targets all elements with a specific class.

  **Example:**

  ```css
  .highlight {
    /* Class Selector */
    background-color: yellow; /* Highlights elements with this class */
  }
  ```

- **ID Selector (`#id-name`)**: Targets a unique element with a specific ID.

  **Example:**

  ```css
  #header {
    /* ID Selector */
    font-size: 24px; /* Sets the font size of the element with ID 'header' */
  }
  ```

---

#### **2. Grouping Selectors**

Grouping selectors allow for applying the same styles to multiple elements by separating them with commas.

**Example:**

```css
h1,
h2,
p {
  /* Grouping Selectors */
  color: red; /* Makes all h1, h2, and p elements red */
}
```

---

#### **3. Pseudo-Classes**

Pseudo-classes style elements based on their state or position.

- **`:hover`**: Styles an element when the mouse hovers over it.

  **Example:**

  ```css
  a:hover {
    /* Pseudo-Class Selector */
    text-decoration: underline; /* Underlines the link when hovered */
  }
  ```

- **`:focus`**: Styles an element when it is focused.

  **Example:**

  ```css
  input:focus {
    /* Pseudo-Class Selector */
    border: 2px solid blue; /* Adds a blue border when the input is focused */
  }
  ```

- **`:first-child`**: Styles the first child of a parent element.

  **Example:**

  ```css
  li:first-child {
    /* Pseudo-Class Selector */
    font-weight: bold; /* Makes the first list item bold */
  }
  ```

- **`:nth-child(n)`**: Targets the nth child of a parent.

  **Example:**

  ```css
  tr:nth-child(2) {
    /* Pseudo-Class Selector */
    background-color: lightgray; /* Styles the second row in a table */
  }
  ```

---

#### **4. Pseudo-Elements**

Pseudo-elements allow styling of specific parts of an element.

- **`::before`**: Inserts content before an element’s content.

  **Example:**

  ```css
  .quote::before {
    /* Pseudo-Element Selector */
    content: "“"; /* Adds an opening quote before the quote */
  }
  ```

- **`::after`**: Inserts content after an element’s content.

  **Example:**

  ```css
  .quote::after {
    /* Pseudo-Element Selector */
    content: "”"; /* Adds a closing quote after the quote */
  }
  ```

- **`::first-line`**: Styles the first line of text in an element.

  **Example:**

  ```css
  p::first-line {
    /* Pseudo-Element Selector */
    font-weight: bold; /* Makes the first line bold */
  }
  ```

---

#### **5. Understanding CSS Specificity**

**What is Specificity?**
Specificity is a mechanism that determines which CSS styles are applied to an element when multiple rules target the same element. It is calculated based on the types of selectors used.

**Specificity Weighting:**

- **Universal Selector (`*`)**: Weight = **1** (0, 0, 0, 0)
- **Element Selector (e.g., `div`)**: Weight = **10** (0, 0, 0, 1)
- **Class Selector (e.g., `.class-name`)**: Weight = **100** (0, 0, 1, 0)
- **ID Selector (e.g., `#id-name`)**: Weight = **1000** (0, 1, 0, 0)
- **Inline Styles (e.g., `style="..."`)**: Weight = **10000** (1, 0, 0, 0)

**Calculating Specificity Score:**
To calculate specificity:

1. Count the number of ID selectors (A)
2. Count the number of class selectors and pseudo-classes (B)
3. Count the number of element selectors (C)
4. Count the number of inline styles (D)

The specificity score is represented as (A, B, C, D).

**Example of Specificity Calculation:**

```css
.text {
  /* Class Selector */
  color: blue; /* Specificity: (0, 0, 1, 0) = 100 */
}

.box .text {
  /* Class with Descendant Selector */
  color: green; /* Specificity: (0, 0, 1, 0) = 100 */
}

#container .text {
  /* ID with Descendant Selector */
  color: red; /* Specificity: (0, 1, 1, 0) = 1100 */
}
```

In this example:

- The class selector `.text` has a specificity score of **100**.
- The descendant selector `.box .text` also has a specificity score of **100**.
- The ID selector `#container .text` has a specificity score of **1100**, which takes precedence over the previous rules.

Understanding specificity is essential for ensuring the correct styles are applied, avoiding unintended style conflicts.

---

### **Key Takeaways**

- CSS selectors are fundamental for styling HTML elements.
- Understanding the hierarchy and specificity of selectors is critical for effective web design.
- Practicing with selectors and specificity will enhance your ability to create well-structured and visually appealing web pages.
