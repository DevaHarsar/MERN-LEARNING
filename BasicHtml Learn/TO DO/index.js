function addTask() {
  let taskInput = document.getElementById("taskInput");
  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  let taskInputValue = taskInput.value;

  const li = document.createElement("li");
  li.textContent = taskInputValue;
  li.classList.add("task-item");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    let task = localStorage.getItem("task");
    task = JSON.parse(task) || [];
    const index = task.indexOf(taskInputValue);
    if (index > -1) {
      task.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(task));
    }
  });

  li.appendChild(deleteBtn);

  let task = localStorage.getItem("task");
  task = JSON.parse(task) || [];
  task.push(taskInputValue);
  localStorage.setItem("task", JSON.stringify(task));
  console.log("Task saved to localStorage:", localStorage.getItem("task"));

  document.getElementById("task").appendChild(li);

  taskInput.value = "";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  } else if (event.key === "Backspace" && document.activeElement.id !== "taskInput") {
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
  let task = JSON.parse(localStorage.getItem("task")) || [];
  task.forEach((taskText) => {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.classList.add("task-item");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      li.remove();
      let task = localStorage.getItem("task");
      task = JSON.parse(task) || [];
      const index = task.indexOf(taskText);
      if (index > -1) {
        console.log("Removing task:", task);
        task.splice(index, 1);
        localStorage.setItem("task", JSON.stringify(task));
        console.log("Updated task list in localStorage:", localStorage.getItem("task"));
      }
    });
    document.getElementById("task").appendChild(li);

  });
};
