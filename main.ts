import { fetchWeather } from "./utils/fetchWeather.ts";
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";


Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/weather") {
    const cities = ["New York", "Poznan"];

    // Fetch weather data for both cities in parallel
    const weatherResults = await Promise.all(
      cities.map((city) => fetchWeather(city))
    );

    return new Response(JSON.stringify(weatherResults), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
    showDirListing: false,
  });
});