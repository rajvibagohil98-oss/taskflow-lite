export function validateTask(text) {
    const trimmedText = text.trim();

    if (trimmedText === "") {
        return { valid: false, message: "Please enter a task" };
    }

    if (trimmedText.length < 3) {
        return { valid: false, message: "Task must contain at least 3 characters" };
    }

    if (trimmedText.length > 100) {
        return { valid: false, message: "Task cannot exceed 100 characters" };
    }

    return { valid: true, message: "" };
}
