// ---------------- ELEMENT --------------- //
var todoList = document.getElementById('todos');
var form = document.getElementById('form');
var input = document.getElementById('input');
var deleteBtn = document.getElementById('delete-button');
// ---------------- ELEMENT --------------- //

// ---------------- TEST DATA --------------- //
// var todo1 = new makeTodo(new Date().getTime() + 1, 'Ăn sáng', false);
// var todo2 = new makeTodo(new Date().getTime() + 2, 'Ăn trưa', false);
// var todo3 = new makeTodo(new Date().getTime() + 3, 'Ăn tối', true);
// ---------------- TEST DATA --------------- //

// ---------------- INIT --------------- //
var todos = [];
input.focus();
readDataFromLocalstorage();
renderTodoList();
// ---------------- INIT --------------- //

function makeTodo(id, name, completed) {
  this.id = id;
  this.name = name;
  this.completed = completed;
}

function onTodoDelete(todoId) {
  var newTodo = [];
  for (var todo of todos) {
    if (todo.id !== parseInt(todoId)) {
      newTodo.push(todo);
    }
  }

  todos = newTodo;
  renderTodoList();

  saveDataToLocalstorage();
}

function createTodoItem(todo) {
  var todoName = todo.name;
  var todoId = todo.id;
  var todoCompleted = todo.completed;

  function onTodoClick(todoElement) {
    todoElement.classList.toggle('done');
  }

  var todoElement = document.createElement('li');
  todoElement.classList.add('todo');

  if (todoCompleted === true) {
    todoElement.classList.add('done');
  }

  todoElement.innerHTML = `
    <span>${todoName}</span>
    <button onClick="onTodoDelete('${todoId}')" >
      <i class="far fa-trash-alt"></i>
    </button>
  `;

  // Add event
  todoElement.addEventListener('click', function () {
    onTodoClick(todoElement);

    todo.completed = !todo.completed;
    saveDataToLocalstorage();
  });

  return todoElement;
}

function renderTodoList() {
  todoList.innerHTML = '';

  for (var i = 0; i < todos.length; i++) {
    var todo = createTodoItem(todos[i]);
    todoList.appendChild(todo);
  }

  if (todos.length === 0) {
    deleteBtn.style.display = 'none';
  } else {
    deleteBtn.style.display = 'block';
  }
}

// ---------------- EVENT LISTENERS --------------- //
form.addEventListener('submit', function (event) {
  event.preventDefault();

  var todoName = input.value;
  if (todoName.trim().length > 0) {
    const newTodo = new makeTodo(new Date().getTime(), todoName, false);

    todos.push(newTodo);

    renderTodoList();

    // Clear input
    input.value = '';

    saveDataToLocalstorage();
  }
});

deleteBtn.addEventListener('click', function () {
  todos = [];
  renderTodoList();
  saveDataToLocalstorage();
});
// ---------------- EVENT LISTENERS --------------- //

// ---------------- DATA SAVER --------------- //
function saveDataToLocalstorage() {
  var todoString = JSON.stringify(todos);
  window.localStorage.setItem('todos', todoString);
}

function readDataFromLocalstorage() {
  var jsonData = window.localStorage.getItem('todos');
  if (jsonData === null) {
    todos = [];
  } else {
    todos = JSON.parse(jsonData);
  }
}
// ---------------- DATA SAVER --------------- //
