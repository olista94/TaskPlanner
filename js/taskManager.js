const STORAGE_KEY = "taskplanner_entries";

export function loadEntries() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addEntry(entry) {
  const entries = loadEntries();
  entries.push(entry);
  saveEntries(entries);
}

export function deleteEntry(id) {
  const entries = loadEntries().filter(e => e.id !== id);
  saveEntries(entries);
}

export function updateEntry(updatedEntry) {
  const entries = loadEntries().map(e => (e.id === updatedEntry.id ? updatedEntry : e));
  saveEntries(entries);
}
