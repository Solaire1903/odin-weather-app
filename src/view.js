const locationForm = document.querySelector("form");
const locationInput = document.getElementById("location-input");

/**
 * Displays the given weather data on the page
 * @param {object} weatherData The weather data to display
 */
const displayWeatherData = (weatherData) => {
  const locationDisplay = document.getElementById("location-display");
  const conditionsDisplay = document.getElementById("description-display");
  const currentWeatherIcon = document.getElementById("current-weather-icon");
  const currentTemp = document.getElementById("current-temperature");
  const currentFeelslike = document.getElementById("current-feelslike");

  locationDisplay.textContent = `${weatherData.address} (${weatherData.resolvedAddress})`;
  conditionsDisplay.textContent = weatherData.days[0].conditions;

  const iconId = weatherData.days[0].icon;

  import(`./weather-icons/${iconId}.svg`).then((module) => {
    currentWeatherIcon.src = module.default;
    currentWeatherIcon.alt = weatherData.days[0].conditions;
  });

  currentTemp.textContent = `Temperature: ${weatherData.currentConditions.temp} °C`;
  currentFeelslike.textContent = `Feels like ${weatherData.currentConditions.feelslike} °C`;
};

/**
 * Binds an event listener to the form
 * @param {function} handleUserInput The function that handles the user input
 */
const bindFormListener = (handleUserInput) => {
  locationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    handleUserInput(locationInput.value);
  });
};

export { bindFormListener, displayWeatherData };
