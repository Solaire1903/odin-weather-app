let weatherDataStorage;

/**
 * Capitalizes the first letters of a string
 * (first letter and every letter after a whitespace)
 * @param string The string to capitalize
 * @return The new capitalized string
 */
const capitalizeFirstLetters = (string) => {
  let words = string.trim().split(" ");
  words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return words.join(" ");
};

/**
 * Fetches weather data of a given location from the Visual Crossing API
 * @param {string} location The location to fetch the weather data of
 * @param {boolean} fetchInFahrenheit Checks if the value should be retrieved as Celsius or Fahrenheit
 * @returns The fetched weather data, or the status code in case of an HTTP error
 */
const fetchWeatherData = async (location, fetchInFahrenheit) => {
  let weatherData;
  let response;
  let unitGroup;

  unitGroup = fetchInFahrenheit ? "us" : "metric";

  try {
    response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&include=days,current&key=UWVR4ND6M2ZRGH52PL6SMFYEN&contentType=json`,
    );
    if (!response.ok) {
      throw new Error(`Status Code: ${response.status}`);
    }

    weatherData = await response.json();
  } catch (error) {
    console.error(error);
    return response.status;
  }

  return weatherData;
};

const storeWeatherData = (weatherData) => {
  weatherDataStorage = weatherData;
};

const getStoredWeatherData = () => {
  return weatherDataStorage;
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
    relevantKeys = ["datetime", "conditions", "tempmax", "tempmin"];
  }

  relevantKeys.forEach((key) => (filteredConditions[key] = conditions[key]));

  return filteredConditions;
};

/**
 * Filters a given object representing the weather data to
 * only hold the relevant data for the app
 * @param {object} weatherData The weatherData object to filter
 * @return {object} The filtered weatherData object
 */
const filterWeatherData = (weatherData) => {
  const filteredData = {};
  const relevantKeys = ["currentConditions", "address", "resolvedAddress"];

  relevantKeys.forEach((key) => (filteredData[key] = weatherData[key]));

  filteredData.currentConditions = filterConditions(
    filteredData.currentConditions,
  );
  /**
   * "days" was not included in the relevantKeys array because I
   * did not want to filter all the days. I specifically filter
   * only the first day out here
   */
  filteredData.day = filterConditions(weatherData.days[0]);
  filteredData.resolvedAddress = capitalizeFirstLetters(
    filteredData.resolvedAddress,
  );
  filteredData.address = capitalizeFirstLetters(filteredData.address);

  return filteredData;
};

/**
 * Converts a Celsius temperature value into Fahrenheit
 * @param {number} temperature The temperature in Celsius to convert
 * @returns The converted temperature in Fahrenheit
 */
const convertCelsiusToFahrenheit = (temperature) => {
  return temperature * 1.8 + 32;
};

/**
 * Converts a Fahrenheit temperature value into Celsius
 * @param {number} temperature The temperature in Fahrenheit to convert
 * @returns The converted temperature in Celsius
 */
const convertFahrenheitToCelsius = (temperature) => {
  return (temperature - 32) / 1.8;
};

export {
  fetchWeatherData,
  filterWeatherData,
  storeWeatherData,
  getStoredWeatherData,
  convertCelsiusToFahrenheit,
  convertFahrenheitToCelsius,
};
