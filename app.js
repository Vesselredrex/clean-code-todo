const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  return deleteButton;
};

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = createDeleteButton();

  label.innerText = taskText;
  label.className = 'task';

  checkBox.type = 'checkbox';

  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const moveTaskToList = function (listItem, destinationList, nextHandler) {
  destinationList.appendChild(listItem);
  bindTaskEvents(listItem, nextHandler);
};

const taskCompleted = function () {
  moveTaskToList(this.parentNode, completedTasksHolder, taskIncomplete);
};

const taskIncomplete = function () {
  moveTaskToList(this.parentNode, incompleteTaskHolder, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

const bindExistingTaskEvents = function (taskList, checkboxHandler) {
  for (const taskItem of taskList.children) {
    bindTaskEvents(taskItem, checkboxHandler);
  }
};

bindExistingTaskEvents(incompleteTaskHolder, taskCompleted);
bindExistingTaskEvents(completedTasksHolder, taskIncomplete);
