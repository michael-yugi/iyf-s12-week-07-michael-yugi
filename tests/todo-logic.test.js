import { describe, it, expect } from "vitest";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
  filterTodos,
  countRemaining,
} from "../js/todo-logic.js";

const sampleTodos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Study JavaScript", completed: true },
  { id: 3, text: "Call Amina", completed: false },
];

describe("addTodo", () => {
  it("adds a new todo to the end of the list", () => {
    const result = addTodo(sampleTodos, "Wash clothes");
    expect(result).toHaveLength(4);
    expect(result[3].text).toBe("Wash clothes");
    expect(result[3].completed).toBe(false);
  });

  it("ignores empty text", () => {
    const result = addTodo(sampleTodos, "   ");
    expect(result).toHaveLength(3);
  });

  it("does not change the original array", () => {
    const original = [...sampleTodos];
    addTodo(sampleTodos, "Wash clothes");
    expect(sampleTodos).toEqual(original);
    expect(sampleTodos).toHaveLength(3);
  });
});

describe("toggleTodo", () => {
  it("flips completed for the matching id", () => {
    const result = toggleTodo(sampleTodos, 1);
    expect(result[0].completed).toBe(true);
  });

  it("leaves the list unchanged when the id does not exist", () => {
    const result = toggleTodo(sampleTodos, 999);
    expect(result).toEqual(sampleTodos);
  });

  it("does not change the original todo object", () => {
    toggleTodo(sampleTodos, 1);
    expect(sampleTodos[0].completed).toBe(false);
  });
});

describe("deleteTodo", () => {
  it("removes the todo with that id", () => {
    const result = deleteTodo(sampleTodos, 2);
    expect(result).toHaveLength(2);
    expect(result.find((todo) => todo.id === 2)).toBeUndefined();
  });

  it("works on an empty list", () => {
    expect(deleteTodo([], 1)).toEqual([]);
  });
});

describe("editTodo", () => {
  it("changes the text of the matching todo", () => {
    const result = editTodo(sampleTodos, 1, "Buy bread");
    expect(result[0].text).toBe("Buy bread");
  });

  it("ignores empty text", () => {
    const result = editTodo(sampleTodos, 1, "");
    expect(result[0].text).toBe("Buy milk");
  });
});

describe("clearCompleted", () => {
  it("removes only completed todos", () => {
    const result = clearCompleted(sampleTodos);
    expect(result).toHaveLength(2);
    expect(result.every((todo) => !todo.completed)).toBe(true);
  });
});

describe("filterTodos", () => {
  it("returns everything for 'all'", () => {
    expect(filterTodos(sampleTodos, "all")).toHaveLength(3);
  });

  it("returns only active todos for 'active'", () => {
    expect(filterTodos(sampleTodos, "active")).toHaveLength(2);
  });

  it("returns only completed todos for 'completed'", () => {
    expect(filterTodos(sampleTodos, "completed")).toHaveLength(1);
  });
});

describe("countRemaining", () => {
  it("counts the todos that are not completed", () => {
    expect(countRemaining(sampleTodos)).toBe(2);
  });

  it("returns 0 for an empty list", () => {
    expect(countRemaining([])).toBe(0);
  });
});
