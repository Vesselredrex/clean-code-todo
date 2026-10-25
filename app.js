const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const incompleteTasks = document.getElementById('incompleteTasks');
const completedTasks = document.getElementById('completed-tasks');

function createTaskElement(taskText) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  checkbox.type = 'checkbox';
  label.textContent = taskText;
  label.className = 'task';
  editInput.type = 'text';
  editInput.className = 'task';
  editButton.textContent = 'Edit';
  editButton.className = 'edit';
  deleteButton.className = 'delete';
  deleteButton.setAttribute('aria-label', 'Delete task');
  deleteIcon.src = './remove.svg';
  deleteIcon.alt = '';

  deleteButton.append(deleteIcon);
  listItem.append(checkbox, label, editInput, editButton, deleteButton);
  bindTaskEvents(listItem);

  return listItem;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  incompleteTasks.append(createTaskElement(taskText));
  taskInput.value = '';
}

function editTask(listItem) {
  const editInput = listItem.querySelector('input[type="text"]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('button.edit');
  const isEditing = listItem.classList.contains('editMode');

  if (isEditing) {
    const taskText = editInput.value.trim();
    if (!taskText) {
      editInput.focus();
      return;
    }
    label.textContent = taskText;
  } else {
    editInput.value = label.textContent;
  }

  listItem.classList.toggle('editMode');
  editButton.textContent = isEditing ? 'Edit' : 'Save';

  if (!isEditing) editInput.focus();
}

function bindTaskEvents(listItem) {
  const checkbox = listItem.querySelector('input[type="checkbox"]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.addEventListener('click', () => editTask(listItem));
  deleteButton.addEventListener('click', () => listItem.remove());
  checkbox.addEventListener('change', () => {
    const targetList = checkbox.checked ? completedTasks : incompleteTasks;
    targetList.append(listItem);
  });
}

addButton.addEventListener('click', addTask);

for (const listItem of [
  ...incompleteTasks.children,
  ...completedTasks.children,
]) {
  bindTaskEvents(listItem);
}
