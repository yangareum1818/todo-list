# `todo-list`

1. 코드리뷰
2. 알게된점<br/>
  2-1. 재할당 let, const<br/>
  2-2. 스코프의 사각지대 TDZ<br/>
  2-3. 실행컨텍스트<br/>
  2-4. 이벤트리스너 버블링, 캡쳐링, 위임<br/>
  2-5. 함수 ( 타겟잡기 )
3. 작업하면서 의문점
4. 어려웠던 점
5. 리펙토링에 대해서
6. 이 후 공부의 방향
7. 느낀점
8. 순서도

## 1. 코드리뷰

코드에 주석으로 추가하였다.

## 2. 알게된 점

>이론적으로 기본개념, 동작원리를 공부했었는데 직접 코드로 짜보면서 이론으로 공부했던 것 보다 조금 더 많이 코드의 흐름을 알게 되었고, 확실히 내가 짠 코드를 보면서 어떤 점을 이해했었는지, 부족 했던 내용인지 캐치할 수 있었다.<br/>
알게된 점은 대부분 **벨로그**에 정리를 해서 업로드를 해놓았다.<br/>
겪었던 상황만 적어보도록 하겠다.

<br/>

### 2-1. 재할당 `let`, `const`

```
강의나 이론을 공부할 때, 가장 기초적인 것이였는데
막상 실제로 코드를 짜면서 가지고 있는 변수를 어디에 대입해주거나 할당해주어야할 부분이 있었다.
재사용할 생각을 전혀 하지 못하고 며칠을 날려먹다가 깨달은 점이었다.
그 부분은 `drawingTodo`함수 부분의 `id`, `checked`였다.

ex)
`checked`된 부분을 해당타겟의 값과 가지고 있는 값을 비교해 `checked`를 할것인지, 아니면`id`를 추가해 두 개의 `id`를 비교해서 삭제를 할 것인지 이런 경우의 상황이였다.
( 지금 그 부분은 `checked`로 해결했기에 추가로 만들었던 `input`에 `id`값을 준 코드는 지웠다. )
```

<br/>

### 2-2. 스코프의 `사각지대 TDZ`

```
변수 `let`과 `const`에 이어서 적어본다.
이 부분은 만들다가 따로 전역, 지역변수의 사용하는 이유가 궁금해서 찾아보고 공부했다.
TDZ라고도 불리는 사각지대를 찾아서 공부해보고 전역변수, 지역변수의 차이를 알게 된 경우다.
처음에는 변수를 만들 때 아무렇게나 전역, 지역에 남발했던 내 자신이 반성되고 깨달았다.
- 한 함수에서만 해당변수를 사용한다면 `지역변수`를 사용하고,
- 여러 함수에서 해당변수를 사용하려면 `전역변수`를 사용한다.
라는 것을 알게 되었다.
지금은 이 정도 알게 되었지만, 나중에 변수만 따로 모아두고 그 변수를 뽑아쓰는 그런 방법도 있지 않을까 ? 싶다.
```

<br/>

### 2-3. `실행컨텍스트`

```
처음에 작동이 이상하게 되길래 답답한 마음에 함수를 여기저기 호출을 하고 다녔다.
당시에는 작동이 잘 되었다 생각하고, 기능을 추가하는 부분에서 결국 고장이 나버리고 말았다.
실행컨텍스트 또한 이론적으로는 너무 자세하게 이해했다. ( 하나의 스택을 가진다 라는 것을.. )
하지만, 실전에서 제대로 발휘하지 못했다.
마음을 가다듬고 다시 한번 천천히 코드를 바라보면서 또 디버깅을 해보면서 함수의 호출이 이 시점에 해도 괜찮은지, 아니면 비효율적으로 계속 실행되는지를 파악해가면서 흐름을 이해했다.
깨달은 것은 코드의 흐름을 파악 그 결론은 ! 디버깅 !
가장 중요한 부분이라고 생각한다.
```

<br/>

### 2-4. 이벤트리스너 `버블링 캡쳐링 위임`

