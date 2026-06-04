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
  });

  li.appendChild(deleteBtn);

  document.getElementById("task").appendChild(li);

  taskInput.value = "";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  } else if (event.key === "Backspace") {
    event.preventDefault();
    const taskList = document.getElementById("task");
    if (taskList.lastChild) {
      taskList.removeChild(taskList.lastChild);
    }
  }
});
