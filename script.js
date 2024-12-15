const apiKey = "84ef49465e9b4035a24150213241412"; // Replace with your WeatherAPI key
const getWeatherButton = document.getElementById("get-weather");
const weatherDetails = document.getElementById("weather-details");
const errorMessage = document.getElementById("error-message");

getWeatherButton.addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();

  if (city === "") {
    displayError("Please enter a city name.");
    return;
  }

  // WeatherAPI endpoint for current weather
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      displayError(error.message);
    });
});

function displayWeather(data) {
  errorMessage.classList.add("hidden");
  weatherDetails.classList.remove("hidden");

  const location = document.getElementById("location");
  const description = document.getElementById("description");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const weatherIcon = document.getElementById("weather-icon");

  // Location
  location.textContent = `${data.location.name}, ${data.location.country}`;
  // Weather description
  description.textContent = data.current.condition.text;
  // Temperature in Celsius
  temperature.textContent = Math.round(data.current.temp_c);
  // Humidity
  humidity.textContent = data.current.humidity;
  // Wind speed
  wind.textContent = data.current.wind_kph;

  // Weather icon
  const iconCode = data.current.condition.icon; // Get the icon URL
  weatherIcon.src = `https:${iconCode}`; // Use the API's icon URL
  weatherIcon.alt = data.current.condition.text;
}

function displayError(message) {
  weatherDetails.classList.add("hidden");
  errorMessage.classList.remove("hidden");
  errorMessage.textContent = message;
}
