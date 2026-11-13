// ---------- Storage helpers ----------
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue) {
    const data = localStorage.getItem(key);
    if (data === null) return defaultValue;
    try {
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

// ---------- Select HTML elements ----------
const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const itemsLeft = document.querySelector("#items-left");
const clearCompletedBtn = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

// ---------- State ----------
const STORAGE_KEY = "todos";
let todos = getFromStorage(STORAGE_KEY, []); // load ONCE at startup
let currentFilter = getFromStorage("filter", "all");

// Save, then redraw
function commit() {
    saveToStorage(STORAGE_KEY, todos);
    saveToStorage("filter", currentFilter);
    renderTasks();
}

// ---------- Add a new task ----------
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };

    todos = [...todos, newTask];
    taskInput.value = "";

    commit();
});

// ---------- Display tasks ----------
function renderTasks() {
    taskList.textContent = "";

    const filteredTasks = todos.filter(function (task) {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(function (task) {
        const li = document.createElement("li");
        li.classList.add("task-item");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = task.id;

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.type = "button";

        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateItemsLeft();
}

// ---------- Complete and delete (event delegation) ----------
taskList.addEventListener("click", function (event) {
    const li = event.target.closest(".task-item");

    if (!li) {
        return;
    }

    const taskId = Number(li.dataset.id);

    if (event.target.classList.contains("delete-btn")) {
        todos = todos.filter(function (task) {
            return task.id !== taskId;
        });
    } else if (event.target.classList.contains("task-text")) {
        todos = todos.map(function (task) {
            return task.id === taskId ? { ...task, completed: !task.completed } : task;
        });
    }

    commit();
});

// ---------- Edit tasks with double-click ----------
taskList.addEventListener("dblclick", function (event) {
    if (!event.target.classList.contains("task-text")) {
        return;
    }

    const li = event.target.closest(".task-item");
    const taskId = Number(li.dataset.id);

    const task = todos.find(function (task) {
        return task.id === taskId;
    });

    if (!task) return;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task.text;
    editInput.classList.add("edit-input");

    event.target.replaceWith(editInput);

    editInput.focus();
    editInput.select();

    editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const updatedText = editInput.value.trim();

            if (updatedText !== "") {
                todos = todos.map(function (t) {
                    return t.id === taskId ? { ...t, text: updatedText } : t;
                });
            }

            commit();
        }

        if (e.key === "Escape") {
            renderTasks();
        }
    });
});

// ---------- Filter tasks ----------
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        commit();
    });
});

// ---------- Count remaining tasks ----------
function updateItemsLeft() {
    const remainingTasks = todos.filter(function (task) {
        return !task.completed;
    }).length;

    itemsLeft.textContent = `${remainingTasks} ${remainingTasks === 1 ? "item" : "items"} left`;
}

// ---------- Clear completed tasks ----------
clearCompletedBtn.addEventListener("click", function () {
    todos = todos.filter(function (task) {
        return !task.completed;
    });

    commit();
});

// Highlight the button that matches the saved filter
filterButtons.forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.filter === currentFilter);
});

// ---------- Initial display ----------
renderTasks();