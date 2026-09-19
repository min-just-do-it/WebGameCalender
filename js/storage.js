const STORAGE_KEY = "game-calendar-data";

const defaultData = {
  games: [
    { id: "default-daily", name: "일일 퀘스트", color: "#6457e8" },
    { id: "default-story", name: "스토리보기", color: "#6457e8" },
    { id: "default-update", name: "업데이트", color: "#6ee856" },
  ],
  events: [],
};

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(defaultData);
    const parsed = JSON.parse(saved);
    return { games: Array.isArray(parsed.games) ? parsed.games : [], events: Array.isArray(parsed.events) ? parsed.events : [] };
  } catch (error) {
    console.error("게임 캘린더 데이터를 불러오지 못했습니다.", error);
    return { games: [], events: [] };
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("게임 캘린더 데이터를 저장하지 못했습니다.", error);
  }
}

export function addGame(data, game) {
  data.games.push({ ...game, id: createId("game") });
  saveData(data);
}

export function addEvent(data, event) {
  data.events.push({ ...event, id: createId("event") });
  saveData(data);
}
