document.addEventListener("DOMContentLoaded", () => {
  const cityip = document.getElementById("city-input");
  const getw = document.getElementById("get-weather-btn");
  const info = document.getElementById("weather-info");
  const cityop = document.getElementById("city-name");
  const temp = document.getElementById("temperature");
  const desc = document.getElementById("description");
  const error = document.getElementById("error-message");

  const API_KEY = "5b296a276ebedcecf658b46b24fec61a"; //env
  getw.addEventListener("click", async () => {
    const city = cityip.value.trim();
    if (!city) return;
    // it may throw error
    // server/ database is always in another continent

    try {
      const weatherData = await fetchData(city);
      displayData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log(response);
    if (!response.ok) {
      throw new Error("Error: City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityop.textContent = name;

    temp.textContent = `Temperature: ${main.temp}`;

    desc.textContent = `Weather: ${weather[0].description}`;
    info.classList.remove("hidden");
    error.classList.add("hidden");
  }
  function showError() {
    console.log("Error: City not found.");

    info.classList.add("hidden");
    error.classList.remove("hidden");
  }
});
