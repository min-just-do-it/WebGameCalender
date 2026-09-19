import { renderEventDot } from "./js/event-dot.js";

const dateKey = (date) => {
  const value = new Date(date);
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
};

function startOfWeek(date) {
  const value = new Date(date);
  const day = (value.getDay() + 6) % 7;
  value.setDate(value.getDate() - day);
  value.setHours(0, 0, 0, 0);
  return value;
}

function getEventGroups(events, today = new Date()) {
  const todayKey = dateKey(today);
  const weekStart = startOfWeek(today);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const groups = {
    today: [],
    week: [],
    month: [],
  };

  events.forEach((event) => {
    const eventDate = new Date(`${event.date}T00:00:00`);
    if (event.date === todayKey) {
      groups.today.push(event);
    } else if (eventDate >= weekStart && eventDate < weekEnd) {
      groups.week.push(event);
    } else if (eventDate >= monthStart && eventDate.getMonth() === today.getMonth()) {
      groups.month.push(event);
    }
  });

  return groups;
}

export class TodoList {
  constructor(container, { getEvents, getGame }) {
    this.container = container;
    this.getEvents = getEvents;
    this.getGame = getGame;
  }

  render() {
    const groups = getEventGroups(this.getEvents());
    const sections = [
      ["오늘 일정", groups.today],
      ["이번주 일정", groups.week],
      ["이번달 일정", groups.month],
    ];
    this.container.innerHTML = sections.map(([title, events]) => this.renderSection(title, events)).join("");
  }

  renderSection(title, events) {
    const items = events.length ? events.map((event) => {
      const game = this.getGame(event.gameId);
      return `<div class="todo-item">${renderEventDot({ color: game?.color, gameName: game?.name })}<span class="todo-item-title">${event.title}</span></div>`;
    }).join("") : '<div class="todo-empty">등록된 일정이 없습니다.</div>';
    return `<section class="todo-section"><h2 class="todo-heading">${title}</h2><div class="todo-items">${items}</div></section>`;
  }
}
