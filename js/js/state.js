import { getFromStorage, saveToStorage } from "./storage.js";
import {
  addTodo as addTodoToList,
  toggleTodo as toggleTodoInList,
  deleteTodo as deleteTodoFromList,
  editTodo as editTodoInList,
  clearCompleted as clearCompletedFromList,
} from "./todo-logic.js";

const TODOS_KEY = "todos";
const FILTER_KEY = "filter";

// Load ONCE when the app starts
const state = {
  todos: getFromStorage(TODOS_KEY, []),
  filter: getFromStorage(FILTER_KEY, "all"),
};

function persist() {
  saveToStorage(TODOS_KEY, state.todos);
  saveToStorage(FILTER_KEY, state.filter);
}

export function getTodos() {
  return state.todos;
}

export function getFilter() {
  return state.filter;
}

export function addTodo(text) {
  state.todos = addTodoToList(state.todos, text);
  persist();
}

export function toggleTodo(id) {
  state.todos = toggleTodoInList(state.todos, id);
  persist();
}

export function deleteTodo(id) {
  state.todos = deleteTodoFromList(state.todos, id);
  persist();
}

export function editTodo(id, newText) {
  state.todos = editTodoInList(state.todos, id, newText);
  persist();
}

export function clearCompleted() {
  state.todos = clearCompletedFromList(state.todos);
  persist();
}

export function setFilter(filter) {
  state.filter = filter;
  persist();
}
