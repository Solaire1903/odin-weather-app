import { fetchWeatherData, filterWeatherData } from "./model.js";
import { bindFormListener } from "./view.js";

/**
 * Takes the input from the user and updates the view accordingly
 * @param {string} userInput The user input, should be a location
 */
const handleUserInput = async (userInput) => {
  let weatherData = await fetchWeatherData(userInput);

  //Check if data retrieval failed with a status code number
  if (typeof weatherData === "number") {
    console.log("Failed to get data");
    return;
  }

  console.log(filterWeatherData(weatherData));
};

/**
 * Initializes and loads the app
 */
const loadApp = () => {
  bindFormListener(handleUserInput);
};

export default loadApp;
