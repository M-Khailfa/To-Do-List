let input = document.querySelector("input");
let addButton = document.querySelector(".add");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let counterId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

function createTask(taskObj) {
  let task = document.createElement("div");
  task.classList.add("task");
  task.id = taskObj.id;

  let content = document.createElement("div");
  content.classList.add("content");
  content.textContent = taskObj.title;

  let button = document.createElement("button");
  button.classList.add("delete");
  button.textContent = "Delete";
  button.onclick = function () {
    tasks = tasks.filter(function (element) {
      return element.id !== Number(button.parentElement.id);
    });
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    button.parentElement.remove();
  };

  task.append(content, button);
  document.querySelector(".container").append(task);
}

addButton.onclick = function () {
  let value = input.value;
  if (value === "") return;
  input.value = ""; 
  value = value.trim();
  
  let taskObj = {id: counterId++, title: value}
  tasks.push(taskObj);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  createTask(taskObj);
};

tasks.forEach(task => createTask(task));

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let value = input.value;
    if (value === "") return;
    input.value = ""; 
    value = value.trim();
    let taskObj = {id: counterId++, title: value}
    tasks.push(taskObj);
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(taskObj)
  }
});