```
알게된 이후 소감부터 말하자면, 기본개념부터 확실히 이해하자.
처음 이 부분 때문에, 많은 시간을 쏟았다.
각 list 즉, li에 input을 클릭했을 때의 생기는 변화를 줘야할 때, 타겟을 찾는 거부터 막혔고 그 이후 줄줄이소시지 마냥 의문점만 가득했다.
아는 개발자 분 덕분에 이벤트리스너를 공부해보라고 해주셔서 공부했고, ul에 이벤트를 주고 버블링을 이용해 위임해서 문제를 해결했다.
이번 경험을 통해 정말 확실히 알게 된 것 같아서 머릿속에 박혀있을 것 같다.

그리고 이벤트 리스너를 공부하면서 setAttribute, getAttribute에 대해서도 추가적으로 공부를 했다.
```

[이벤트리스너 정리](https://velog.io/@yangareum1818/JS-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B2%84%EB%B8%94%EB%A7%81-%EC%BA%A1%EC%B3%90%EB%A7%81-%EC%9C%84%EC%9E%84)<br/>
<br/>

### 2-5. 함수( 매개변수와 인자, `타겟잡기` )

```
이 부분은 밑에 어려웠던 점에서 이야기 할텐데, 내가 제일 어려워 하는 부분인 것을 알게 되었다.
선택한 리스트 전체삭제 버튼( 타겟 )을 클릭했을 때,
레이아웃 구조상 타겟인 li를 찾기 위해 형제, 자식 찾는 함수를 사용하기에 너무 비효율적인 생각이 든다.
그래서 어떻게 해야되나 너무 많은 고민을 했다.

로컬스토리지에서는 checked가 true인 list들은 해당 배열에 필터링을 해서 삭제가 되었지만, 화면에는 삭제가 되지 않았기 때문에 원인은 찾았지만 방법이 너무 생각이 안났다.
원인은 결국 타겟이 문제인 것은 나는 알고 있다.

setAttribute, getAttribute를 지금 고민 중에 있고, 이 문제를 해결하면 더이상 기능은 추가 하지 않고 마무리할 예정이고, 리펙토링을 해나아갈 생각이다.
```

<br/>

<hr/>
<br/>

## 3. 작업하면서 `의문점`

코드를 먼저 보면,

```javascript
// checked가 되었을 때, checked상태 로컬스토리지에 반영.
const todoChecked = function (e) {
  const todoinput = e.target;
  const todoli = todoinput.parentElement.parentElement;

  // li의 id와 input의 id를 비교해 로컬스토리지에 checked를 true, false 반영시켜주기.
  spaceToDo.filter((todo) => {
    if (todo.id === parseInt(todoli.id)) todo.checked = !todo.checked;
    
    // !! 해당 의문점 코드 !!
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

  // !! 문제의 두번 작성 코드 !!
  todoCheckBox.checked === true
    ? todoList.classList.add(CHECKED)
    : todoList.classList.remove(CHECKED);

  listZero();
  todoCount();
  deleteBtn.addEventListener("click", deleteToDo);
};
```

```
로컬스토리지 내부에서 작업과 화면에 보여지는 그 외부에서의 작업.
결국 같은 조건이지만 타겟만 다를 뿐 동일한 조건문이 어느 함수에서 사용되느냐만 다를 뿐 2번 쓰여진다.

이것을 해결 점은 무엇일까? 내가 무엇을 놓치고 있는 것일까 ?
```

<br/>

<hr/>
<br/>

## 4. `어려웠던 점`

>어려웠던 점을 이야기하자면, 사실 DOM을 가지고 노는건 괜찮았는데, 그 외 자바스크립트 모두 어려웠다.<br/>
지금 생각나는 부분에서는,

1. 반복문 - 반복문을 응용해 count라는 변수를 만들어 추가해주는 그런 반복문이 너무 어려웠다.
2. 조건문 - 조건문에서는 1차원적인 조건문은 잘 작성햇지만, 애매한 상황일 경우 무엇을 조건으로 주어야할 지를 결정하는 부분이 헷갈렸다.
3. 타겟잡기 - 타겟을 잡는다는 의미는 결국은 타겟만 다르고 기능은 같은 기능이란 이야기다. `ul`, `li` 내부에서 타겟은 잡을 수 있었지만, 그 밖에 있는 전체선택버튼에서나, 선택한리스트모두삭제버튼의 이벤트리스터를 이용해 함수를 호출할때 `ul`,`li` 내부에서 잡아야하는 타겟을 어떻게 잡아야하는지 많이 헤맸던 것 같다.<br/>
결국 반복문, 조건문을 사용하려면 해당 타겟을 찾아야된다.<br/>

고로 1, 2번을 내가 부족한 이유가 **결론적으로 3번이 부족하기 때문**인 것 같다.

<br/>

<hr/>
<br/>

## 5. `리펙토링`에 대해서

코드의 기능적인 문제는 없지만, 효율적인 부분에서는 문제가 아직은 많다고 생각이된다.<br/>
변수도 전역변수들이 매우 많고, 동일한 기능들도 여러번 사용되고 있다.<br/>
기능을 추가해가면서 점점 코드들이 늘어나는 것을 보았고, 코드를 어떻게 하면 조금 더 효율적으로 만들 수 있을지 고민하게 된다.

    * 리펙토링에 대해서..
    코드를 효율적으로 만들기 위함이지 오로지 코드를 줄이는 것이 리펙토링의 목적은 아니라는 것을 알게되었다.

<br/>

<hr/>
<br/>

## 6. 이 후 공부의 `방향`

사실 공부할 것은 무한대라고 생각한다.<br/>
먼저, 어려웠던 점을 기록해놓은 바탕으로 공부를 하고, 비동기 관련된 공부도 다시 해보려한다.<br/>
오픈 API를 가지고 여러가지 작업물들을 만들어봐야겠다.<br/>

복습한다는 개념으로 다시 비동기에 대해 공부를 해보려고 한다.<br/>

1. 멀티쓰레드와 비동기
2. 비동기 코드구현
3. 콜백함수와 콜백지옥
4. `Promise`, `async await`, `axios`, `fetch`, `ajax` 의 특징과 사용법
5. 그리고 예외 처리 `try &  catch`

<br/>

**기본개념 외 새로 공부할 부분**

1. OOP형식 ( `class` )<br/>
`class`라는 단어 안에 모든 것이 다 들어있다고 생각이 든다.<br/>
프로토타입, 인터페이스, 추상화 등..
2. 모듈화, 패턴 등<br/>
3. `typescript`, `React`.. 등 공부할 것은 많다.

<br/>

**그 외 공부**

```
혼자 독학은 너무 많은 부분에서 힘들다고 생각이 든다.
학원을 알아보고 커리큘럼이나 내가 원하는 수업방식인지를 비교, 분석해보고 원하는 학원을 결정했다.
그래서 코딩테스트를 위해 추가적으로 공부해보려한다.

* 알고리즘, 자료구조
```

<br/>

---

<br/>

## 7. `느낀점`

솔직하게 이 투두리스트을 만드는데 몇 달이 걸렸는데,<br/>
주변 개발자분들에게 너무 하나만 붙잡고 있는 것이 아니냐고 많이 혼났던 부분이긴하다.<br/>

생각했던 기능을 만들었으면, 거기서 끝내고 다른 것을 공부하는 해야한다.<br/>
거기서 왜 계속 추가적인 기능을 만드느냐라는 질문에 머리가 씨게 아팠다.<br/>
완벽했으면 하는 마음, 나의 욕심이란 생각이 들었다.<br/>
그래서 내가 기술기획이 중요하단 생각을 하게된 점이었다. 그래서 순서도 그리는 연습을 공부했고,<br/>
처음에 무턱대고 `input`만 만들어놓고 시작해서 기능을 계속 추가하면서 만들었던 부분이 이 상황에서는 좋지 않은 것인걸 알게되었다.<br/>

그래도 작업물을 만들고나서 느낀 나의 마음은 생각을 계속 연결고리 처럼 이어서 하다 보니, 어떤 것을 공부해야하는지 조금은 알 수 있게 되었다.<br/>
다 만든 기능, 코드에 대해서 유지보수를 생각하게 되었고 그 것이 리펙토링의 중요성이라는 결론을 내렸다.<br/>
이미 만든 코드라도 코드를 계속해서 개선해 나가야된다는 것을 깨달았고,<br/>개선해 나아가려면 어떤 것을 공부 해야하는지를 알 수 있게 되는 시간이 된다.

투두리스트를 만들면서 자바스크립트의 많은 기본개념과 그 외의 것들을 공부했던 것 같다.<br/>
부족한 점은 조금 더 복습하고, 새로 알아야하는 지식을 공부할 것이다.<br/>

그리고 나는 `아키텍처 부분에 관심이 많다는 것`을 알게 되었다.<br/>
( 파일을 분리하고, 공통적인 부분은 모아두고 이런것도 너무 흥미롭다. )<br/>
<br/>
<hr/>
<br/>

## 8. 순서도

처음 시작을 순서도 없이 시작을 했고 하나씩 기능을 추가해 가면서, 그때의 상황에 맞는 계획인 순서를 메모장에 적어가면서 작업을 했다.<br/>
투두리스트를 모두 만든 후, 메모하며 그려간 순서도를 모아서 정리했다.<br/>

```
* 전역변수
  - spaceToDo : 로컬스토리지에 값을 넣기 위해 sapceToDo라는 변수에 배열을 만든다.
  - TODOLIST_KEY : 로컬스토리지에 저장할 키 값이다.
  - todoli : 이벤트리스너의 타겟과 먼 거리에 있을 경우 li를 ul의 자식으로 가져오기위해 만든 변수이다.
  - SHOW, CHECKED : css속성을 이용해 화면에 변화를 주기위해 만든 class이름이다.

* saveToDo() : 로컬스토리지를 생성하기 위해 만든 함수이다.
  - localStorage.setItem함수를 이용해 로컬스토리지를 생성해준다.
  - 첫번째인자는 key값을 두번째인자로는 들어갈 정보들 object를 넣어준다.
  - 객체를 JSON형식의 문자열로 변환해줘야하기 때문에 JSON.stringify함수안에 sapceToDo를 넣어준다.

* init() : 호출되는 이벤트를 한 곳에 모아둔 함수이다.
  - 여러 곳에 흩어져서 호출되는 이벤트들을 한 곳에 모아둔다.
  - 함수의 호출과 스택, 실행컨택스트를 생각했을 때 함수호출이 시작되는 부분이 효율적, 보기에 좋지 않다 생각되어 만들었다.

* loadToDoList() : 생성한 로컬스토리지의 key값을 가져오기위한 함수이다.
  1. JSON형식에서 다시 문자열로 변환해주기 위해 JSON.parse를 사용해 그 값을 담은 변수를 만들어준다.
  ( 변환시켜주는 타겟은 배열안에 obj를 담은 spaceToDo이다. )
  2. 로컬스토리지 값이 null값이 아닐 경우
    2-1. spaceToDo에 변수의 값을 할당해준다.
    2-2. 만든 변수(배열)를 drawingTodo함수를 반복적으로 실행시켜준다.

* todoSumbitHandler() : 리스트의 내부 id, text, checked를 관리 해주는 함수
  - 이벤트 동작을 방지하기 위해 e.preventDefault를 사용한다.
  - 변수를 만들어 input의 value값을 가져온다.
  - 이벤트가 실행되었을 때 input의 값이 빈값이 되도록 ""을 할당해준다.
  - 새 object를 만들어 그 안에 정렬, 비교할 id값과 작성된 리스트를 보여줄 text값, checked로 변화를 주기 위한 checked의 기본값을 지정해준다.
  - 로컬스토리지에 값을 넣기 위해 만든 배열안에 만든 object를 추가해준다. (spaceToDo.push(newTToDoObj))
  - 로컬스토리지에 값을 저장하기위해 saveToDo값호출, list가 보여질 함수에 값을 전달하기위해 drawingTodo(newToDoObj)를 호출해 전달한다.


* drawingTodo() : Input에 리스트를 작성하고 추가버튼 클릭 시 또는 Enter를 쳤을 경우 화면에 리스트가 그려지는 함수 ( ul이 addEventListner에 submit 이벤트가 발생할 경우 )
  - ul안에 li를 추가하고, li안에 label, input, button을 생성해준다.
  - li에는 id, input에는 type, name, class를 Attribute를 생성해준다.
  - input에는 checked, label에는 text, button에는 "삭제"라는 글자를 추가해준다.
  - 먼저 추가해준 리스트가 바닥에 깔리는 게 해준다. ( prepend )
  - input의 checked가 true가 될 경우의 조건도 로컬스토리지가 아닌 현재 화면에 보이게 해준다.
  ( li에 class를 추가해 css속성을 이용해 변화를 준다. )

* todoChecked() : 리스트가 checked에 변화가 있을 경우 
  - checked가 true일 경우
    1. 리스트의 삭제버튼이 생긴다.
    2. 리스트의 Text에 변화가 생긴다.
    - input과 li의 타겟을 변수로 만들어준다.
    - input의 checked가 true일 때 li에 class를 추가해 그에 따른 css속성을 추가한다.
    3. 새로고침을 해도 1, 2번과 checked가 true인 상태가 고정되어야 한다.
    ( 즉, 로컬스토리지 checked에도 변화를 줘야한다.)


* deleteToDo() : 리스트 삭제 버튼 클릭했을 경우 
  1. e로 타겟을 받아온다. (타겟은 버튼)
  2. 버튼의 부모인 li를 잡은 타겟을 변수로 만들어준다.
  3. spaceToDo의 id와 타겟의 id가 같지 않을 경우 타겟인 li를 삭제한다.
  4. 리스트가 삭제되는 부분이기 때문에 현 상황을 동일하게 해줘야하므로 갯수를 나타내는 함수, 로컬스토리지에 저장되는 함수를 호출시킨다.

* listZero() : 리스트 갯수가 0일 경우
( 변수로 만들어 준 emptyText : 비어 있을 경우 보여 질 Text )
  - 리스트 갯수가 0이 아닐경우
    1. 변수인 SHOW안에 들어있는 문자열 "show"를 class에서 추가해 css속성인 display:block으로 만들어준다.
    2. 모두선택, 해제 checkBox를 활성화로 변경해준다.
  - 리스트 갯수가 0일 경우
    1. 변수인 SHOW안에 들어있는 문자열 "show"를 class에서 제거해 css속성인 display:none으로 만들어준다.
    2. 모두선택,해제 checkBox와 선택된리스트모두삭제 버튼을 비활성화로 변경해준다.

* todoCount() : 총 갯수, 선택된 갯수를 나타내는 함수
  1. 총 갯수 : spaceToDo.length | 선택된 리스트 갯수 : count ( 화면에 뿌려주기 )
  2. 선택된 리스트 갯수는 newToDo를 담은 spaceToDo에서 checked가 true로 변경될 때 count라는 변수에 1을 증가시켜준다.
  3. 선택된 리스트 갯수가 0일 경우, 0보다 클 경우
  ( 선택된 리스트 모두 삭제 버튼 : allDeleteBtn이 활성화 또는 비활성화 (disabled = true || false) )
  4. 총 갯수와 선택된 리스트 갯수가 같을 경우, 모두선택/해제인 Input의 checked가 true이고 아닐 때 false

* todoallChecked() : 전체선택 / 해제 버튼을 클릭했을 경우
  1. 모두선택("allCheckedBox")클릭시 모든 list의 checked가 "true & false"
  2-1. ( 'allChkState'가 true일 때, 새로고침 시 checked상태 풀림 ) 즉, 새로고침해도 고정되어야함.
  totalCount === seleteCount같을 때 'allChkState'checked (true) 아니면, (false);
  2-2. ( 'allChkState'가 true일 때, 새로고침 시 모든 list가 true됌 ) 즉, 새로고침 안한상태에서도 바뀌어야함.
  2-3. 선택된 리스트 갯수 변화.

* todoReallyAllDelete() : 선택된 리스트 모두 삭제를 클릭했을 경우
  1. confirm을 이용해 예 / 아니요(취소) 만들기
  1-1. ( 진행 중 )예 => 선택된 list모두 삭제
  ( 로컬스토리지 : list중 checked가 true인 것들을 id값을 비교해 모두 삭제해준다.
  화면 : for문을 이용해 className이 "list checked"인 것이면 remove()
  )
  1-1-1. 총갯수, 선택된리스트갯수 모두 0으로 리셋
  1-2. 아니요 => confirm창 닫기
```

### **추가 또는 개선해야할 부분**

* 선택된 리스트는 `checked`된 리스트들끼리 밑으로 정렬되기<br/>
( `id`값을 이용해 `sort`함수로 정렬. `checked` === `true`인 리스트, `checked` === `false`인 리스트 )
* 리팩토링
  1. 버튼활성화,비활성화 되는 경우
  2. 동일한 함수가 여러번 사용되는 경우 ( `filter` 사용부분 )
* 모듈화 해보기
