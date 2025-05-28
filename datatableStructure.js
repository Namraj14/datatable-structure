import { LightningElement } from 'lwc';

export default class DatatableStructure extends LightningElement {

    selected;

    columns = [
        {
            label: 'Name',
            fieldName: 'name'
        },
        {
            label: 'Author',
            fieldName: 'author'
        },
        {
            label: ' Price',
            fieldName: 'price'
        }
    ]

    books = [
        {
            id: 1,
            name: 'Harry Potter',
            author: 'JK',
            price:2000
        },
        {
            id: 2,
            name: 'Harry Potter 2',
            author: 'JK',
            price:4000
        },
        {
            id: 3,
            name: 'Harry Potter 3',
            author: 'JK',
            price:5000
        }
    ]

    getSelectedRows(event){
        this.selected = this.template.querySelector('lightning-datatable').getSelectedRows();
        console.log('selected rows' + this.selected);
        
    }

     get selectedStr() {
        return this.selected ? this.selected.map(books => `Name: ${books.name}, Author: ${books.author}, Price: ${books.price}`).join('\n') : '';
    }
}