import { format } from "date-fns";

const locationForm = document.querySelector("form");
const locationInput = document.getElementById("location-input");
const searchError = document.getElementById("search-error");

/**
 * Displays the given weather data on the page
 * @param {object} weatherData The weather data to display
 */
const displayWeatherData = (weatherData) => {
  const datetimeDisplay = document.getElementById("datetime-display");
  const locationDisplay = document.getElementById("location-display");
  const conditionsDisplay = document.getElementById("description-display");
  const currentWeatherIcon = document.getElementById("current-weather-icon");
  const currentTemp = document.getElementById("current-temperature");
  const currentFeelslike = document.getElementById("current-feelslike");
  const tempminDisplay = document.getElementById("tempmin-display");
  const tempmaxDisplay = document.getElementById("tempmax-display");

  const dateValues = weatherData.day.datetime.split("-");
  datetimeDisplay.textContent = format(
    new Date(dateValues[0], dateValues[1] - 1, dateValues[2]),
    "MMMM do yyyy",
  );

  locationDisplay.textContent = `${weatherData.address} (${weatherData.resolvedAddress})`;
  conditionsDisplay.textContent = weatherData.day.conditions;

  const iconId = weatherData.currentConditions.icon;
  import(`./weather-icons/${iconId}.svg`).then((module) => {
    currentWeatherIcon.src = module.default;
    currentWeatherIcon.alt = weatherData.day.conditions;
  });

  currentTemp.textContent = `Temperature: ${weatherData.currentConditions.temp} °C`;
  currentFeelslike.textContent = `Feels like ${weatherData.currentConditions.feelslike} °C`;
  tempmaxDisplay.textContent = `Max. Temp.: ${weatherData.day.tempmax} °C`;
  tempminDisplay.textContent = `Min. Temp.: ${weatherData.day.tempmin} °C`;

  searchError.textContent = "";
};

/**
 * Displays an error warning on the page, depending on the passed status code
 * @param {number} statusCode The HTTP Status Code to show the error for
 */
const showSearchError = (statusCode) => {
  switch (statusCode) {
    case 400:
      searchError.textContent =
        "No weather data found for this location, try another one";
      break;
    case 401:
    case 402:
    case 404:
      searchError.textContent =
        "A problem occured in the program, contact the developer or try again later";
      break;
    case 500:
      searchError.textContent = "Internal server error, try again later";
      break;
  }
};

/**
 * Binds an event listener to the form
 * @param {function} handleUserInput The function that handles the user input
 */
const bindFormListener = (handleUserInput) => {
  locationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    handleUserInput(locationInput.value);

    locationInput.value = "";
  });
};

export { bindFormListener, displayWeatherData, showSearchError };
