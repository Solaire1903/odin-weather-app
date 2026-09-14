import { fetchWeatherData, filterConditions} from "./model.js";

/**
 * Initializes and loads the app
 */
const loadApp = async () => {
  const weatherData = await fetchWeatherData("London");
  console.log(filterConditions(weatherData.days[0]));
};

export default loadApp;
