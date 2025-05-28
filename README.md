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
    getSelectedRows(event) {
        this.selected = this.refs.dt.getSelectedRows(); // ⛔ Error: should be this.template.querySelector
    }

    // Getter to return selected rows as JSON string
    get selectedStr() {
        return this.selected ? JSON.stringify(this.selected) : '';
    }
}
```

---

## 🐞 Correction Needed

Your method of getting selected rows currently uses:
```js
this.refs.dt.getSelectedRows();
```

✅ The correct syntax in LWC is:
```js
this.template.querySelector('lightning-datatable').getSelectedRows();
```

### Fixed Method:
```js
getSelectedRows() {
    const selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
    this.selected = selectedRows;
}
```

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

---

## 📚 Conclusion

This LWC demonstrates a simple but powerful use case for selecting and displaying records from a Lightning Datatable. It’s a common pattern in admin tools, dashboards, and record selection wizards.

Let me know if you'd like to extend this example — such as **editing rows**, **adding checkboxes**, or **performing mass actions**!
