// 1. Imports
import { saveTasks, loadTasks } from "./modules/storage_r.js";
import { validateTask } from "./modules/validation_r.js";
import { renderTasks } from "./modules/render_re.js";

// 2. Data Model & State
let tasks = loadTasks();
let currentFilter = "all";

// 3. DOM Elements Selection
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("emptyState");
const errorMessage = document.getElementById("errorMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const filterButtons = document.querySelectorAll(".filter-btn");

// 4. Task Object Factory
function createTask(text) {
    return {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
}

// 5. Update UI & Counters
function updateUI() {
    renderTasks(tasks, taskList, emptyState, currentFilter);

    totalTasks.textContent = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    completedTasks.textContent = completed;
    pendingTasks.textContent = tasks.length - completed;
}

// 6. Add Task Handler
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = taskInput.value;
    const validation = validateTask(text);

    if (!validation.valid) {
        errorMessage.textContent = validation.message;
        return;
    }

    errorMessage.textContent = "";

    const newTask = createTask(text);
    tasks.unshift(newTask); // Adds new task at the top

    saveTasks(tasks);
    taskInput.value = "";
    updateUI();
});

// 7. Input Event to Clear Error
taskInput.addEventListener("input", () => {
    if (errorMessage.textContent) {
        errorMessage.textContent = "";
    }
});

// 8. Event Delegation - Delete Task
taskList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        deleteTask(id);
    }
});

// 9. Event Delegation - Toggle Complete Checkbox
taskList.addEventListener("change", (e) => {
    if (e.target.classList.contains("complete-checkbox")) {
        const id = Number(e.target.dataset.id);
        toggleTask(id);
    }
});

// 10. Toggle Complete Logic
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });

    saveTasks(tasks);
    updateUI();
}

// 11. Delete Task Logic
function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(tasks);
        updateUI();
    }
}

// 12. Filter Switcher
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter;
        updateUI();
    });
});

// 13. Initial Application Render
updateUI();
