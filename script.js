let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const dateInput = document.getElementById("due-date");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("task-list");

// Disable past dates
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const taskText = document.createElement("span");
    taskText.textContent = `${task.text} (Due: ${task.due || "N/A"}, Priority: ${task.priority})`;
    taskText.style.flex = 1;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const controls = document.createElement("div");
    controls.className = "task-controls";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(controls);

    taskList.appendChild(li);
  });
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = input.value.trim();
  const due = dateInput.value;
  const priority = priorityInput.value;

  if (!text) {
    alert("Task cannot be empty.");
    return;
  }

  tasks.push({ text, completed: false, due, priority });
  form.reset();
  saveTasks();
  renderTasks();
});

renderTasks();
