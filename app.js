// Select Elements
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");
const clearAllBtn = document.getElementById("clear-all-btn");
const noTodoMessage = document.getElementById("no-todo-message");

// Event Listeners
addTodoBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", deleteAllTodos);
todoList.addEventListener("click", handleTodoActions);

// Functions

// 1. Add a new to-do item
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText === "") return; // Prevent empty to-dos

  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  // Todo content and actions
  todoItem.innerHTML = `
    <span class="todo-text">${todoText}</span>
    <div class="actions">
      <i class="fas fa-edit edit-btn" title="Edit"></i>
      <i class="fas fa-check check-btn" title="Mark as Done"></i>
      <i class="fas fa-trash delete-btn" title="Delete"></i>
    </div>
  `;

  todoList.appendChild(todoItem);
  todoInput.value = "";
  updateNoTodoMessage();
}

// 2. Handle actions on each to-do item
function handleTodoActions(event) {
  const item = event.target;
  const todoItem = item.closest(".todo-item");

  if (item.classList.contains("delete-btn")) {
    deleteTodoItem(todoItem);
  } else if (item.classList.contains("check-btn")) {
    toggleTodoDone(todoItem);
  } else if (item.classList.contains("edit-btn")) {
    editTodoItem(todoItem);
  }
}

// 3. Delete a specific to-do item
function deleteTodoItem(todoItem) {
  todoList.removeChild(todoItem);
  updateNoTodoMessage();
}

// 4. Toggle the done/undone state of a to-do item
function toggleTodoDone(todoItem) {
  todoItem.classList.toggle("done");
}

// 5. Edit a specific to-do item
function editTodoItem(todoItem) {
  const todoText = todoItem.querySelector(".todo-text");
  const newText = prompt("Edit your todo:", todoText.textContent);

  if (newText !== null && newText.trim() !== "") {
    todoText.textContent = newText.trim();
  }
}

// 6. Delete all to-dos
function deleteAllTodos() {
  todoList.innerHTML = "";
  updateNoTodoMessage();
}

// 7. Update the "No todos" message display
function updateNoTodoMessage() {
  noTodoMessage.style.display =
    todoList.children.length === 0 ? "block" : "none";
}

// Initialize with no todos message shown
updateNoTodoMessage();
