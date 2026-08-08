// HTML Escape Helper to prevent XSS Attacks
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// DOM Rendering Function
export function renderTasks(tasks, taskList, emptyState, filter = "all") {
    taskList.innerHTML = "";

    // Filter Tasks
    let filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    // Empty State Handling
    if (filteredTasks.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    } else {
        emptyState.classList.add("hidden");
    }

    // Render Tasks
    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item fade-in";

        li.innerHTML = `
            <div class="task-left">
                <input 
                    type="checkbox"
                    class="complete-checkbox"
                    data-id="${task.id}"
                    ${task.completed ? "checked" : ""}
                >
                <span class="task-text ${task.completed ? "completed" : ""}">
                    ${escapeHTML(task.text)}
                </span>
            </div>

            <div class="actions">
                <button 
                    class="delete-btn"
                    data-id="${task.id}"
                    aria-label="Delete Task"
                >
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}
