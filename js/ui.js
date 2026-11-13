import { filterTodos, countRemaining } from "./todo-logic.js";

// Find the elements once
const taskList = document.querySelector("#task-list");
const itemsLeft = document.querySelector("#items-left");
const filterButtons = document.querySelectorAll(".filter-btn");

export function render(todos, filter) {
  taskList.textContent = "";

  filterTodos(todos, filter).forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    if (todo.completed) {
      li.classList.add("completed");
    }

    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.type = "button";

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });

  const remaining = countRemaining(todos);
  itemsLeft.textContent = `${remaining} ${remaining === 1 ? "item" : "items"} left`;

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });
}

// Turn a task's text into an edit box. Calls onSave(newText) on Enter, onCancel() on Escape.
export function startEditing(textElement, currentText, onSave, onCancel) {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentText;
  editInput.classList.add("edit-input");

  textElement.replaceWith(editInput);
  editInput.focus();
  editInput.select();

  editInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      onSave(editInput.value);
    }
    if (event.key === "Escape") {
      onCancel();
    }
  });
}
