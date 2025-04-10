import { deleteEntry } from "./taskManager.js";

const listContainer = document.getElementById("entry-list");

export function renderEntries(entries, mode) {
  listContainer.innerHTML = "";

  const filtered = entries.filter(e => e.type === mode);
  if (filtered.length === 0) {
    listContainer.innerHTML = "<p>No hay elementos aún.</p>";
    return;
  }

  filtered.forEach(entry => {
    const card = document.createElement("div");
    card.className = "entry-card";

    card.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      ${entry.date ? `<p><strong>Fecha:</strong> ${entry.date}</p>` : ""}
      <p><strong>Estado:</strong> ${entry.status}</p>
      <div class="actions">
        <button class="edit" data-id="${entry.id}">✏️</button>
        <button class="delete" data-id="${entry.id}">🗑️</button>
      </div>
    `;

    card.querySelector(".delete").addEventListener("click", () => {
      deleteEntry(entry.id);
      renderEntries(JSON.parse(localStorage.getItem("taskplanner_entries")) || [], mode);
    });

    card.querySelector(".edit").addEventListener("click", () => {
      const event = new CustomEvent("edit-entry", { detail: entry });
      document.dispatchEvent(event);
    });

    listContainer.appendChild(card);
  });
}
