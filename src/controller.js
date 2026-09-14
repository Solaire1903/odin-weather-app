import fetchWeatherData from "./model.js";

/**
 * Initializes and loads the app
 */
const loadApp = async () => {
  console.log(await fetchWeatherData("Essen"));
};

export default loadApp;
