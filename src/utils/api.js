const API_KEY = "6c0b400828f962a4fd37ef4408fc7ff0";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherByCity(city) {
  try {
    const res = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`, {
      mode: "cors",
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", res.status, errorText);
      throw new Error("Failed to fetch weather");
    }
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    throw err;
  }
}


export async function fetchForecastByCity(city) {
  const res = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch forecast");
  return await res.json();
}