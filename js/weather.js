const weatherInput = document.getElementById("weather-location");
const weatherOutput = document.getElementById("weather-output");
const weatherSuggestions = document.getElementById("weather-suggestions");
const weatherBtn = document.getElementById("weather-btn");
const weatherFavorite = document.getElementById("weather-favorite");

function updateFavoriteStar(city) {
  const fav = localStorage.getItem("favoriteCity");
  if (fav === city) {
    weatherFavorite.src = "/assets/images/fav_selected.png";
  } else {
    weatherFavorite.src = "/assets/images/fav.png";
  }
}

// Load weather from localstorage or default
export async function loadWeather(city = null) {
  const favCity = localStorage.getItem("favoriteCity");
  const selectedCity = city || favCity || "Madrid";
  weatherInput.value = selectedCity;
  updateFavoriteStar(selectedCity);

  weatherOutput.textContent = "Cargando...";

  try {
    const res = await fetch(`https://wttr.in/${selectedCity}?format=4`);
    const text = await res.text();
    weatherOutput.textContent = text;
  } catch {
    weatherOutput.textContent = "El tiempo no está disponible en este momento.";
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

  // Mark or unmark favorite city
  weatherFavorite.addEventListener("click", () => {
    const city = weatherInput.value.trim();
    const currentFav = localStorage.getItem("favoriteCity");

    if (currentFav === city) {
      localStorage.removeItem("favoriteCity");
      weatherFavorite.src = "/assets/images/fav.png";
    } else {
      localStorage.setItem("favoriteCity", city);
      weatherFavorite.src = "/assets/images/fav_selected.png";
    }
  });
}
