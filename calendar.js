// 달력을 그리는 함수
function renderCalendar() {
  calendarDates.innerHTML = ""; 
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 
  currentMonthYear.innerText = `${year}년 ${month + 1}월`;
  
  const firstDayIndex = new Date(year, month, 1).getDay(); 
  const lastDate = new Date(year, month + 1, 0).getDate(); 
  
  // 1일 시작 전 빈칸 채우기
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDiv = document.createElement("div");
    calendarDates.appendChild(emptyDiv);
  }

  // 날짜 채우기
  for (let date = 1; date <= lastDate; date++) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "calendar-date-cell"; 
    
    const dateNum = document.createElement("span");
    dateNum.innerText = date;
    dateDiv.appendChild(dateNum);
    
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    dateDiv.dataset.date = dateKey;

    // [수정] 이미 선택되어 있던 날짜라면 다시 그려질 때도 파란 테두리 유지
    if (dateKey === selectedDateKey) {
      dateDiv.classList.add('selected-active');
    }

    // 일정 바(Bar) 출력
    if (eventsData[dateKey]) {
      eventsData[dateKey].forEach(eventText => {
        const bar = document.createElement("div");
        bar.className = "calendar-event-bar";
        bar.innerText = eventText;
        dateDiv.appendChild(bar);
      });
    }

    // 클릭 이벤트
    dateDiv.addEventListener("click", function() {
      selectDate(dateKey);
    });

    calendarDates.appendChild(dateDiv);
  }
}

// 날짜 클릭 시 선택 효과 및 하단 라벨 변경
function selectDate(dateKey) {
  selectedDateKey = dateKey;
  
  document.querySelectorAll('.calendar-dates > div').forEach(cell => {
    cell.classList.remove('selected-active');
  });
  
  const clickedCell = document.querySelector(`[data-date="${dateKey}"]`);
  if (clickedCell) clickedCell.classList.add('selected-active');

  const todoLabel = document.getElementById('todo-label');
  if (todoLabel) {
    todoLabel.innerText = `📅 ${dateKey} 일정`;
  }
}

// 이전 달, 다음 달 버튼 이벤트
prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  selectedDateKey = null;
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  selectedDateKey = null;
  renderCalendar();
});

// 초기 실행
renderCalendar();