// // Select Elements
// const todoInput = document.getElementById("todo-input");
// const addTodoBtn = document.getElementById("add-todo-btn");
// const todoList = document.getElementById("todo-list");
// const clearAllBtn = document.getElementById("clear-all-btn");
// const noTodoMessage = document.getElementById("no-todo-message");

// // Event Listeners
// addTodoBtn.addEventListener("click", addTodo);
// clearAllBtn.addEventListener("click", deleteAllTodos);
// todoList.addEventListener("click", handleTodoActions);

// // Functions

// // 1. Add a new to-do item
// function addTodo() {
//   const todoText = todoInput.value.trim();

//   if (todoText === "") return; // Prevent empty to-dos

//   const todoItem = document.createElement("li");
//   todoItem.classList.add("todo-item");

//   // Todo content and actions
//   todoItem.innerHTML = `
//     <span class="todo-text">${todoText}</span>
//     <div class="actions">
//       <i class="fas fa-edit edit-btn" title="Edit"></i>
//       <i class="fas fa-check check-btn" title="Mark as Done"></i>
//       <i class="fas fa-trash delete-btn" title="Delete"></i>
//     </div>
//   `;

//   todoList.appendChild(todoItem);
//   todoInput.value = "";
//   updateNoTodoMessage();
// }

// // 2. Handle actions on each to-do item
// function handleTodoActions(event) {
//   const item = event.target;
//   const todoItem = item.closest(".todo-item");

//   if (item.classList.contains("delete-btn")) {
//     deleteTodoItem(todoItem);
//   } else if (item.classList.contains("check-btn")) {
//     toggleTodoDone(todoItem);
//   } else if (item.classList.contains("edit-btn")) {
//     editTodoItem(todoItem);
//   }
// }

// // 3. Delete a specific to-do item
// function deleteTodoItem(todoItem) {
//   todoList.removeChild(todoItem);
//   updateNoTodoMessage();
// }

// // 4. Toggle the done/undone state of a to-do item
// function toggleTodoDone(todoItem) {
//   todoItem.classList.toggle("done");
// }

// // 5. Edit a specific to-do item
// function editTodoItem(todoItem) {
//   const todoText = todoItem.querySelector(".todo-text");
//   const newText = prompt("Edit your todo:", todoText.textContent);

//   if (newText !== null && newText.trim() !== "") {
//     todoText.textContent = newText.trim();
//   }
// }

// // 6. Delete all to-dos
// function deleteAllTodos() {
//   todoList.innerHTML = "";
//   updateNoTodoMessage();
// }

// // 7. Update the "No todos" message display
// function updateNoTodoMessage() {
//   noTodoMessage.style.display =
//     todoList.children.length === 0 ? "block" : "none";
// }

// // Initialize with no todos message shown
// updateNoTodoMessage();
// Select Elements
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");
const clearAllBtn = document.getElementById("clear-all-btn");
const noTodoMessage = document.getElementById("no-todo-message");

// Array to store todos
let todos = [];

// Event Listeners
addTodoBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", deleteAllTodos);
todoList.addEventListener("click", handleTodoActions);

// Functions

// 1. Add a new to-do item
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === "") return; // Prevent adding empty to-dos

  // Add new todo to the array and reset input
  todos.push({ text: todoText, done: false });
  todoInput.value = "";
  renderTodos();
}

// 2. Handle actions on each to-do item
function handleTodoActions(event) {
  const item = event.target;
  const todoIndex = item.closest("li").dataset.index;

  if (item.classList.contains("delete-btn")) {
    deleteTodoItem(todoIndex);
  } else if (item.classList.contains("check-btn")) {
    toggleTodoDone(todoIndex);
  } else if (item.classList.contains("edit-btn")) {
    editTodoItem(todoIndex);
  }
}

// 3. Delete a specific to-do item
function deleteTodoItem(index) {
  todos.splice(index, 1);
  renderTodos();
}

// 4. Toggle the done/undone state of a to-do item
function toggleTodoDone(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

// 5. Edit a specific to-do item
function editTodoItem(index) {
  const newText = prompt("Edit your todo:", todos[index].text);

  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    renderTodos();
  }
}

// 6. Delete all to-dos
function deleteAllTodos() {
  todos = [];
  renderTodos();
}

// 7. Render todos and update "No todos" message
function renderTodos() {
  // Clear the list before re-rendering
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.dataset.index = index;
    if (todo.done) todoItem.classList.add("done");

    // Todo content and actions
    todoItem.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      <div class="actions">
        <i class="fas fa-edit edit-btn" title="Edit"></i>
        <i class="fas fa-check check-btn" title="Mark as Done"></i>
        <i class="fas fa-trash delete-btn" title="Delete"></i>
      </div>
    `;

    todoList.appendChild(todoItem);
  });

  // Update "No todos" message visibility
  noTodoMessage.style.display = todos.length === 0 ? "block" : "none";
}

// Initialize with no todos message shown
renderTodos();
