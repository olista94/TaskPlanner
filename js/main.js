import { loadEntries, addEntry, updateEntry, deleteEntry } from "./taskManager.js";
import { renderEntries } from "./dom.js";
import { initWeather } from "./weather.js";
import { initFact } from "./fact.js";

let currentTab = "task";
let editingId = null;
let deletingId = null;

const form = document.getElementById("entry-form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const taskDateInput = document.getElementById("task-date");
const eventDateInput = document.getElementById("event-date");
const statusInput = document.getElementById("status");

const tabs = document.querySelectorAll(".tabs button");
const filters = document.querySelectorAll("#filters button");
const filterSection = document.getElementById("filters");
const listTitle = document.getElementById("list-title");

const editModal = document.getElementById("edit-modal");
const deleteModal = document.getElementById("delete-modal");

// Campos del modal de edición
const modalForm = document.getElementById("modal-edit-form");
const modalTitle = document.getElementById("modal-edit-title");
const modalDesc = document.getElementById("modal-edit-description");
const modalDate = document.getElementById("modal-edit-date");
const modalDateTime = document.getElementById("modal-edit-datetime");
const modalStatus = document.getElementById("modal-edit-status");
const closeEditModalBtn = document.getElementById("close-edit-modal");

// Modal de eliminación
const deleteText = document.getElementById("delete-description");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

function refreshView() {
  const entries = loadEntries();
  renderEntries(entries, currentTab);
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    tab.classList.add("active");

    currentTab = tab.dataset.tab;

    taskDateInput.style.display = currentTab === "task" ? "block" : "none";
    eventDateInput.style.display = currentTab === "event" ? "block" : "none";
    filterSection.classList.toggle("hidden", currentTab !== "task");

    listTitle.textContent = currentTab === "event" ? "Events list" : "Tasks list";

    editingId = null;
    form.reset();
    refreshView();
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const entry = {
    id: editingId || crypto.randomUUID(),
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    date: currentTab === "event" ? eventDateInput.value : taskDateInput.value,
    status: statusInput.value,
    type: currentTab
  };

  if (editingId) {
    updateEntry(entry);
  } else {
    addEntry(entry);
  }

  editingId = null;
  form.reset();
  refreshView();
});

// EDITAR DESDE MODAL
document.addEventListener("edit-entry", e => {
  const entry = e.detail;
  editingId = entry.id;

  modalTitle.value = entry.title;
  modalDesc.value = entry.description;
  modalStatus.value = entry.status;

  if (entry.type === "event") {
    modalDate.style.display = "none";
    modalDateTime.style.display = "block";
    modalDateTime.value = entry.date || "";
  } else {
    modalDate.style.display = "block";
    modalDateTime.style.display = "none";
    modalDate.value = entry.date || "";
  }

  editModal.classList.remove("hidden");
});

// GUARDAR CAMBIOS DESDE MODAL
modalForm.addEventListener("submit", e => {
  e.preventDefault();

  const updatedEntry = {
    id: editingId,
    title: modalTitle.value.trim(),
    description: modalDesc.value.trim(),
    date: modalDate.style.display !== "none" ? modalDate.value : modalDateTime.value,
    status: modalStatus.value,
    type: modalDate.style.display !== "none" ? "task" : "event"
  };

  updateEntry(updatedEntry);
  editModal.classList.add("hidden");
  editingId = null;
  refreshView();
});

// CERRAR MODAL DE EDICIÓN
closeEditModalBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

// ELIMINAR DESDE MODAL
document.addEventListener("delete-entry", e => {
  const entry = e.detail;
  deletingId = entry.id;
  deleteText.textContent = `¿Eliminar "${entry.title}"?`;
  deleteModal.classList.remove("hidden");
});

confirmDeleteBtn.addEventListener("click", () => {
  if (deletingId) {
    deleteEntry(deletingId);
    deletingId = null;
    deleteModal.classList.add("hidden");
    refreshView();
  }
});

cancelDeleteBtn.addEventListener("click", () => {
  deletingId = null;
  deleteModal.classList.add("hidden");
});

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    const all = loadEntries().filter(e => e.type === "task");
    const filtered = filter === "all" ? all : all.filter(e => e.status === filter);
    renderEntries(filtered, "task");
  });
});

refreshView();
initWeather();
initFact();
