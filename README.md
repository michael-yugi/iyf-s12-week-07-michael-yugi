## Week 7: JavaScript Best Practices

A refactor of my Week 5 To-Do List into a persistent, modular, linted and tested application, plus the supporting exercises for Lessons 13 and 14.

Deliverable: To-Do List (refactored)
Requirement	How it is met
Survives a page refresh	Todos and the selected filter are saved to localStorage
Split into modules	Five ES modules in js/, loaded with <script type="module">
Passes ESLint	npm run lint reports no errors or warnings
Unit tests	15 Vitest tests in tests/todo-logic.test.js, run with npm test
Features
Add, complete, edit (double-click) and delete tasks
Filter by All / Active / Completed
"Items left" counter and "Clear Completed"
Data and filter preferences persist across refreshes
Safe against empty or corrupted storage (falls back to defaults instead of crashing)
Architecture

The guiding rule is: the array is the truth, the page is a picture of it. State is loaded once at startup, changed through actions, saved after every change, then the page is redrawn.

File	Responsibility
js/todo-logic.js	Pure functions: add, toggle, edit, delete, clear completed, filter, count. No DOM, no localStorage. Never mutates its input.
js/storage.js	saveToStorage / getFromStorage, with try/catch around JSON.parse
js/state.js	Holds the current todos and filter, exposes read functions and actions that save after every change
js/ui.js	Everything that touches the DOM: rendering and inline editing
js/app.js	Entry point: wires events to state actions and triggers redraws

Keeping todo-logic.js pure is what makes it testable without a browser.

Project structure
iyf-s12-week-07-michael-yugi/
├── index.html              To-Do List page (loads js/app.js as a module)
├── styles.css
├── js/
│   ├── app.js
│   ├── state.js
│   ├── storage.js
│   ├── todo-logic.js
│   └── ui.js
├── tests/
│   └── todo-logic.test.js
├── cart/                   Lesson 13 class build: Shopping Cart
├── daily-challenges/       Daily challenges 1 to 5
├── lessons/                Practice exercises (notes app, state patterns, form, clean code, debugging)
├── eslint.config.js
├── .prettierrc
├── package.json
├── package-lock.json
└── README.md
Getting started

Requirements: Node.js 22 or 24 (node --version) and the VS Code Live Server extension.

bash
git clone https://github.com/michael-yugi/iyf-s12-week-07-michael-yugi.git
cd iyf-s12-week-07-michael-yugi
npm install

node_modules/ is not committed; npm install recreates it from package-lock.json.

Run the app: open the project folder in VS Code and start Live Server on index.html. ES modules do not load from a file:// address, so double-clicking the file will not work.

## npm scripts

Command	What it does

npm test	Runs the Vitest unit tests once
npm run lint	Checks the code with ESLint
npm run lint: fix	Fixes auto-fixable lint problems
npm run format	Formats .js, .html and .css files with Prettier
Tooling
ESLint 9+ with a flat config (eslint.config.js), including no-var, eqeqeq, curly, prefer-const and no-unused-vars
Prettier (.prettierrc): 4-space indent, double quotes, 100-character lines
Vitest for unit tests
Testing
tests/todo-logic.test.js contains 15 tests covering every exported function in todo-logic.js:
Behaviour: adding, toggling, editing, deleting, filtering, counting and clearing completed
Edge cases: empty or whitespace-only text, an ID that does not exist, an empty list
Immutability: tests confirm the original array and todo objects are not modified
bash
npm test

## Lesson 13: Local Storage and State Management

Task	Description	Location
13.1	localStorage basics, JSON, helper functions, notes app	lessons/notes/
13.2	Persistent To-Do List (todos, completed state, delete, filter)	Root and js/
13.3	sessionStorage form that auto-saves as you type	lessons/form/
13.4	Centralised state and the observer pattern	lessons/state/
Class build	Shopping Cart	cart/
Shopping Cart (cart/)
Product list with "Add to Cart"
Add items, change quantity, remove items, clear the cart
Item count and total are calculated from the cart, never stored, so they cannot go out of sync
Only { productId, quantity } is saved to localStorage; the cart survives a refresh

## Lesson 14: Code Quality

Task	Description	Location
14.1	Modular code organisation	js/
14.2	Clean code: names, single responsibility, no magic numbers	lessons/clean-code/
14.3	Debugging: console methods, breakpoints, bug hunt	lessons/clean-code/
14.4	ESLint and Prettier setup	Repo root
14.5	Unit tests	tests/

## Daily challenges

Day	Challenge	Status
1	Theme persistence	[ ]
2	Recent searches (last 5)	[ ]
3	Form auto-save	[ ]
4	Refactor challenge	[ ]
5	Code review of Weather Dashboard	[ ]

## What I learned
Persisting state with localStorage, and why parsing stored data must be guarded with try/catch
Keeping a single source of truth and saving after every change
Separating pure logic from DOM and storage code so it can be tested
Setting up ESLint (flat config), Prettier and Vitest with npm
Reviewing code against a checklist and responding to review feedback with commits

## collaboration
Partner: @Gitau0076-cpu
PR I opened: michael-yugi/iyf-s12-week-07-michael-yugi#3
PR I reviewed: https://github.com/gitau0076-cpu/iyf-s12-week-07-gitau0076-cpu/pull/4
