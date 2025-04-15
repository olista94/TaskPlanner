import { deleteEntry } from "./taskManager.js";

const listContainer = document.getElementById("entry-list");

export function renderEntries(entries, mode) {
  listContainer.innerHTML = "";

  const filtered = entries.filter(e => e.type === mode);
  if (filtered.length === 0) {
    listContainer.innerHTML = "<p>No elements yet.</p>";
    return;
  }

  filtered.forEach(entry => {
    const card = document.createElement("div");
    card.className = "entry-card";

    card.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      ${entry.date ? `<p><strong>Date:</strong> ${entry.date}</p>` : ""}
      <p><strong>State:</strong> ${entry.status}</p>
      <div class="actions">
        <button class="edit" data-id="${entry.id}" title="Edit">✏️</button>
        <button class="delete" data-id="${entry.id}" title="Delete">🗑️</button>
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
