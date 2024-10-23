### **1. Font Properties**

| Property          | Description                                     | Values                                                                                     |
|-------------------|-------------------------------------------------|--------------------------------------------------------------------------------------------|
| `font-family`     | Specifies the font for text                     | `Arial`, `Helvetica`, `Times New Roman`, `sans-serif`, etc.                                |
| `font-size`       | Sets the size of the font                       | `px`, `em`, `%`, `rem`, `vw`, `vh`, etc. (`font-size: 16px;`)                              |
| `font-weight`     | Controls the thickness of the text               | `normal`, `bold`, `bolder`, `lighter`, `100` to `900` (e.g., `font-weight: 700;`)           |
| `font-style`      | Defines if the text is italic or normal          | `normal`, `italic`, `oblique`                                                              |
| `font-variant`    | Displays text in small-caps                     | `normal`, `small-caps`                                                                     |
| `line-height`     | Sets the height of a line of text                | `normal`, `number`, `length`, `percentage` (e.g., `line-height: 1.5;` or `line-height: 20px;`) |
| `letter-spacing`  | Adjusts the space between letters                | `normal`, `length` (e.g., `letter-spacing: 2px;`)                                          |
| `word-spacing`    | Adjusts the space between words                  | `normal`, `length` (e.g., `word-spacing: 5px;`)                                            |
| `text-transform`  | Controls text case                               | `none`, `capitalize`, `uppercase`, `lowercase`                                              |
| `text-decoration` | Applies text decorations like underline or overline | `none`, `underline`, `overline`, `line-through`, `blink`                                   |
| `text-align`      | Aligns text within its container                 | `left`, `right`, `center`, `justify`                                                       |

---

### **2. Color Properties**

| Property       | Description                                          | Values                                                         |
|----------------|------------------------------------------------------|----------------------------------------------------------------|
| `color`        | Sets the text color                                  | `name`, `hex code`, `rgb()`, `rgba()`, `hsl()` (e.g., `color: #333;`) |
| `background-color` | Sets the background color for an element         | `name`, `hex code`, `rgb()`, `rgba()`, `hsl()` (e.g., `background-color: lightblue;`) |

---

### **3. Text and Content Properties**

| Property            | Description                                      | Values                                                                 |
|---------------------|--------------------------------------------------|------------------------------------------------------------------------|
| `text-indent`       | Indents the first line of text                    | `length`, `percentage` (e.g., `text-indent: 20px;`)                     |
| `white-space`       | Specifies how white space is handled              | `normal`, `nowrap`, `pre`, `pre-wrap`, `pre-line`                       |
| `text-shadow`       | Adds a shadow to text                             | `h-shadow`, `v-shadow`, `blur`, `color` (e.g., `text-shadow: 2px 2px 5px red;`) |
| `direction`         | Sets text direction                              | `ltr` (left to right), `rtl` (right to left)                            |
| `unicode-bidi`      | Handles bidirectional text                        | `normal`, `embed`, `bidi-override`                                     |

---

### **4. Background Properties**

| Property              | Description                                       | Values                                                                             |
|-----------------------|---------------------------------------------------|------------------------------------------------------------------------------------|
| `background-image`     | Sets the background image for an element          | `url("path")`, `none`                                                              |
| `background-position`  | Positions the background image                   | `left`, `right`, `center`, `top`, `bottom`, `length`, `percentage`                 |
| `background-repeat`    | Controls how the background image is repeated     | `repeat`, `no-repeat`, `repeat-x`, `repeat-y`, `space`, `round`                    |
| `background-attachment`| Determines if the background image is fixed       | `scroll`, `fixed`, `local`                                                         |
| `background-size`      | Sets the size of the background image             | `auto`, `cover`, `contain`, `length`, `percentage`                                 |
| `background-origin`    | Specifies the origin position of the background   | `padding-box`, `border-box`, `content-box`                                         |
| `background-clip`      | Defines how far the background extends            | `border-box`, `padding-box`, `content-box`                                         |
| `background-blend-mode`| Sets how background images blend with the background color | `normal`, `multiply`, `screen`, `overlay`, etc.                                   |

