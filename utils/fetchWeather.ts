import "jsr:@std/dotenv/load";

const API_KEY = Deno.env.get("WEATHER_API_KEY");

export async function fetchWeather(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Error fetching weather data for ${city}: ${data.message}`);
  }

  return {
    city: data.name,
    temp: `${data.main.temp}°C`,
    humidity: `${data.main.humidity}%`,
    description: data.weather[0].description,
  };
}