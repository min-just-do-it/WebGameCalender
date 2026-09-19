# 지시사항
eadme.md의 체크리스트들을 1:1 one by one으로 차근차근 구현해줘. 나중의 코드 리펙토링과 재활용을 위해 모듈식으로 작성해주고, 요소블록과 기능은 나누어서 funtion()과 class/div로 나눠서 해줘.

# 참고자료
https://www.figma.com/design/iNdsoSTjWn1Q9QEBx9sLwi/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&t=9mXllde2RObbetbF-1

# Review.png
figma.com 자료를 이용할 수 없을때의 대체 png 파일이다.

# Game Calender의 기능설명

## 1. 메인 페이지
이하의 기능이 모두 수행이 가능해야한다.
- [ ] (나중에 구현) [버튼] 게임 캘린더 추가 
- [x] [버튼] 일정 추가: 게임, 날짜, 시간, 제목을 입력하고 localStorage에 저장한다.
- [x] [버튼] 게임 추가: 게임 이름과 미리 정의된 색상을 선택한다.
- [x] [캘린더]: 월요일 시작 월간 캘린더에서 날짜별 일정 개수와 게임별 색상 점을 표시한다.
- [x] [Todo]: 등록된 일정을 오늘, 이번주, 이번달로 분류하고 게임 색상 점을 표시한다.
- [x] [Todo]: 오늘 > 이번주 > 이번달 우선순위로 일정을 분류하여 다른 목록에 중복 표시하지 않는다.
- [x] [Todo&캘린더]: 게임 색상 점에 호버링하면 해당 게임 이름을 툴팁으로 표시한다.

## 2. 게임 별 켈린더 페이지
- 추후 구현

## 실행 방법

`index.html`을 브라우저에서 열거나, 정적 파일 서버로 제공하면 된다. 핵심 UI는 다음 모듈로 분리되어 있다.

- `calendar.js`, `calendar.css`: 월간 캘린더 표시와 월 이동
- `todo.js`, `todo.css`: 오늘/이번주/이번달 일정 목록
- `js/event-dot.js`: 캘린더와 TODO에서 공통으로 사용하는 색상 점과 게임 이름 툴팁
- `js/storage.js`: 게임 및 일정의 localStorage 저장
- `js/main.js`: 입력 모달과 각 UI 모듈 연결