// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task on button click
addBtn.addEventListener("click", addTask);

// Add task on Enter key
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);
    taskInput.value = "";
}

// Create task HTML element
function createTaskElement(taskText, completed = false) {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");

    li.textContent = taskText;

    // Toggle complete on click
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update localStorage after changes
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

