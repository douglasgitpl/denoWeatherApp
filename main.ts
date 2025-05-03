import { fetchWeather } from "./utils/fetchWeather.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/weather") {
    const weather = await fetchWeather("London");

    return new Response(JSON.stringify(weather), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Serve static HTML file

  if (url.pathname === "/" || url.pathname === "/index.html") {
    const html = await Deno.readTextFile("./static/index.html");

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  return new Response("Not Found", { status: 404 });
});
