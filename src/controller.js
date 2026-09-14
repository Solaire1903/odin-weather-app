import fetchWeatherData from "./model.js";

const loadApp = async () => {
  console.log(await fetchWeatherData("Essen"));
};

export default loadApp;
