const DRAFT_KEY = "formDraft";
const AUTO_SAVE_INTERVAL_MS = 5000;

const form = document.getElementById("draft-form");
const saveStatus = document.getElementById("save-status");
const fields = form.querySelectorAll("input, textarea");

// Read every field into one object: { name: "...", email: "...", message: "..." }
function collectFormData() {
    const data = {};
    fields.forEach((field) => {
        data[field.name] = field.value;
    });
    return data;
}

function saveDraft() {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(collectFormData()));
    saveStatus.textContent = `Draft saved at ${new Date().toLocaleTimeString()}`;
}

function loadDraft() {
    try {
        return JSON.parse(localStorage.getItem(DRAFT_KEY));
    } catch {
        return null;
    }
}

function restoreDraft() {
    const draft = loadDraft();
    if (!draft) {
        return;
    }

    fields.forEach((field) => {
        if (typeof draft[field.name] === "string") {
            field.value = draft[field.name];
        }
    });
    saveStatus.textContent = "Draft restored";
}
// Restore first, then start saving every 5 seconds
restoreDraft();
const autoSaveTimer = setInterval(saveDraft, AUTO_SAVE_INTERVAL_MS);

// On submit: remove the draft and stop the timer
form.addEventListener("submit", (event) => {
    event.preventDefault();

    clearInterval(autoSaveTimer);
    localStorage.removeItem(DRAFT_KEY);
    form.reset();
    saveStatus.textContent = "Message sent. Draft cleared.";
});