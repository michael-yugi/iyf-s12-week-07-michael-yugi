# IYF Season 12 – Week 7: JavaScript Best Practices

**Student:** Michael Yugi  
**Repository:** `iyf-s12-week-07-michael-yugi`  
**Course:** IYF Weekend Academy – Season 12  
**Week:** 7  
**Main Topics:** JavaScript Best Practices, Local Storage, State Management, Modular JavaScript, Code Quality and Unit Testing.

---

## 📌 Project Overview

Week 7 focuses on improving my Week 5 JavaScript To-Do List by transforming it into a persistent, modular, maintainable and tested application.

The project demonstrates how to write clean JavaScript code, organise applications using ES modules, manage application state, persist data using browser storage, and maintain code quality through ESLint, Prettier and Vitest.

In addition to the main To-Do List application, this repository contains practical exercises for Lessons 13 and 14, a Shopping Cart class project, and five daily challenges.

## 🚀 Main Project: Refactored To-Do List

The main deliverable is a refactored version of my Week 5 To-Do List application.

### Features

- Add new tasks using the input field.
- Prevent empty or whitespace-only tasks.
- Mark tasks as completed or active.
- Edit tasks by double-clicking them.
- Delete individual tasks.
- Filter tasks by All, Active and Completed.
- Display the number of remaining tasks.
- Clear all completed tasks.
- Save tasks automatically using localStorage.
- Remember the selected filter after refreshing the page.
- Handle empty or corrupted stored data safely.

### Requirements and Implementation

| Requirement | Implementation |
|---|---|
| Data persistence | Tasks and selected filters are saved in localStorage. |
| Modular JavaScript | Five ES modules organised inside the `js/` directory. |
| ESLint | Code checked using ESLint 9+ with a flat configuration. |
| Unit testing | 15 Vitest tests in `tests/todo-logic.test.js`. |
| Error handling | try/catch protects against corrupted stored JSON. |
| Immutability | Pure functions avoid modifying their original input arrays and objects. |

## 🏗️ Application Architecture

The application follows a simple principle:

**The state array is the single source of truth, while the user interface is a visual representation of that state.**

Application data is loaded once when the application starts. Changes are made through state actions, saved to localStorage and then reflected in the user interface.

### JavaScript Modules

| File | Responsibility |
|---|---|
| `js/todo-logic.js` | Contains pure functions for adding, completing, editing, deleting, filtering and counting tasks. |
| `js/storage.js` | Handles saving and retrieving application data from localStorage. |
| `js/state.js` | Manages the current tasks and selected filter. |
| `js/ui.js` | Handles DOM manipulation, rendering and inline editing. |
| `js/app.js` | Application entry point that connects events, state actions and UI updates. |

Keeping the business logic separate from the DOM and storage operations makes the application easier to maintain and test.

## 📚 Lesson 13: Local Storage and State Management

This lesson focused on browser storage, data persistence and centralised application state.

| Task | Description | Location |
|---|---|---|
| 13.1 | localStorage basics, JSON, helper functions and Notes App | `lessons/notes/` |
| 13.2 | Persistent To-Do List | Root directory and `js/` |
| 13.3 | sessionStorage form with automatic saving | `lessons/form/` |
| 13.4 | Centralised state and Observer Pattern | `lessons/state/` |

### Class Build: Shopping Cart

**Location:** `cart/`

The Shopping Cart demonstrates how to manage application state and persist shopping cart data.

Features include:
- Display a list of products.
- Add products to the shopping cart.
- Increase or decrease product quantities.
- Remove individual products.
- Clear the entire cart.
- Display the total number of items.
- Calculate the cart's total price.

Only the product ID and quantity are stored in localStorage. The item count and total price are calculated from the cart data to prevent inconsistent values.

## 🧹 Lesson 14: Code Quality

This lesson focused on writing clean, readable, maintainable and reliable JavaScript code.

| Task | Description | Location |
|---|---|---|
| 14.1 | Modular code organisation | `js/` |
| 14.2 | Clean code principles, naming and single responsibility | `lessons/clean-code/` |
| 14.3 | Debugging using console methods and breakpoints | `lessons/clean-code/` |
| 14.4 | ESLint and Prettier configuration | Repository root |
| 14.5 | Unit testing with Vitest | `tests/` |

### Development Tools

- **ESLint 9+:** Identifies potential errors and enforces coding standards.
- **Prettier:** Maintains consistent code formatting.
- **Vitest:** Runs automated unit tests.
- **Node.js:** Provides the JavaScript runtime and package management.
- **VS Code:** Main code editor.
- **Live Server:** Runs the application locally during development.

### ESLint Rules

The project uses ESLint rules including:

