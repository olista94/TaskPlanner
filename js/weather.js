const weatherInput = document.getElementById("weather-location");
const weatherOutput = document.getElementById("weather-output");
const weatherSuggestions = document.getElementById("weather-suggestions");
const weatherBtn = document.getElementById("weather-btn");

const cities = [
  "Madrid", "Barcelona", "Valencia", "Sevilla",
  "Bilbao", "Zaragoza", "Málaga", "Murcia",
  "Toledo", "Salamanca", "Granada", "Cádiz"
];

export async function loadWeather(city = "Madrid") {
  weatherOutput.textContent = "Cargando clima...";

  try {
    const res = await fetch(`https://wttr.in/${city}?format=3`);
    const text = await res.text();
    weatherOutput.textContent = text;
  } catch {
    weatherOutput.textContent = "No se pudo obtener el clima.";
  }
}

export function initWeather() {
  loadWeather(); // clima por defecto

  weatherBtn.addEventListener("click", () => {
    const city = weatherInput.value.trim();
    if (city) loadWeather(city);
  });

  weatherInput.addEventListener("input", () => {
    const query = weatherInput.value.trim().toLowerCase();
    if (query.length === 0) {
      weatherSuggestions.classList.add("hidden");
      return;
    }

    const matches = cities.filter(c =>
      c.toLowerCase().startsWith(query)
    ).slice(0, 4);

    if (matches.length === 0) {
      weatherSuggestions.classList.add("hidden");
      return;
    }

    weatherSuggestions.innerHTML = matches
      .map(c => `<li>${c}</li>`)
      .join("");
    weatherSuggestions.classList.remove("hidden");
  });

  weatherSuggestions.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      weatherInput.value = e.target.textContent;
      weatherSuggestions.classList.add("hidden");
      loadWeather(e.target.textContent);
    }
  });

  weatherInput.addEventListener("blur", () => {
    setTimeout(() => {
      weatherSuggestions.classList.add("hidden");
    }, 100);
  });
}
