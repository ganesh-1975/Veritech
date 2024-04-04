let tasksAdded = [];

let tasksContainer = document.getElementById('task-container')
let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');

// newQuote();

function displayTasks() {
  let taskList = document.createElement('div');
  taskList.classList.add('task-list');

  let taskToDo = document.createElement('div');
  taskToDo.classList.add('task-todo');

  let taskCheckbox = document.createElement('INPUT');
  taskCheckbox.setAttribute("type", "checkbox");

  let taskText = document.createElement('p');
  taskText.innerHTML = tasksAdded[tasksAdded.length-1];
  console.log(taskText)

  let iconContainer = document.createElement('div');
  iconContainer.classList.add('edit-delete-icons');

  let editIcon = document.createElement('i')
  editIcon.classList.add("fas", "fa-pen");
  editIcon.addEventListener('click', function() {
    editTask(taskText);
  });

  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add("fas", "fa-trash");
  deleteIcon.addEventListener('click', function() {
    taskList.remove();
  });
  
  tasksContainer.appendChild(taskList);
  taskList.appendChild(taskToDo);
  taskToDo.appendChild(taskCheckbox);
  taskToDo.appendChild(taskText);
  taskList.appendChild(iconContainer);
  iconContainer.appendChild(editIcon);
  iconContainer.appendChild(deleteIcon);
}

function writeSomethingAlert(){
  let alert = document.getElementById('writeSomethingAlert');
  alert.classList.remove('writeSomething');
  alert.classList.add('writeSomethingAlert');

  setTimeout(() => {
    alert.classList.remove('writeSomethingAlert');
    alert.classList.add('writeSomething');
  }, 3000);
}

function wordCountAlert(){
  let alert = document.getElementById('wordCountAlert');
  alert.classList.remove('wordCount');
  alert.classList.add('wordCountAlert');

  setTimeout(() => {
    alert.classList.remove('wordCountAlert');
    alert.classList.add('wordCount');
  }, 3000);
}

function addTask() {
  let tasks = document.getElementById("todo-input").value;
  let inputWords = tasks.trim().split(/\s+/);
  let wordCount = inputWords.length;
  if (tasks=="") {
    writeSomethingAlert();
  } 
  else if (wordCount < 3) {
    wordCountAlert();
  }
  
  else {
    tasksAdded.push(tasks);
    displayTasks();
    document.getElementById("todo-input").value = ""; 
    console.log(tasksAdded);
    }
}

function editTask(taskText) {
    let currentText = taskText.innerHTML;
    let editMode = document.createElement('INPUT');
    editMode.setAttribute("type", "text");
    editMode.value = currentText;
    editMode.classList.add('edit-field');

    taskText.replaceWith(editMode);
    editMode.focus();

    editMode.addEventListener('blur', function () {
      let editedText = editMode.value;
      let newText = document.createElement('p');
      newText.innerText = editedText;

      editMode.replaceWith(newText);
    })
}

function changeTheme(color) {
  var colorMap = {
    pink: '#f1b2bd',
    orange: '#f3c8aa',
    green: '#bbe4b8',
    blue: '#b1d6dd',
    purple: '#bdb4d5',
    yellow: '#eee6be'
  };

  document.body.style.backgroundColor = colorMap[color];
}

let getNewQuote = async () => {
  //api for quotes
  // var url = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  var url = "https://api.quotable.io/random"
  // var url = "https://type.fit/api/quotes";
  //fetch data from api
  let response = await fetch(url);
  //convert response to json and store it in quotes array
  let quoteData = await response.json();
  // Generates a random number between 0 and the length of the quotes array
  // let indx = Math.floor(Math.random()*allQuotes.length);
  //Store the quote present at the randomly generated index
  let quote = quoteData.content;
  //Store the author of the respective quote
  let author = quoteData.author;
  if(author ==null)
    {
        author = "Anonymous";
    }
  //function to dynamically display the quote and the author
  quoteText.innerHTML = quote;
  authorText.innerHTML = "- " + author + " -";
}
getNewQuote();