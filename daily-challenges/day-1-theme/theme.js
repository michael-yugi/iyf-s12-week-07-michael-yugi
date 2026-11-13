const THEME_KEY = "theme";
const toggleButton = document.getElementById("theme-toggle");

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
}

// Apply the saved theme on load
let currentTheme = localStorage.getItem(THEME_KEY) || "light";
applyTheme(currentTheme);

toggleButton.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, currentTheme);
    applyTheme(currentTheme);
});