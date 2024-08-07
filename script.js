document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const newTodoForm = document.getElementById("new-todo-form");
    const newTodoInput = document.getElementById("new-todo-input");

    // Fetch and display todos from API
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => addTodoItem(todo.title, todo.completed));
        })
        .catch(error => console.error('Error fetching the todos:', error));

    // Add new todo item from form input
    newTodoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newTodoText = newTodoInput.value.trim();
        if (newTodoText !== "") {
            addTodoItem(newTodoText, false);
            newTodoInput.value = "";
        }
    });

    function addTodoItem(text, completed) {
        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";
        const uniqueId = `todo-${Date.now()}`;
        todoItem.innerHTML = `
            <input type="checkbox" id="${uniqueId}" ${completed ? 'checked' : ''} />
            <label for="${uniqueId}">${text}</label>
            <button class="remove-btn">Remove</button>
        `;
        if (completed) {
            todoItem.classList.add("completed");
        }
        todoList.appendChild(todoItem);
    
        const checkbox = todoItem.querySelector("input[type='checkbox']");
        const removeButton = todoItem.querySelector(".remove-btn");
    
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                todoItem.classList.add("completed");
            } else {
                todoItem.classList.remove("completed");
            }
        });
    
        removeButton.addEventListener("click", function () {
            todoItem.remove();
        });
    }
    
    
});