document.addEventListener('DOMContentLoaded', () => {
    flatpickr("#task-date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });
});

let pendingTasks = document.getElementById("pending-tasks");
let completedTasks = document.getElementById("completed-tasks");

function addTask() {
    let taskInput = document.getElementById("new-task");
    let taskText = taskInput.value.trim();
    let taskDate = document.getElementById("task-date").value;

    if (taskText === "" || taskDate === "") return;

    let taskItem = createTaskElement(taskText, taskDate);
    pendingTasks.appendChild(taskItem);

    taskInput.value = "";
    document.getElementById("task-date").value = "";
}

function createTaskElement(taskText, taskDate) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = `${taskText} (Due: ${taskDate})`;
    li.appendChild(span);

    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => editTask(li, span));
    buttonsDiv.appendChild(editButton);

    let completeButton = document.createElement("button");
    completeButton.innerText = "Complete";
    completeButton.addEventListener("click", () => completeTask(li));
    buttonsDiv.appendChild(completeButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteTask(li));
    buttonsDiv.appendChild(deleteButton);

    li.appendChild(buttonsDiv);

    return li;
}

function editTask(taskItem, taskTextSpan) {
    let newTaskText = prompt("Edit your task:", taskTextSpan.innerText.split(" (Due:")[0]);

    if (newTaskText === null || newTaskText.trim() === "") return;

    let newTaskDate = prompt("Edit your due date (YYYY-MM-DD HH:MM):", taskTextSpan.innerText.split("Due: ")[1].slice(0, -1));

    if (newTaskDate === null || newTaskDate.trim() === "") return;

    taskTextSpan.innerText = `${newTaskText.trim()} (Due: ${newTaskDate.trim()})`;
}

function completeTask(taskItem) {
    taskItem.classList.add("completed");
    let taskTextSpan = taskItem.querySelector("span");
    taskTextSpan.innerText += ` (Completed: ${new Date().toLocaleString()})`;

    // Move the task to the Completed Tasks section
    pendingTasks.removeChild(taskItem);
    completedTasks.appendChild(taskItem);

    let buttonsDiv = taskItem.querySelector(".task-buttons");
    buttonsDiv.querySelector(".edit").remove();
    buttonsDiv.querySelector("button.complete").remove();
}

function deleteTask(taskItem) {
    taskItem.remove();
}
