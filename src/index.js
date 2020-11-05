import './index.scss';
import del from "./images/feet.png";

const form = document.querySelector('.todo__form');
const input = form.querySelector('.todo__input');
const taskList = document.querySelector('.todo__tasks');
const clearButton = document.querySelector('.todo__clear');


let tasksArr = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  const data = JSON.parse(localStorage.getItem("tasks"));

const setValue = (text) => {
tasksArr.push(text);
localStorage.setItem("tasks", JSON.stringify(tasksArr));
createTask(text, tasksArr.length -1);
}

const createTask = (text, index) => {
const newTask = document.createElement('li');
newTask.classList.add('todo__task');
taskList.appendChild(newTask);

const newTaskText = document.createElement('p');
newTaskText.classList.add('todo__task-text');
newTaskText.textContent = text;
newTask.appendChild(newTaskText);

const deleteIcon = document.createElement('img');
deleteIcon.classList.add("todo__delete");
deleteIcon.setAttribute('src', del);
deleteIcon.setAttribute('id', index);
newTask.appendChild(deleteIcon);
}

const handleSubmit = (event, text) => {
event.preventDefault();
setValue(text);
input.value = '';
}


data.forEach((task, i) => {
createTask(task, i);
})

const clearAll = () => {
  input.value = '';
  localStorage.clear();
  tasksArr = [];
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

}

const deleteTask = (task, index) => {
  taskList.removeChild(task);

  const newTaskArr = tasksArr.filter((task, i) => i != index);
  localStorage.setItem("tasks", JSON.stringify(newTaskArr));

}

form.addEventListener('submit', (event) => {
 handleSubmit(event, input.value);
})


taskList.addEventListener('click', (event) =>{
  let index = event.target.getAttribute("id");
  const currentTask = event.target.closest('.todo__task');
  if(event.target.classList.contains('todo__delete')){
    deleteTask(currentTask, index);
  }
} );

clearButton.addEventListener('click', clearAll);