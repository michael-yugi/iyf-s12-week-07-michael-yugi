const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");

inputs.forEach((input) => {
    // 1. On page load: put back what was saved
    const saved = sessionStorage.getItem(`form_${input.name}`);
    if (saved !== null) {
        input.value = saved;
    }

    // 2. While typing: save every change
    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
    });
});
form.addEventListener("submit", () => {
    inputs.forEach((input) => {
        sessionStorage.removeItem(`form_${input.name}`);
    });
});