import { format } from "date-fns";

const temperatureToggle = document.getElementById("temperature-toggle");
const temperatureCheckbox = document.getElementById(
  "temperature-toggle-checkbox",
);
const locationForm = document.querySelector("form");
const locationInput = document.getElementById("location-input");
const searchError = document.getElementById("search-error");

/**
 * Displays a weather icon on the page based on the given string
 * @param {string} iconId The string which holds the information of what icon to display
 * @param {string} altText The alt text, in case of the image not being able to be displayed
 */
const displayWeatherIcon = (iconId, altText) => {
  const currentWeatherIcon = document.getElementById("current-weather-icon");

  import(`./weather-icons/${iconId}.svg`).then((module) => {
    currentWeatherIcon.src = module.default;
    currentWeatherIcon.alt = altText;
  });
};

/**
 * Displays the given weather data on the page
 * @param {object} weatherData The weather data to display
 * @param {boolean} showInFahrenheit Checks if the value should be retrieved as Celsius or Fahrenheit
 */
const displayWeatherData = (weatherData, showInFahrenheit) => {
  const datetimeDisplay = document.getElementById("datetime-display");
  const locationDisplay = document.getElementById("location-display");
  const conditionsDisplay = document.getElementById("description-display");
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

  const temperatureSign = showInFahrenheit ? "°F" : "°C";
  currentTemp.textContent = `Temperature: ${weatherData.currentConditions.temp} ${temperatureSign}`;
  currentFeelslike.textContent = `Feels like ${weatherData.currentConditions.feelslike} ${temperatureSign}`;
  tempmaxDisplay.textContent = `Max. Temp.: ${weatherData.day.tempmax} ${temperatureSign}`;
  tempminDisplay.textContent = `Min. Temp.: ${weatherData.day.tempmin} ${temperatureSign}`;

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
  locationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const currentWeatherContent = document.getElementById(
      "current-weather-content",
    );
    const searchLocation = locationInput.value;
    const loadingDisplay = document.getElementById("loading-display");
    const showInFahrenheit = temperatureCheckbox.checked ? true : false;

    locationInput.value = "";
    currentWeatherContent.style.visibility = "hidden";
    loadingDisplay.textContent = "Loading...";

    await handleUserInput(searchLocation, showInFahrenheit);

    loadingDisplay.textContent = "";
    currentWeatherContent.style.visibility = "visible";
  });
};

/**
 * Binds an event listener to the checkbox toggle area
 * @param {function} handleCheckboxClick The function that handles checkbox click
 */
const bindToggleListener = (handleCheckboxClick) => [
  temperatureToggle.addEventListener("click", (event) => {
    if (event.target !== temperatureCheckbox) return;
    event.stopImmediatePropagation();

    handleCheckboxClick(temperatureCheckbox.checked);
  }),
];

export {
  bindFormListener,
  bindToggleListener,
  displayWeatherData,
  displayWeatherIcon,
  showSearchError,
};
