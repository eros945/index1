const taskInput = document.getElementById("taskText");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const showAllBtn = document.getElementById("showAllBtn");
const showCompletedBtn = document.getElementById("showCompletedBtn");
const showPendingBtn = document.getElementById("showPendingBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = [];

// Добавление задачи
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

// Отображение списка задач
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  taskCount.textContent = `Всего задач: ${tasks.length}`;
}

// Удаление задачи
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Отметить задачу как выполненную
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Панель управления
showAllBtn.addEventListener("click", () => renderTasks("all"));
showCompletedBtn.addEventListener("click", () => renderTasks("completed"));
showPendingBtn.addEventListener("click", () => renderTasks("pending"));
clearAllBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});
