import funnyWeatherResponse from '../funnyResponses/funnyWeatherResponse';

const API_KEY = '4eec72870bed81b9648220ef95574452'; // Use env in prod

const fetchWeather = async (cityName) => {
  if (!cityName) return "Please specify a city.";

  try {
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&appid=${API_KEY}`
    );
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
      return `I couldn't find the city "${cityName}". Try another one.`;
    }

    const { lat, lon } = geoData[0];

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await weatherRes.json();

    const weatherType = data.weather?.[0]?.main || 'Unknown';
    const temp = data.main?.temp;

    if (typeof temp !== 'number') {
      return `Temperature data for "${cityName}" is unavailable.`;
    }

    return funnyWeatherResponse(weatherType, cityName, temp);
  } catch (error) {
    return 'Sorry, I had trouble fetching the weather.';
  }
};

export default fetchWeather;
 