function addTask() {
  let taskInput = document.getElementById("taskInput");
  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  let taskInputValue = taskInput.value;

  const li = document.createElement("li");
  li.classList.add("task-item");

  const taskContent = document.createElement("span");
  taskContent.textContent = taskInputValue;
  taskContent.classList.add("task-content");

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", () => {
    const newTask = prompt("Enter new task:", taskContent.textContent);
    if (newTask && newTask.trim() !== "") {
      taskContent.textContent = newTask;
      let tasks = JSON.parse(localStorage.getItem("task")) || [];
      const index = tasks.indexOf(taskInputValue);
      if (index > -1) {
        tasks[index] = newTask;
        taskInputValue = newTask;
        localStorage.setItem("task", JSON.stringify(tasks));
      }
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    let tasks = JSON.parse(localStorage.getItem("task")) || [];
    const index = tasks.indexOf(taskInputValue);
    if (index > -1) {
      tasks.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(tasks));
    }
  });

  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(deleteBtn);
  li.appendChild(taskContent);
  li.appendChild(buttonGroup);

  let tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.push(taskInputValue);
  localStorage.setItem("task", JSON.stringify(tasks));

  document.getElementById("task").appendChild(li);
  taskInput.value = "";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  } else if (
    event.key === "Backspace" &&
    document.activeElement.id !== "taskInput"
  ) {
    console.log(document.activeElement);
    event.preventDefault();
    const taskList = document.getElementById("task");
    if (taskList.lastChild) {
      taskList.removeChild(taskList.lastChild);
      let task = localStorage.getItem("task");
      task = JSON.parse(task) || [];
      task.pop();
      localStorage.setItem("task", JSON.stringify(task));
    }
  }
});

window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.forEach((taskText) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;
    taskContent.classList.add("task-content");
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => {
      const newTask = prompt("Enter new task:", taskContent.textContent);
      if (newTask && newTask.trim() !== "") {
        taskContent.textContent = newTask;
        let allTasks = JSON.parse(localStorage.getItem("task")) || [];
        const index = allTasks.indexOf(taskText);
        if (index > -1) {
          allTasks[index] = newTask;
          localStorage.setItem("task", JSON.stringify(allTasks));
        }
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      li.remove();
      let allTasks = JSON.parse(localStorage.getItem("task")) || [];
      const index = allTasks.indexOf(taskText);
      if (index > -1) {
        allTasks.splice(index, 1);
        localStorage.setItem("task", JSON.stringify(allTasks));
      }
    });

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);
    li.appendChild(taskContent);
    li.appendChild(buttonGroup);

    document.getElementById("task").appendChild(li);
  });
};
