// 요소 선택 및 배열 선언
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoDay = document.getElementById("todo-day");

let todoArr = [];

const now = new Date();

let todoNow = setInterval(function () {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDay();

  todoDay.textContent = `${year}년 ${month}월 ${day}일`;
}, 1000);

// 로컬스토리지에 저장
function saveTodos() {
  const todoString = JSON.stringify(todoArr);
  localStorage.setItem("myTodos", todoString);
}

// 로컬스토리지에서 불러오기
function loadTodos() {
  const myTodos = localStorage.getItem("myTodos");
  if (myTodos !== null) {
    todoArr = JSON.parse(myTodos);
    displayTodos();
  }
}
loadTodos();

// 할 일 삭제하기
function handleTodoDelBtnClick(clickedId) {
  todoArr = todoArr.filter(function (aTodo) {
    return aTodo.todoId !== clickedId;
  });
  displayTodos();
  saveTodos();
}

// 할일 수정하기
function handleTodoItemClick(clickedId) {
  todoArr = todoArr.map(function (aTodo) {
    if (aTodo.todoId === clickedId) {
      return {
        ...aTodo,
        todoDone: !aTodo.todoDone,
      };
    } else {
      return aTodo;
    }
  });
  displayTodos();
  saveTodos();
}

// 할일 보여주기(표시하기)
function displayTodos() {
  todoList.innerHTML = "";
  todoArr.forEach(function (aTodo) {
    const todoItem = document.createElement("li");
    const todoDelBtn = document.createElement("button");
    todoDelBtn.textContent = "🗑️";
    todoItem.textContent = aTodo.todoText;
    todoItem.title = "할 일이 완료되면 클릭해주세요";
    if (aTodo.todoDone) {
      todoItem.classList.add("done");
    } else {
      todoItem.classList.add("yet");
    }
    todoDelBtn.title = "클릭하면 삭제됩니다";

    todoItem.addEventListener("click", function () {
      handleTodoItemClick(aTodo.todoId);
    });

    todoDelBtn.addEventListener("click", function () {
      handleTodoDelBtnClick(aTodo.todoId);
    });

    todoDelBtn.classList.add("delbtn");
    todoItem.appendChild(todoDelBtn);
    todoList.appendChild(todoItem);
  });
}

// 할일 추가하기
todoForm.addEventListener("submit", function (e) {
  // 기존 submit기능 차단 - 제출후 자동 새로고침
  e.preventDefault();
  //객체로 할일 추가
  const toBeAdd = {
    todoText: todoForm.todo.value,
    todoId: new Date().getTime(),
    todoDone: false,
  };

  //작성이 끝난후 todo란 공백으로 만들기
  todoForm.todo.value = "";
  //todo 배열에 추가하기
  todoArr.push(toBeAdd);
  //추가한 할일 표시하기
  displayTodos();
  saveTodos();
});
