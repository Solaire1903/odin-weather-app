import { fetchWeatherData, filterWeatherData } from "./model.js";
import {
  bindFormListener,
  displayWeatherData,
  displayWeatherIcon,
  showSearchError,
} from "./view.js";

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
  bindFormListener(handleUserInput);
};

export default loadApp;
