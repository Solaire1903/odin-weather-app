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
 * @param {boolean} fetchInFahrenheit Checks if the value should be retrieved as Celsius or Fahrenheit
 */
const handleUserInput = async (userInput, fetchInFahrenheit) => {
  let weatherData = await fetchWeatherData(userInput, fetchInFahrenheit);

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
  displayWeatherData(weatherData);
};

/**
 * Initializes and loads the app
 */
const loadApp = () => {
  bindFormListener(handleUserInput);
};

export default loadApp;
