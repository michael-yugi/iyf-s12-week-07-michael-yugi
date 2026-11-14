const HISTORY_KEY = "recentSearches";
const MAX_HISTORY = 5;

function loadHistory() {
    try {
        const saved = JSON.parse(localStorage.getItem(HISTORY_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

let history = loadHistory();

function addToHistory(term) {
    // remove it if it's already there, so it moves to the top
    const withoutDuplicate = history.filter((item) => item !== term);
    // newest first, keep only the last 5
    history = [term, ...withoutDuplicate].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const historyList = document.getElementById("history-list");
const result = document.getElementById("result");

function renderHistory() {
    historyList.textContent = "";

    history.forEach((term) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = term;
        button.dataset.term = term;
        li.appendChild(button);
        historyList.appendChild(li);
    });
}

function search(term) {
    result.textContent = `You searched for: ${term}`;
    addToHistory(term);
    renderHistory();
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const term = searchInput.value.trim();
    if (term === "") {
        return;
    }

    search(term);
    searchInput.value = "";
});

// Click a history item to search again
historyList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-term]");
    if (!button) {
        return;
    }
    search(button.dataset.term);
});

renderHistory();