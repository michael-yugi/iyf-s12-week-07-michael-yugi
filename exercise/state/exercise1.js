const state = {
    todos: [],
    filter: "all",
    theme: "light",
};

function render() {
    console.log("Render called. State is:", state);
}

function saveState() {
    localStorage.setItem("appState", JSON.stringify(state));
}

// ONE function that changes state
function setState(updates) {
    Object.assign(state, updates);
    saveState();
    render();
}

function setFilter(filter) {
    setState({ filter });
}

function addTodo(text) {
    setState({
        todos: [...state.todos, { id: Date.now(), text, completed: false }],
    });
}

function toggleTodo(id) {
    setState({
        todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
    });
}
function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem("appState"));
        if (saved) {
            Object.assign(state, saved);
        }
    } catch {
        // bad data: keep the defaults
    }
}

loadState();
render();