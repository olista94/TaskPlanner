const weatherInput = document.getElementById("weather-location");
const weatherOutput = document.getElementById("weather-output");
const weatherSuggestions = document.getElementById("weather-suggestions");
const weatherBtn = document.getElementById("weather-btn");

export async function loadWeather(city = "Madrid") {
  weatherOutput.textContent = "Loading weather...";

  try {
    const res = await fetch(`https://wttr.in/${city}?format=4`);
    const text = await res.text();
    weatherOutput.textContent = text;
  } catch {
    weatherOutput.textContent = "Weather was not available.";
  }
}

export function initWeather() {
  loadWeather();

  weatherBtn.addEventListener("click", () => {
    const city = weatherInput.value.trim();
    if (city) loadWeather(city);
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
