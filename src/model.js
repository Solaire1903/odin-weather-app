const fetchWeatherData = async (location) => {
  let weatherData;

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=UWVR4ND6M2ZRGH52PL6SMFYEN&contentType=json`,
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

export default fetchWeatherData;
