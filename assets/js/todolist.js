const todoForm = document.querySelector(".form_group");
const todoInput = todoForm.querySelector(".todo_input");
const todoListUI = document.querySelector(".todo");
const allCheckedBox = document.getElementById("checkboxAll"); // 모두선택 체크박스
const allDeleteBtn = document.querySelector(".all_delete"); // 선택된 리스트 모두 삭제 버튼
const TODOLIST_KEY = "todolist";
const CHECKED = "checked";
const SHOW = "show";
let spaceToDo = [];

// 로컬스토리지 안에 key값을 저장한다. ( stringify : 오브젝트를 문자형으로 변환한다. )
function saveToDo() {
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(spaceToDo));
}

// LIST COUNT (총갯수, 선택된 갯수, "allDeleteBtn"버튼 활성 : 비활성)
const todoCount = function () {
  const todoTotal = document.querySelector(".total");
  const totalCount = todoTotal.querySelector(".count");
  const chkLength = document.querySelector(".chk");
  const seleteCount = chkLength.querySelector(".count");

  let count = 0;

  spaceToDo.filter((todo) => {
    // checked가 true인 갯수.
    if (todo.checked === true) {
      count += 1;
    }
  });

  // checked가 true인 갯수가 0개 이상일 때 "allDeleteBtn" 활성화
  if (count > 0) {
    allDeleteBtn.disabled = false;
  }
  if (count === 0) {
    allDeleteBtn.disabled = true;
  }

  // 전체 갯수와 선택된 갯수가 같을 때, 'allCheckedBox' checked가 true, 아니면 false
  if (spaceToDo.length === count) {
    allCheckedBox.checked = true;
  } else {
    allCheckedBox.checked = false;
  }

  totalCount.innerHTML = `${spaceToDo.length}`;
  seleteCount.innerHTML = `${count}`;

  totalCount.append();
  seleteCount.append();
};

// 선택한리스트 모두삭제 버튼 클릭시
const todoReallyAllDelete = function (e) {
  console.log(e);
  const reallydelete = confirm(
    "정말 선택한 모든 리스트들을 삭제하시겠습니까 ?"
  );

  if (reallydelete) {
    console.log("응 진짜 삭제");
    deleteToDo(e);
  } else {
    console.log("아니야 삭제 안할래");
  }
};

// 전체선택 버튼 클릭 시
const todoallChecked = function (e) {
  let allChkState = e.target.checked;

  let todoli = todoListUI.querySelectorAll(".list");
  let todoinput = todoListUI.querySelectorAll(".checkbox");

  spaceToDo.filter((todo) => {
    allChkState === true ? (todo.checked = true) : (todo.checked = false);
  });

  // 해당 대상 li, input에 조건문으로 style변화와 checkebox true & false
  for (let i = 0; i < todoli.length; i++) {
    if (allChkState === true) {
      todoli[i].classList.add(CHECKED);
      todoinput[i].checked = true;
    } else {
      todoli[i].classList.remove(CHECKED);
      todoinput[i].checked = false;
    }
  }

  saveToDo();
  todoCount();
};

// list 갯수가 0일 경우
const listZero = function () {
  const emptyText = document.querySelector(".todo_empty");
  // list의 값이 0일 경우 : 모두선택 버튼 활성화 & 비활성화, empty
  if (spaceToDo !== null) {
    emptyText.classList.add(SHOW);
    allCheckedBox.disabled = false;
  }
  if (spaceToDo.length === 0) {
    emptyText.classList.remove(SHOW);
    allCheckedBox.disabled = true;
    allDeleteBtn.disabled = true;
  }
  saveToDo();
};

// 리스트 삭제 버튼 클릭
const deleteToDo = function (e) {
  const todoli = e.target.parentElement;

  const todoOneDelete = spaceToDo.filter((todo) => {
    return todo.id !== parseInt(todoli.id);
  });
  spaceToDo = todoOneDelete;

  todoli.remove();
  saveToDo();
  listZero();
  todoCount();
};

// checked가 되었을 때, checked상태 로컬스토리지에 반영.
const todoChecked = function (e) {
  const todoinput = e.target;
  const todoli = todoinput.parentElement.parentElement;

  spaceToDo.filter((todo) => {
    // li의 id와 input의 id를 비교해 로컬스토리지에 checked를 true, false 반영시켜주기.
    if (todo.id === parseInt(todoli.id)) todo.checked = !todo.checked;

    todoinput.checked === true
      ? todoli.classList.add(CHECKED)
      : todoli.classList.remove(CHECKED);
  });

  saveToDo();
  todoCount();
};

// 전체적인 list생성이 화면에 보여지는 부분.
const drawingTodo = function (newToDo) {
  const todoList = document.createElement("li");
  const todoLabel = document.createElement("label");
  const todoCheckBox = document.createElement("input");
  const deleteBtn = document.createElement("button");

  const { id, text, checked } = newToDo;

  todoList.setAttribute("id", id);
  todoCheckBox.setAttribute("type", "checkbox");
  todoCheckBox.setAttribute("name", "checkbox");
  todoCheckBox.setAttribute("class", "checkbox");
  todoCheckBox.checked = checked;
  todoLabel.textContent = text;
  deleteBtn.textContent = "삭제";

  todoList.classList.add("list");
  deleteBtn.classList.add("delete_btn");

  todoListUI.prepend(todoList);
  todoList.appendChild(todoLabel);
  todoList.appendChild(deleteBtn);
  todoLabel.prepend(todoCheckBox);

  todoCheckBox.checked === true
    ? todoList.classList.add(CHECKED)
    : todoList.classList.remove(CHECKED);

  listZero();
  todoCount();
  deleteBtn.addEventListener("click", deleteToDo);
};

// list 내부를 관리하는 몸통
const todoSubmitHandler = function (e) {
  e.preventDefault();
  const InputValue = todoInput.value;
  todoInput.value = "";

  const newToDoObj = {
    id: Date.now(),
    text: InputValue,
    checked: false,
  };
  // 로컬스토리지에 배열안에 객체를 넣어준다.
  spaceToDo.push(newToDoObj);

  saveToDo();
  drawingTodo(newToDoObj);
};

const loadToDoList = function () {
  // 로컬스토리지 안에 있는 TODOLIST_KEY를 읽어온다. (parse : 문자열을 오브젝트로 변환시킨다.)
  const getToDo = JSON.parse(localStorage.getItem(TODOLIST_KEY));

  // 로컬스토리지 안에 값이 null이 아닐때 drawingTodo함수를 실행시킨다.
  if (getToDo !== null) {
    spaceToDo = getToDo; // 배열안에 변수를 할당 해준다.
    getToDo.forEach(drawingTodo);
    console.log(getToDo);
  }
};

const init = function () {
  loadToDoList();
  todoForm.addEventListener("submit", todoSubmitHandler);
  todoListUI.addEventListener("change", todoChecked);
  allCheckedBox.addEventListener("click", todoallChecked);
  allDeleteBtn.addEventListener("click", todoReallyAllDelete);
};

init();
