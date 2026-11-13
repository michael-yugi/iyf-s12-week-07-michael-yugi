const users = [
    { name: "Amina", age: 21 },
    { name: "Brian", age: 17 },
];
const x = 5;

console.log("Basic message");
console.log("%cImportant!", "color: red; font-size: 20px;");
console.warn("This might be a problem");
console.error("This is definitely wrong");
console.table(users);

console.group("User Processing");
console.log("Step 1");
console.log("Step 2");
console.groupEnd();

console.assert(x > 10, "x should be greater than 10");
console.trace("How did we get here?");