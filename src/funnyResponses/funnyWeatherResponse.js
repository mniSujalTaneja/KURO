const funnyRomanticWeatherResponse = (weatherType, city, temp) => {
  const roundedTemp = Math.round(temp);

  const responses = {
    Clear: [
      `The sun's dazzling in ${city} at ${roundedTemp}°C, but it's your smile that lights up my world, darling.`,
      `Clear skies in ${city} with ${roundedTemp}°C—perfect for a romantic stroll, just you, me, and some cheesy love songs.`,
      `${city}'s glowing at ${roundedTemp}°C under a clear sky, but honestly, you're the brightest star here.`
    ],
    Clouds: [
      `Cloudy vibes in ${city} at ${roundedTemp}°C, like the sky's blushing just thinking about you.`,
      `${city}'s got clouds and ${roundedTemp}°C, setting the mood for some cozy cuddles by the window.`,
      `It's ${roundedTemp}°C and cloudy in ${city}—the sky's just jealous of our chemistry, love.`
    ],
    Rain: [
      `Rain's falling in ${city} at ${roundedTemp}°C, perfect for stealing kisses under a shared umbrella.`,
      `${city}'s all wet at ${roundedTemp}°C, but my heart's the one melting for you in this rain.`,
      `Rainy ${roundedTemp}°C in ${city}—let's make like a rom-com and dance through the puddles together.`
    ],
    Default: [
      `${weatherType} in ${city} at ${roundedTemp}°C? Doesn't matter when you're my sunshine, sweetheart.`,
      `It's ${weatherType} and ${roundedTemp}°C in ${city}, but you're the only forecast that makes my heart skip.`,
      `${city}'s got ${weatherType} at ${roundedTemp}°C, yet all I can think about is our next romantic adventure.`
    ]
  };

  const group = responses[weatherType] || responses.Default;
  return group[Math.floor(Math.random() * group.length)];
};

export default funnyRomanticWeatherResponse;