- `no-var`
- `eqeqeq`
- `curly`
- `prefer-const`
- `no-unused-vars`

## 🧪 Unit Testing

The project includes 15 automated unit tests located in:

`tests/todo-logic.test.js`

The tests cover:

**Behaviour**
- Adding tasks.
- Completing and undoing tasks.
- Editing tasks.
- Deleting tasks.
- Filtering tasks.
- Counting remaining tasks.
- Clearing completed tasks.

**Edge Cases**
- Empty task input.
- Whitespace-only input.
- Non-existent task IDs.
- Empty task arrays.

**Immutability**
- Confirming that the original arrays are not modified.
- Confirming that original task objects remain unchanged.

Run the tests using:

```bash
npm test
```

## 📂 Project Structure

```text
iyf-s12-week-07-michael-yugi/
│
├── index.html
├── styles.css
├── README.md
├── package.json
├── package-lock.json
├── eslint.config.js
├── .prettierrc
│
├── js/
│   ├── app.js
│   ├── state.js
│   ├── storage.js
│   ├── todo-logic.js
│   └── ui.js
│
├── tests/
│   └── todo-logic.test.js
│
├── cart/
│
├── daily-challenges/
│   ├── day-1/
│   ├── day-2/
│   ├── day-3/
│   ├── day-4/
│   └── day-5/
│
└── lessons/
    ├── notes/
    ├── form/
    ├── state/
    └── clean-code/
```

## ⚙️ Installation and Setup

### Prerequisites

Before running the project, ensure you have:

- Node.js 22 or 24.
- npm.
- Visual Studio Code.
- VS Code Live Server extension.
- Git installed on your computer.

### 1. Clone the Repository

```bash
git clone https://github.com/michael-yugi/iyf-s12-week-07-michael-yugi.git
```

### 2. Navigate into the Project

```bash
cd iyf-s12-week-07-michael-yugi
```

### 3. Install Dependencies

```bash
npm install
```

The `node_modules/` directory is not committed to GitHub. Running `npm install` recreates it using `package-lock.json`.

### 4. Run the Application

1. Open the project folder in VS Code.
2. Locate `index.html`.
3. Right-click the file.
4. Select **Open with Live Server**.

**Important:** The application uses ES modules, so it must run through a local development server rather than directly through a `file://` address.

## 📜 Available npm Commands

| Command | Description |
|---|---|
| `npm test` | Runs Vitest unit tests once. |
| `npm run lint` | Checks JavaScript files using ESLint. |
| `npm run lint:fix` | Automatically fixes supported ESLint issues. |
| `npm run format` | Formats JavaScript, HTML and CSS files using Prettier. |

## 📅 Daily Challenges

The repository also includes five daily challenges designed to strengthen my understanding of JavaScript best practices.

| Day | Challenge | Status |
|---|---|---|
| Day 1 | Theme Persistence | Completed |
| Day 2 | Recent Searches (Last 5) | Completed |
| Day 3 | Form Auto-Save | Completed |
| Day 4 | Refactor Challenge | Completed |
| Day 5 | Code Review of Weather Dashboard | Completed |

## 💡 What I Learned

Through Week 7, I gained practical experience in:

1. **Data Persistence:** Using localStorage and sessionStorage to save application data.
2. **Error Handling:** Using try/catch to handle corrupted JSON and prevent application crashes.
3. **State Management:** Maintaining a single source of truth for application data.
4. **Modular JavaScript:** Dividing applications into smaller, reusable and manageable ES modules.
5. **Clean Code:** Writing readable code using meaningful names and single-responsibility principles.
6. **Debugging:** Using browser developer tools, console methods and breakpoints to identify errors.
7. **Code Quality:** Using ESLint and Prettier to maintain consistent coding standards.
8. **Unit Testing:** Using Vitest to test JavaScript functions and verify expected behaviour.
9. **Code Review:** Reviewing another developer's code, providing constructive feedback and responding to review comments.
10. **Collaboration:** Working with another developer through GitHub branches and Pull Requests.


## 🤝 Collaboration and Code Review

**Collaboration Partner:** [@Gitau0076-cpu](https://github.com/Gitau0076-cpu)

This week's collaboration involved contributing to a shared learning environment through GitHub Pull Requests and code reviews.

### Pull Request Submitted

My contribution:

[View My Pull Request #3](https://github.com/michael-yugi/iyf-s12-week-07-michael-yugi/pull/3)

### Pull Request Reviewed

Partner's contribution:

[View Reviewed Pull Request #4](https://github.com/gitau0076-cpu/iyf-s12-week-07-gitau0076-cpu/pull/4)

The review process helped me practise examining code, identifying possible improvements, providing constructive comments and understanding the importance of reviewing changes before merging them into the main branch.
