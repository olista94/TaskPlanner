import { translateWithGoogle } from "./translate.js";

const factBox = document.getElementById("fact-box");
const factBtn = document.getElementById("new-fact-btn");

export async function loadFact() {
  factBox.textContent = "Cargando dato...";

  try {
    const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
    const data = await res.json();

    const translatedText = await translateWithGoogle(data.text);
    factBox.textContent = translatedText;

  } catch (error) {
    console.error("Error:", error);
    factBox.textContent = "No se pudo cargar el dato en este momento";
  }
}

export function initFact() {
  factBtn.addEventListener("click", loadFact);
  loadFact();
}
