// 등록 버튼 누를 때 실행되는 함수
function addTodo() {
  const todoInput = document.getElementById("todo-input-text"); 
  if (!todoInput || todoInput.value.trim() === "") return; 

  const text = todoInput.value; 

  // [상황 A] 날짜가 선택되어 있으면 -> 달력 일정 바로 등록
  if (selectedDateKey) {
    if (!eventsData[selectedDateKey]) {
      eventsData[selectedDateKey] = [];
    }
    eventsData[selectedDateKey].push(text); 
    renderCalendar(); // 달력 새로고침하여 바 표시
    todoInput.value = ""; 
    return; 
  }

  // [상황 B] 날짜 선택이 없으면 -> 우측 투두 리스트에 등록
  const todoListUl = document.getElementById("todo-list"); 
  if (!todoListUl) return;

  const li = document.createElement("li");
  const todoId = "todo-" + Date.now(); 
  
  li.innerHTML = `
    <div>
      <input type="checkbox" id="${todoId}">
      <label for="${todoId}">${text}</label>
    </div>
    <button type="button" class="delete-btn">❌</button>
  `;
  
  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function(event) {
    event.stopPropagation(); 
    li.remove(); 
  });

  todoListUl.appendChild(li);
  todoInput.value = ""; 
}

// 투두 탭 전환 함수
function switchTodoTab(tabType) {
  currentTab = tabType;
  selectedDateKey = null; // 탭을 바꾸면 날짜 선택 초기화
  
  // 버튼 active 스타일 토글
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.getAttribute('onclick').includes(tabType)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const data = todoData[tabType];
  
  const todoLabel = document.getElementById('todo-label');
  if (todoLabel) {
    todoLabel.innerText = data.title; 
  }

  const todoInputText = document.getElementById('todo-input-text');
  if (todoInputText) {
    todoInputText.placeholder = data.placeholder;
  }

  const todoListUl = document.getElementById('todo-list');
  if (todoListUl) {
    todoListUl.innerHTML = ""; 

    data.tasks.forEach((taskText, index) => {
      const li = document.createElement('li');
      const todoId = `${tabType}-todo${index}`;
      
      li.innerHTML = `
        <div>
          <input type="checkbox" id="${todoId}">
          <label for="${todoId}">${taskText}</label>
        </div>
        <button type="button" class="delete-btn">❌</button>
      `;
      
      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function() {
        li.remove(); 
      });

      todoListUl.appendChild(li);
    });
  }
}


switchTodoTab('daily');