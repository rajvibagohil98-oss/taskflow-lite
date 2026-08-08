import { saveTasks, loadTasks } from "./modules/storage.js";
import { validateTask } from "./modules/validation.js";
import { renderTasks } from "./modules/render.js";

// 1. Data Model & State
let tasks = loadTasks();
let currentFilter = "all";

// 2. DOM Elements Selection
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const errorMessage = document.getElementById("errorMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const filterButtons = document.querySelectorAll(".filter-btn");

// 3. Task Object Factory
function createTask(text) {
    return {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
}

// 4. Update Counter + Render UI
function updateUI() {
    renderTasks(tasks, taskList, emptyState, currentFilter);

    totalTasks.textContent = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    completedTasks.textContent = completed;
    pendingTasks.textContent = tasks.length - completed;
}

// 5. Add Task Handler
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
    tasks.unshift(newTask); // Add to the top of list

    saveTasks(tasks);
    taskInput.value = "";
    updateUI();
});

// 6. Real-time Input Validation Clear
taskInput.addEventListener("input", () => {
    if (errorMessage.textContent) {
        errorMessage.textContent = "";
    }
});

// 7. Event Delegation - Delete Task
taskList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        deleteTask(id);
    }
});

// 8. Event Delegation - Toggle Complete Checkbox
taskList.addEventListener("change", (e) => {
    if (e.target.classList.contains("complete-checkbox")) {
        const id = Number(e.target.dataset.id);
        toggleTask(id);
    }
});

// 9. Toggle Complete Logic
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

// 10. Delete Task Logic
function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(tasks);
        updateUI();
    }
}

// 11. Filter Logic
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter;
        updateUI();
    });
});

// 12. Initial Load
updateUI();
