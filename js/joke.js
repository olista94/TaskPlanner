const jokeBox = document.getElementById("joke-box");
const jokeButton = document.getElementById("new-joke-btn");

async function fetchJoke() {
  jokeBox.textContent = "Cargando chiste...";
console.log("gwefbwefcbweufweduhwevuhwevbdfuh");
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?lang=es");
    const data = await res.json();

    if (data.error) {
      jokeBox.textContent = "Error al cargar el chiste 😢";
      return;
    }

    if (data.type === "single") {
      jokeBox.textContent = data.joke;
    } else if (data.type === "twopart") {
      jokeBox.innerHTML = `<strong>${data.setup}</strong><br/>${data.delivery}`;
    }

  } catch (err) {
    jokeBox.textContent = "Error de conexión 😢";
  }
}

jokeButton.addEventListener("click", fetchJoke);
fetchJoke();
