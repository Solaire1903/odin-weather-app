import { fetchWeatherData, filterWeatherData} from "./model.js";

/**
 * Initializes and loads the app
 */
const loadApp = async () => {
  const weatherData = await fetchWeatherData("Essen");
  console.log(filterWeatherData(weatherData));
};

export default loadApp;
