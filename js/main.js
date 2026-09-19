import { addEvent, addGame, loadData } from "./storage.js";
import { Calendar } from "../calendar.js";
import { TodoList } from "../todo.js";

const palette = ["#6457e8", "#f0784d", "#6ee856", "#e6bd45", "#dd72c5", "#4db9e8"];
const data = loadData();
const getGame = (id) => data.games.find((game) => game.id === id);
const getEvents = () => data.events;

const calendar = new Calendar(document.querySelector("#calendar"), { getEvents, getGame });
const todoList = new TodoList(document.querySelector("#todo-list"), { getEvents, getGame });
const gameDialog = document.querySelector("#game-dialog");
const eventDialog = document.querySelector("#event-dialog");
const gameForm = document.querySelector("#game-form");
const eventForm = document.querySelector("#event-form");

function render() {
  calendar.render();
  todoList.render();
  renderGameColors();
  renderEventGames();
}

function renderGameColors() {
  const selected = gameForm.elements.color.value || palette[0];
  document.querySelector("#game-color-options").innerHTML = palette.map((color) =>
    `<button class="color-option ${color === selected ? "selected" : ""}" type="button" style="background:${color}" data-color="${color}" aria-label="${color}"></button>`
  ).join("");
  document.querySelectorAll("[data-color]").forEach((button) => button.addEventListener("click", () => {
    gameForm.elements.color.value = button.dataset.color;
    renderGameColors();
  }));
}

function renderEventGames() {
  const select = document.querySelector("#event-game");
  select.innerHTML = data.games.map((game) => `<option value="${game.id}">${game.name}</option>`).join("");
  const hasGames = data.games.length > 0;
  select.disabled = !hasGames;
  document.querySelector("#no-games-hint").classList.toggle("visible", !hasGames);
  eventForm.querySelector('button[type="submit"]').disabled = !hasGames;
}

function openDialog(dialog) {
  dialog.showModal();
}

document.querySelector("#add-game-button").addEventListener("click", () => {
  gameForm.reset();
  gameForm.elements.color.value = palette[0];
  renderGameColors();
  openDialog(gameDialog);
});

document.querySelector("#add-event-button").addEventListener("click", () => {
  eventForm.reset();
  eventForm.elements.date.value = new Date().toISOString().slice(0, 10);
  renderEventGames();
  openDialog(eventDialog);
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
gameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addGame(data, { name: gameForm.elements.name.value.trim(), color: gameForm.elements.color.value });
  gameDialog.close();
  render();
});
eventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addEvent(data, {
    gameId: eventForm.elements.gameId.value,
    title: eventForm.elements.title.value.trim(),
    date: eventForm.elements.date.value,
    time: eventForm.elements.time.value,
  });
  eventDialog.close();
  render();
});

render();
