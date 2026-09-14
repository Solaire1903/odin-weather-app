import { fetchWeatherData, filterConditions } from "./model.js";

/**
 * Initializes and loads the app
 */
const loadApp = async () => {
  const weatherData = await fetchWeatherData("Essen");
  const currentConditions = weatherData.currentConditions;
  console.log(filterConditions(currentConditions));
};

export default loadApp;
