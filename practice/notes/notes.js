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

let notes = getFromStorage("notes", []);
const noteList = document.getElementById("note-list");

function render() {
  noteList.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note.text;
    noteList.appendChild(li);
  });
}

render();
function commit() {
  saveToStorage("notes", notes);
  render();
}
function addNote(text) {
  notes = [...notes, { id: Date.now(), text: text }];
  commit();
}
const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (text === "") return;
  addNote(text);
  noteInput.value = "";
});
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  commit();
}
function render() {
  noteList.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note.text + " ";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(deleteBtn);
    noteList.appendChild(li);
  });
}
render();
