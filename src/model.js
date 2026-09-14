const getWeatherData = async (location) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=UWVR4ND6M2ZRGH52PL6SMFYEN&contentType=json`,
  );
  const weatherData = await response.json();

  console.log(weatherData);
};

export default getWeatherData;
