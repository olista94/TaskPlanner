const factBox = document.getElementById("fact-box");
const factBtn = document.getElementById("new-fact-btn");

export async function loadFact() {
  factBox.textContent = "Loading fact...";

  try {
    const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
    const data = await res.json();
    factBox.textContent = data.text;
  } catch {
    factBox.textContent = "Couldn't load a fact right now";
  }
}

export function initFact() {
  factBtn.addEventListener("click", loadFact);
  loadFact();
}