---

### **5. Border Properties**

| Property              | Description                                        | Values                                                        |
|-----------------------|----------------------------------------------------|---------------------------------------------------------------|
| `border`              | Shorthand for setting all border properties        | `border-width`, `border-style`, `border-color`                 |
| `border-width`        | Sets the width of the border                       | `thin`, `medium`, `thick`, `px` (e.g., `border-width: 2px;`)   |
| `border-style`        | Specifies the style of the border                  | `none`, `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset` |
| `border-color`        | Sets the color of the border                       | `name`, `hex`, `rgb()`, `rgba()`, `hsl()` (e.g., `border-color: red;`) |
| `border-radius`       | Rounds the corners of an element                   | `px`, `em`, `percentage` (e.g., `border-radius: 10px;`)        |
| `border-collapse`     | Specifies whether table borders are collapsed      | `collapse`, `separate`                                         |
| `border-spacing`      | Sets the spacing between borders in table cells    | `px`, `em`                                                     |

---

### **6. Box Model Properties**

| Property              | Description                                      | Values                                                        |
|-----------------------|--------------------------------------------------|---------------------------------------------------------------|
| `margin`              | Controls the space outside an element            | `length`, `percentage`, `auto` (e.g., `margin: 10px;`)         |
| `margin-top`          | Controls the top margin                          | `length`, `percentage`, `auto` (e.g., `margin-top: 20px;`)     |
| `margin-right`        | Controls the right margin                        | `length`, `percentage`, `auto` (e.g., `margin-right: 15px;`)   |
| `margin-bottom`       | Controls the bottom margin                       | `length`, `percentage`, `auto` (e.g., `margin-bottom: 10px;`)  |
| `margin-left`         | Controls the left margin                         | `length`, `percentage`, `auto` (e.g., `margin-left: 5px;`)     |
| `padding`             | Controls the space inside an element             | `length`, `percentage` (e.g., `padding: 15px;`)                |
| `padding-top`         | Controls the top padding                         | `length`, `percentage` (e.g., `padding-top: 10px;`)            |
| `padding-right`       | Controls the right padding                       | `length`, `percentage` (e.g., `padding-right: 10px;`)          |
| `padding-bottom`      | Controls the bottom padding                      | `length`, `percentage` (e.g., `padding-bottom: 10px;`)         |
| `padding-left`        | Controls the left padding                        | `length`, `percentage` (e.g., `padding-left: 10px;`)           |
| `width`               | Defines the width of an element                  | `px`, `%`, `vw`, `vh`                                          |
| `height`              | Defines the height of an element                 | `px`, `%`, `vh`, `vw`                                          |
| `box-shadow`          | Adds a shadow to an element                      | `h-shadow`, `v-shadow`, `blur-radius`, `spread-radius`, `color` (e.g., `box-shadow: 5px 5px 10px #888888;`) |

---

### **7. Display and Positioning**

| Property              | Description                                     | Values                                                        |
|-----------------------|-------------------------------------------------|---------------------------------------------------------------|
| `display`             | Defines how an element is displayed             | `block`, `inline`, `inline-block`, `flex`, `grid`, `none`      |
| `position`            | Specifies how an element is positioned          | `static`, `relative`, `absolute`, `fixed`, `sticky`            |
| `top`, `right`, `bottom`, `left` | Controls the offset of positioned elements | `length`, `percentage` (e.g., `top: 20px; left: 50%;`)         |
| `z-index`             | Controls the stack order of elements            | `auto`, `number` (e.g., `z-index: 10;`)                        |
| `float`               | Positions elements left or right of a container | `left`, `right`, `none`                                       |
| `clear`               | Controls the behavior of floated
