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
 * @return {object} The filtered conditions object
 */
const filterConditions = (conditions) => {
  const filteredConditions = {};
  let relevantKeys = ["icon", "temp", "feelslike"];

  /**Check if a specific key is in the conditions object,
   * which means it represents the conditions of a day
   */
  if ("tempmax" in conditions) {
    const dayKeys = ["datetime", "description", "tempmax", "tempmin"];
    relevantKeys = relevantKeys.concat(dayKeys);
  }

  relevantKeys.forEach((key) => (filteredConditions[key] = conditions[key]));

  return filteredConditions;
};

const filterWeatherData = (weatherData) => {
  const filteredData = {};
  const relevantKeys = ["currentConditions", "days", "resolvedAddress"];

  relevantKeys.forEach((key) => (filteredData[key] = weatherData[key]));

  filteredData.currentConditions = filterConditions(
    filteredData.currentConditions,
  );
  filteredData.days = filteredData.days.map((day) => filterConditions(day));

  return filteredData;
};

export { fetchWeatherData, filterWeatherData };
