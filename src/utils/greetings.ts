import { contentData } from '@data/content';

type TimeOfDay = 'morning' | 'afternoon' | 'evening';
type GreetingType = 'casual' | 'timeBased' | 'weather';

interface WeatherData {
  temp: number;
  condition: string; // clear, rain, clouds, snow, etc.
}

// Track the last greeting type to ensure alternation
let lastGreetingType: GreetingType | null = null;

/**
 * Get the current time of day based on local time
 */
export const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 18) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

/**
 * Get a random item from an array
 */
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Fetch weather data for user's location
 * Uses Open-Meteo API (no API key required)
 */
export const fetchWeatherData = async (): Promise<WeatherData | null> => {
  try {
    // Get user's location
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 5000,
        maximumAge: 300000, // Cache for 5 minutes
      });
    });

    const { latitude, longitude } = position.coords;

    // Open-Meteo API - free, no API key required
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
    );

    if (!response.ok) {
      throw new Error('Weather API failed');
    }

    const data = await response.json();

    // Map WMO weather codes to conditions
    // https://open-meteo.com/en/docs
    const weatherCode = data.current.weather_code;
    let condition = 'clear';

    if (weatherCode === 0) condition = 'clear';
    else if ([1, 2, 3].includes(weatherCode)) condition = 'clouds';
    else if ([45, 48].includes(weatherCode)) condition = 'clouds'; // fog
    else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) condition = 'rain';
    else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) condition = 'snow';
    else if ([95, 96, 99].includes(weatherCode)) condition = 'rain'; // thunderstorm

    return {
      temp: Math.round(data.current.temperature_2m),
      condition,
    };
  } catch (error) {
    // Silent fail - return null if weather can't be fetched
    console.debug('Weather fetch failed:', error);
    return null;
  }
};

/**
 * Get weather-based greeting based on current conditions
 */
const getWeatherGreeting = (weather: WeatherData): string => {
  const { weatherGreetings } = contentData.greetings;

  // Temperature-based greetings take priority
  if (weather.temp < 5) {
    return getRandomItem(weatherGreetings.cold);
  }
  if (weather.temp > 30) {
    return getRandomItem(weatherGreetings.hot);
  }

  // Condition-based greetings
  switch (weather.condition) {
    case 'rain':
    case 'drizzle':
    case 'thunderstorm':
      return getRandomItem(weatherGreetings.rainy);
    case 'snow':
      return getRandomItem(weatherGreetings.snowy);
    case 'clear':
      return getRandomItem(weatherGreetings.sunny);
    case 'clouds':
      return getRandomItem(weatherGreetings.cloudy);
    default:
      return getRandomItem(weatherGreetings.sunny);
  }
};

/**
 * Get a random introduction message
 */
export const getIntroduction = (): string => {
  const { introductions } = contentData.greetings;
  return getRandomItem(introductions);
};

/**
 * Get a complete greeting with alternating logic
 * First greeting on page load is always casual
 * Then alternates: casual → time-based/weather → casual → time-based/weather
 * Format: "{Greeting} {Introduction}" for casual greetings
 * Format: "{Greeting}" only for time-based/weather greetings
 */
export const getCompleteGreeting = async (weather?: WeatherData | null): Promise<string> => {
  const { timeBasedGreetings, casualGreetings } = contentData.greetings;

  // First greeting (or after reset) is always casual
  if (lastGreetingType === null) {
    lastGreetingType = 'casual';
    const casualGreeting = getRandomItem(casualGreetings);
    const introduction = getIntroduction();
    return `${casualGreeting} ${introduction}`;
  }

  // If last was casual, use time-based or weather
  if (lastGreetingType === 'casual') {
    // 30% chance for weather greeting if available
    if (weather && Math.random() > 0.7) {
      lastGreetingType = 'weather';
      return getWeatherGreeting(weather);
    }

    // Otherwise use time-based
    lastGreetingType = 'timeBased';
    const timeOfDay = getTimeOfDay();
    const greeting = timeBasedGreetings.find(g => g.type === timeOfDay);
    return greeting?.message || casualGreetings[0];
  }

  // If last was time-based or weather, use casual
  lastGreetingType = 'casual';
  const casualGreeting = getRandomItem(casualGreetings);
  const introduction = getIntroduction();
  return `${casualGreeting} ${introduction}`;
};

/**
 * Reset greeting type tracker (useful for testing)
 */
export const resetGreetingType = () => {
  lastGreetingType = null;
};
