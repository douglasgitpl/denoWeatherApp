import "jsr:@std/dotenv/load";

const API_KEY = Deno.env.get("WEATHER_API_KEY");

export async function fetchWeather() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&appid=${API_KEY}&units=metric`,
  );

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(`Error fetching weather data: ${data.message}`);
  }

  return {
    city: data.name,
    temp: `${data.main.temp}°C`,
    humidity: `${data.main.humidity}%`,
    description: data.weather[0].description,
  };
}
fetchWeather()
  .then((data) => console.log("Weather result:", data));
