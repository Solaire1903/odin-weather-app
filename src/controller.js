import {
  fetchWeatherData,
  filterWeatherData,
  storeWeatherData,
  getStoredWeatherData,
  convertCelsiusToFahrenheit,
  convertFahrenheitToCelsius,
} from "./model.js";
import {
  bindFormListener,
  bindToggleListener,
  displayWeatherData,
  displayWeatherIcon,
  showSearchError,
} from "./view.js";

const handleCheckboxClick = (showInFahrenheit) => {
  let weatherData = getStoredWeatherData();
  if (weatherData === undefined) return;

  if (showInFahrenheit) {
    weatherData.currentConditions.temp = convertCelsiusToFahrenheit(weatherData.currentConditions.temp);
    weatherData.currentConditions.feelslike = convertCelsiusToFahrenheit(weatherData.currentConditions.feelslike);
    weatherData.day.tempmin = convertCelsiusToFahrenheit(weatherData.day.tempmin);
    weatherData.day.tempmax = convertCelsiusToFahrenheit(weatherData.day.tempmax);
  } else {
    weatherData.currentConditions.temp = convertFahrenheitToCelsius(weatherData.currentConditions.temp);
    weatherData.currentConditions.feelslike = convertFahrenheitToCelsius(weatherData.currentConditions.feelslike);
    weatherData.day.tempmin = convertFahrenheitToCelsius(weatherData.day.tempmin);
    weatherData.day.tempmax = convertFahrenheitToCelsius(weatherData.day.tempmax);
  }

  storeWeatherData(weatherData);
  displayWeatherData(weatherData, showInFahrenheit);
};

/**
 * Takes the input from the user and updates the view accordingly
 * @param {string} userInput The user input, should be a location
 * @param {boolean} showInFahrenheit Checks if the value should be retrieved as Celsius or Fahrenheit
 */
const handleUserInput = async (userInput, showInFahrenheit) => {
  let weatherData = await fetchWeatherData(userInput, showInFahrenheit);

  //Check if data retrieval failed with a status code number
  if (typeof weatherData === "number") {
    const statusCode = weatherData;
    showSearchError(statusCode);
    return;
  }

  weatherData = filterWeatherData(weatherData);
  storeWeatherData(weatherData);
  displayWeatherIcon(
    weatherData.currentConditions.icon,
    weatherData.day.conditions,
  );
  displayWeatherData(weatherData, showInFahrenheit);
};

/**
 * Initializes and loads the app
 */
const loadApp = () => {
  bindToggleListener(handleCheckboxClick);
  bindFormListener(handleUserInput);
};

export default loadApp;
