/**
 * Fetches weather data of a given location from the Visual Crossing API
 * @param {string} location The location to fetch the weather data of
 * @returns The fetched weather data
 */
const fetchWeatherData = async (location) => {
  let weatherData;

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days,current&key=UWVR4ND6M2ZRGH52PL6SMFYEN&contentType=json`,
    );
    if (!response.ok) {
      throw new Error(`Status Code: ${response.status}`);
    }

    weatherData = await response.json();
  } catch (error) {
    console.error(error);
  }

  return weatherData;
};

/**
 * Filters a given object representing the weather conditions to
 * only hold the relevant data for the app
 * @param {object} conditions The conditions object to filter
 */
const filterConditions = (conditions) => {
  const filteredConditions = {};
  const relevantKeys = ["feelslike", "icon", "temp"];

  relevantKeys.forEach((key) => filteredConditions[key] = conditions[key]);

  return filteredConditions;
};

export { fetchWeatherData, filterConditions };
