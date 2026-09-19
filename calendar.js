import { renderEventDot } from "./js/event-dot.js";

const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
const monthFormatter = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long" });
const dateKey = (date) => {
  const localDate = new Date(date);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export class Calendar {
  constructor(container, { getEvents, getGame }) {
    this.container = container;
    this.getEvents = getEvents;
    this.getGame = getGame;
    this.currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }

  render() {
    const monthStart = new Date(this.currentMonth);
    const firstDay = (monthStart.getDay() + 6) % 7;
    const gridStart = new Date(monthStart);
    gridStart.setDate(1 - firstDay);
    const days = Array.from({ length: 42 }, (_, index) => {
      const day = new Date(gridStart);
      day.setDate(gridStart.getDate() + index);
      return day;
    });
    this.container.innerHTML = `
      <div class="calendar">
        <div class="calendar-toolbar">
          <button class="calendar-nav" data-calendar-action="previous" aria-label="이전 달">‹</button>
          <h3>${monthFormatter.format(monthStart)}</h3>
          <button class="calendar-nav" data-calendar-action="next" aria-label="다음 달">›</button>
        </div>
        <div class="calendar-weekdays">${weekdays.map((day) => `<span>${day}</span>`).join("")}</div>
        <div class="calendar-grid">${days.map((day) => this.renderDay(day, monthStart)).join("")}</div>
      </div>`;
    this.container.querySelectorAll("[data-calendar-action]").forEach((button) => {
      button.addEventListener("click", () => this.changeMonth(button.dataset.calendarAction));
    });
  }

  renderDay(day, monthStart) {
    const events = this.getEvents().filter((event) => event.date === dateKey(day));
    const isToday = dateKey(day) === dateKey(new Date());
    const classes = ["calendar-day"];
    if (day.getMonth() !== monthStart.getMonth()) classes.push("outside-month");
    if (isToday) classes.push("today");
    const dots = events.map((event) => {
      const game = this.getGame(event.gameId);
      return renderEventDot({ color: game?.color, gameName: game?.name });
    }).join("");
    return `<div class="${classes.join(" ")}" aria-label="${dateKey(day)}">
      <span class="day-number">${day.getDate()}</span>
      <div class="event-dots">${dots}</div>
    </div>`;
  }

  changeMonth(direction) {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + (direction === "next" ? 1 : -1));
    this.render();
  }
}
