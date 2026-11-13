import { getTodos, getFilter, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, setFilter } from "./state.js";
import { render, startEditing } from "./ui.js";

const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const clearCompletedBtn = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

function refresh() {
    render(getTodos(), getFilter());
}

// Add
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    addTodo(text);
    taskInput.value = "";
    refresh();
});

// Complete and delete (event delegation)
taskList.addEventListener("click", (event) => {
    const li = event.target.closest(".task-item");
    if (!li) {
        return;
    }

    const id = Number(li.dataset.id);

    if (event.target.classList.contains("delete-btn")) {
        deleteTodo(id);
    } else if (event.target.classList.contains("task-text")) {
        toggleTodo(id);
    }

    refresh();
});

// Edit with double-click
taskList.addEventListener("dblclick", (event) => {
    if (!event.target.classList.contains("task-text")) {
        return;
    }

    const li = event.target.closest(".task-item");
    const id = Number(li.dataset.id);
    const todo = getTodos().find((t) => t.id === id);
    if (!todo) {
        return;
    }

    startEditing(
        event.target,
        todo.text,
        (newText) => {
            editTodo(id, newText);
            refresh();
        },
        refresh
    );
});

// Filter buttons
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
        refresh();
    });
});

// Clear completed
clearCompletedBtn.addEventListener("click", () => {
    clearCompleted();
    refresh();
});

// Start
refresh();