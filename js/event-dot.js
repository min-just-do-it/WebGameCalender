function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function renderEventDot({ color = "#aaa", gameName = "알 수 없는 게임" }) {
  const safeGameName = escapeAttribute(gameName);
  return `<span class="event-dot" style="background:${escapeAttribute(color)}" title="${safeGameName}" aria-label="${safeGameName}"></span>`;
}
