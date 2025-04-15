const listContainer = document.getElementById("entry-list");

const statusLabels = {
  "pending": "Pendiente",
  "in-progress": "En progreso",
  "completed": "Completado"
};

export function renderEntries(entries, mode) {
  listContainer.innerHTML = "";

  const filtered = entries.filter(e => e.type === mode);
  if (filtered.length === 0) {
    listContainer.innerHTML = "<p>Ho hay elementos.</p>";
    return;
  }

  filtered.forEach(entry => {
    const card = document.createElement("div");
    card.className = `entry-card ${entry.status}`;

    card.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      ${entry.date ? `<p><strong>Fecha:</strong> ${entry.date}</p>` : ""}
      <p><strong>Estado:</strong> ${statusLabels[entry.status] || entry.status}</p>
      <div class="actions">
        <button class="edit" data-id="${entry.id}" title="Editar">✏️</button>
        <button class="delete" data-id="${entry.id}" title="Eliminar">🗑️</button>
      </div>
    `;

    card.querySelector(".edit").addEventListener("click", () => {
      const event = new CustomEvent("edit-entry", { detail: entry });
      document.dispatchEvent(event);
    });

    card.querySelector(".delete").addEventListener("click", () => {
      const event = new CustomEvent("delete-entry", { detail: entry });
      document.dispatchEvent(event);
    });

    listContainer.appendChild(card);
  });
}
