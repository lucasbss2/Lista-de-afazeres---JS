"use strict";

let task = document.getElementById('input');
let insertButton = document.getElementById('inputButton');
let list = document.querySelector('ul')
let buttonDelete = document.querySelector('.deleteAll button');
let itemAdd = [];


task.addEventListener('keypress', e => { //to check if "Enter" was pressed and input is not empty, setItemAdd will be called.
    if (e.key == 'Enter' && task.value != "") {
        setItemAdd();
    }
});

insertButton.onclick = () => { //to check if input is not empty and then call the function when insert is pressed.
    if (task.value != "") {
        setItemAdd();
    }
};

buttonDelete.onclick = () => {
    itemAdd = [];
    updateItem();
}

function setItemAdd() {
    if (itemAdd.length >= 20) {
        alert('Limite máximo de tarefas (20) foi atingido.') //data validation for 20 items max.
        return
    }
    
    itemAdd.push({ 'item': task.value, 'status': ''}) //if length < 20, push through the array and call updateItem.
    updateItem()
};

function updateItem() {
    localStorage.setItem('ToDoList', JSON.stringify(itemAdd)); 
    loadItems();
};

function loadItems() {
    list.innerHTML = ""; //clear the items to avoid duplication.
    itemAdd = JSON.parse(localStorage.getItem('ToDoList')) ?? []; 
    itemAdd.forEach((item, i) => {
        insertItemOnScreen(item.item, item.status, i) //to recover items, status and index.
    });
};

function insertItemOnScreen(text, status, i) {
    let listItem = document.createElement('li');
    listItem.innerHTML = `
    <div class = "listItem">
        <input type = "checkbox" ${status} data-i =${i} onchange = "done(this, ${i});" />
        <span data-si = ${i}> ${text} </span>
        <button onclick = "removeItem(${i})" data-i = ${i}> <i class='bx bx-trash'></i> </button>
    </div>`
    list.appendChild(listItem);
    
    if (status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('lineThrough')
    } else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('lineThrough')
    }
    
    task.value = '';
}

function done (chk, i) {
    if (chk.checked) {
        itemAdd[i].status = 'checked';
    } else {
        itemAdd[i].status = '';
    }
    updateItem();
}

function removeItem(i) {
    itemAdd.splice(i, 1);
    updateItem();
}

updateItem();