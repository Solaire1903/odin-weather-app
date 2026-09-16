const locationForm = document.querySelector("form");
const locationInput = document.getElementById("location-input");

const displayWeatherData = (weatherData) => {
  const locationDisplay = document.getElementById("location-display");
  const descriptionDisplay = document.getElementById("description-display");
  const currentTemp = document.getElementById("current-temperature");
  const currentFeelslike = document.getElementById("current-feelslike");

  locationDisplay.textContent = `${weatherData.address} (${weatherData.resolvedAddress})`;
  descriptionDisplay.textContent = weatherData.days[0].description;
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
