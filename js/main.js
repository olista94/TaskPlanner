import { loadEntries, addEntry, updateEntry } from "./taskManager.js";
import { renderEntries } from "./dom.js";
import { initWeather } from "./weather.js";
import { initFact } from "./fact.js";

let currentTab = "task";
let editingId = null;

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

document.addEventListener("edit-entry", e => {
  const entry = e.detail;
  editingId = entry.id;

  titleInput.value = entry.title;
  descInput.value = entry.description;
  statusInput.value = entry.status;

  if (entry.type === "event") {
    tabs[1].click();
    eventDateInput.value = entry.date || "";
  } else {
    tabs[0].click();
    taskDateInput.value = entry.date || "";
  }
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
