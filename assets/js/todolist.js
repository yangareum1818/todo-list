const todoForm = document.querySelector(".form_group");
const todoInput = todoForm.querySelector(".todo_input");
const todoListUI = document.querySelector(".todo");
const TODOLIST_KEY = "todolist";
const CHECKED = "checked";
let spaceToDo = [];

// 로컬스토리지 안에 key값을 저장한다. ( stringify : 오브젝트를 문자형으로 변환한다. )
function saveToDo() {
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(spaceToDo));
}
/**
 * 
 * 
function allDelete() {
  const reallyDeletMessage = confirm("정말 모두 삭제 하시겠습니까 ?");
  if (!reallyDeletMessage) {
    return false;
  } else {
    alert("제발 다 삭제 되게 해주세요 !!!!");
    allDelete();
    console.log("삭제 완ㄴ료가 되야해!!!");
  }
  const allList = todoListUI.childNodes;
  allToDo = spaceToDo;
  spaceToDo = spaceToDo.filter((todo) => todo !== allToDo.includes(todo));
  saveToDo();
}

function allChecked(newToDo) {
  // console.log(newToDo);
  const checkedAll = document.querySelectorAll('input[type="checkbox"]');
  // 모두삭제 버튼 활성화 & 비활성화
  if (spaceToDo.length === 0) {
    allCheckedBtn.disabled = true;
  } else {
    allCheckedBtn.disabled = false;
  }
  saveToDo();
  spaceToDo = spaceToDo.includes(
    (check) => check.checked == checkedAll.checked
  );
  allDeleteBtn.addEventListener("click", allDelete);
}

*/
/*
const seleteCount = (e) => {
  const allDeleteBtn = document.querySelector(".all_delete");
  const chkLength = document.querySelector(".chk");

  let count = 0;

  chkLength.innerHTML = `${count}`;
  chkLength.append();

  spaceToDo.filter((todo) => {
    // li의 id와 this의 타겟 id를 비교해 로컬스토리지에 checked를 true, false 반영시켜주기.
    todo.id === parseInt(e.id);
    console.log(e);

    // checked가 true인 갯수.
    if (todo.checked === true) {
      count += 1;
    }

    // 선택한 list가 0일 때, checked가 된 list 모두삭제 버튼 ? 활성 : 비활성
    if (count === 0) {
      allDeleteBtn.disabled = true;
    } else {
      allDeleteBtn.disabled = false;
    }
  });

  saveToDo();
};
 */

// 리스트 삭제
const deleteToDo = function (e) {
  const todoli = e.target.parentElement;
  console.log(todoli);

  const todoOneDelete = spaceToDo.filter((todo) => {
    return todo.id !== parseInt(todoli.id);
  });
  spaceToDo = todoOneDelete;

  todoli.remove();
  saveToDo();
  totalCount();
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
};

// 총 list 갯수
const totalCount = function () {
  const todoTotal = document.querySelector(".total");
  const count = todoTotal.querySelector(".count");
  count.innerHTML = `${spaceToDo.length}`;

  count.append();
};

// list 갯수가 0일 경우
const listZero = function () {
  const allCheckedBtn = document.querySelector(".all_checked");
  const emptyText = document.querySelector(".todo_empty");

  // list의 값이 0일 경우 : 모두선택 버튼 활성화 & 비활성화, empty
  if (spaceToDo.length === 0) {
    emptyText.style = "display : block";
    allCheckedBtn.disabled = true;
  } else {
    emptyText.style = "display : none";
    allCheckedBtn.disabled = false;
  }
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
  totalCount();
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
todoForm.addEventListener("submit", todoSubmitHandler);
todoListUI.addEventListener("change", todoChecked);

// 로컬스토리지 안에 있는 TODOLIST_KEY를 읽어온다. (parse : 문자열을 오브젝트로 변환시킨다.)
const getToDo = JSON.parse(localStorage.getItem(TODOLIST_KEY));

// 로컬스토리지 안에 값이 null이 아닐때 drawingTodo함수를 실행시킨다.
if (getToDo !== null) {
  spaceToDo = getToDo; // 배열안에 변수를 할당 해준다.
  getToDo.forEach(drawingTodo);
  console.log(getToDo);
}
