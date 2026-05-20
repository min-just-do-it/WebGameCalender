// 전역 변수 및 데이터 정의
let currentDate = new Date();
let currentTab = 'daily'; 
let selectedDateKey = null; 

const calendarDates = document.getElementById("calendarDates");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

const eventsData = {
  "2026-05-20": ["서브컬쳐 게임 출시일", "마감 밤샘"] 
};

const todoData = {
  daily: {
    title: "하루 TODO",
    placeholder: "오늘 해야할 일을 적어주세요.",
    tasks: ["일일 퀘스트 완료하기", "에너지 채우기", "숙제하기"]
  },
  weekly: {
    title: "주간 할 일",
    placeholder: "일주일 안에 해야할 일을 적어주세요.",
    tasks: ["주간 퀘스트 하기", "주간 레이드 돌기", "재화 던전 소탕"]
  },
  monthly: {
    title: "월간 할 일",
    placeholder: "이번 달 안에 해야할 일을 적어주세요.",
    tasks: ["나선비경 클리어", "시즌 패스 만렙 찍기"]
  }
};