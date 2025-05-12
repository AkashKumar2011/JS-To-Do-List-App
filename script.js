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

    // const taskText = document.createElement("span");
    // taskText.textContent = `${task.text} Due: ${task.due || "N/A"}, Priority: ${task.priority} `;
    // taskText.style.flex = 1;

    // create wrapper for each task
    const taskDiv = document.createElement("div"); 
    taskDiv.classList.add("task");

    const taskText1 = document.createElement("span");
    const taskText2 = document.createElement("span");
    const taskText3 = document.createElement("span");

    taskText1.textContent = `Task: ${task.text}`;
    taskText2.textContent = `Due: ${task.due || "N/A"}`;
    taskText3.textContent = `Priority: ${task.priority}`;

    // Append spans to the task div
    taskDiv.appendChild(taskText1);
    taskDiv.appendChild(taskText2);
    taskDiv.appendChild(taskText3);
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
        
    const checkBoxTxt = document.createElement("span");
    checkBoxTxt.className = "checkBox-txt";
    checkBoxTxt.textContent = "Completed ✔";
    checkBoxTxt.style.display = task.completed ? "block" : "none";
    taskDiv.appendChild(checkbox);

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
    li.appendChild(taskDiv);
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
