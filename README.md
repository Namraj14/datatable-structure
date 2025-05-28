# 📚 Lightning Web Component - DatatableStructure

This Lightning Web Component displays a list of books in a `lightning-datatable` and allows users to select rows and view their selected data.

---

## 🚀 Functionality

- Displays book details (`name`, `author`, `price`) using a Salesforce Lightning Datatable.
- Allows users to **select rows**.
- Provides a button labeled **"Get Selected Rows"** to display selected row data.
- Displays the selected rows in JSON format below the button.

---

## 🧱 Component Structure

### Template: `datatableStructure.html`

```html
<template>
  <lightning-card title="Book Details">
    <lightning-datatable 
      lwc:ref="dt"
      key-field="id"
      columns={columns}
      data={books}>
    </lightning-datatable>

    <lightning-button
      label="Get Selected Rows"
      onclick={getSelectedRows}>
    </lightning-button>
    
    <p>{selectedStr}</p>
  </lightning-card>
</template>
```

### Breakdown:

| Tag | Description |
|-----|-------------|
| `lightning-datatable` | A Salesforce Base LWC component to render tabular data. Uses `columns` and `books` as input. |
| `lwc:ref="dt"` | A reference to the datatable DOM element, allowing us to call methods like `getSelectedRows()` in JavaScript. |
| `lightning-button` | Triggers the `getSelectedRows` method when clicked. |
| `<p>{selectedStr}</p>` | Displays the selected rows in JSON format for debugging or demonstration purposes. |

---

## 🧠 JavaScript: `datatableStructure.js`

```js
import { LightningElement } from 'lwc';

export default class DatatableStructure extends LightningElement {
    selected;

    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Author', fieldName: 'author' },
        { label: 'Price', fieldName: 'price' }
    ];

    books = [
        { id: 1, name: 'Harry Potter', author: 'JK', price: 2000 },
        { id: 2, name: 'Harry Potter 2', author: 'JK', price: 4000 },
        { id: 3, name: 'Harry Potter 3', author: 'JK', price: 5000 }
    ];

    // Method triggered by the button
   getSelectedRows(event){
        this.selected = this.template.querySelector('lightning-datatable').getSelectedRows();
        console.log('selected rows' + this.selected);
        
    }

    // Getter to return selected rows as JSON string
    get selectedStr() {
        return this.selected ? this.selected.map(books => `Name: ${books.name}, Author: ${books.author}, Price: ${books.price}`).join('\n') : '';
    }
}
```
# Explanation of the Code Snippet

```js
return this.selected 
    ? this.selected
          .map(books => `Name: ${books.name}, Author: ${books.author}, Price: ${books.price}`)
          .join('\n') 
    : '';
Step-by-step Breakdown
return this.selected ? ... : '';

This is a ternary conditional operator.

It checks if this.selected is truthy (i.e., it exists and is not null or undefined).

If true (some rows are selected), it processes the array.

If false (no rows selected), it returns an empty string ''.

this.selected.map(...)

this.selected is an array of selected book objects.

.map() is an array method that creates a new array by applying a transformation function to each element.

Each book object is transformed into a formatted string.

books => \Name: ${books.name}, Author: ${books.author}, Price: ${books.price}``

An arrow function used inside .map().

For every book in the array, it returns a string formatted as:
"Name: [book name], Author: [book author], Price: [book price]"

.join('\n')

.join() converts the array of strings into a single string.

It joins the strings inserting '\n' (newline character) between each string.

Result is a multi-line string where each selected book appears on a new line.

Summary
If selected rows exist, transform each selected book object into a descriptive string.

Join all these strings into a single multi-line string.

If no selection, return an empty string.

Example Output
If the selected array is:

js
Copy
Edit
[
  {name: 'Harry Potter', author: 'JK', price: 2000},
  {name: 'Harry Potter 2', author: 'JK', price: 4000}
]
The returned string will be:

yaml
Copy
Edit
Name: Harry Potter, Author: JK, Price: 2000
Name: Harry Potter 2, Author: JK, Price: 4000
---

## 🛠️ Key Concepts

| Concept | Explanation |
|--------|-------------|
| `columns` | Defines the column structure for the datatable. |
| `key-field` | Uniquely identifies each row in the table (`id` here). |
| `getSelectedRows()` | Built-in datatable method that returns the list of currently selected rows. |
| `@track` (not needed here) | Normally used to make properties reactive (not used since we are using public properties and getters). |
| `get` keyword | Used to define a dynamic property (`selectedStr`) that recalculates every time it's accessed. |
| `lwc:ref` | Valid for template refs, but only works for certain component APIs. For `lightning-datatable`, prefer `querySelector`. |

---

## 📦 Output Example

When a user selects two rows and clicks the button:

```json
[
  {
    "id": 1,
    "name": "Harry Potter",
    "author": "JK",
    "price": 2000
  },
  {
    "id": 3,
    "name": "Harry Potter 3",
    "author": "JK",
    "price": 5000
  }
]
```

# Explanation of Datatable Selected Rows Code

## Overview

This explanation describes how the component captures selected rows from a `lightning-datatable` and displays the selected data as formatted text.

---

### 1. `getSelectedRows(event)`

- This method is called when the user clicks the "Get Selected Rows" button.
- It uses `this.template.querySelector('lightning-datatable').getSelectedRows()` to get an **array of the selected row objects** from the datatable.
- The selected rows are stored in the component’s `selected` property.
- It logs the selected rows using `console.log('selected rows', this.selected);` which prints the array of objects clearly.  
  **Note:** Using comma `,` in `console.log` is important to avoid printing `[object Object]` which happens if you use string concatenation (`+`).

---

### 2. `get selectedStr()`

- This is a **getter** that returns a formatted string representing the selected rows.
- It checks if `this.selected` exists (i.e., some rows are selected).
- It uses the `.map()` method on the `selected` array to transform each selected book object into a readable string of the format:  
  `"Name: [book name], Author: [book author], Price: [book price]"`.
- The `.map()` returns an array of these formatted strings.
- Then `.join('\n')` combines these strings into a single multiline string separated by line breaks.
- If no rows are selected, it returns an empty string `''`.

---

### Important Points

- **Why use `.map()` here?**  
  `.map()` transforms each element in the array into a different format, here from an object to a string.

- **Why not use `JSON.stringify(this.selected).map(...)`?**  
  Because `JSON.stringify()` converts the array into a string, and strings do **not** have a `.map()` method. You need to map over the array **before** converting to a string or formatting.

- **Logging with `console.log`**  
  Use comma `,` to log objects and arrays in a readable way instead of concatenating with `+`, which results in `[object Object]`.

---

### Summary

- The component extracts selected rows from the datatable as objects.
- Converts those objects into nicely formatted strings.
- Displays the formatted string in the UI.
- Proper use of array methods and logging improves code readability and debugging.

---

## 📚 Conclusion

This LWC demonstrates a simple but powerful use case for selecting and displaying records from a Lightning Datatable. It’s a common pattern in admin tools, dashboards, and record selection wizards.

Let me know if you'd like to extend this example — such as **editing rows**, **adding checkboxes**, or **performing mass actions**!
