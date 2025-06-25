import React, { useEffect, useState } from "react";
import "./WeatherDashboard.css";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import LocationMap from "../components/LocationMap/LocationMap";
import SearchBar from "../components/SearchBar/SearchBar";
import ForecastDayList from "../components/ForecastDayList/ForecastDayList";
import ForecastChart from "../components/ForecastChart/ForecastChart";
import { fetchWeatherByCity, fetchForecastByCity  } from "../utils/api";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

const WeatherDashboard = () => {
  const [city, setCity] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = ""; // Clear old classes
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    async function fetchData() {
      const weather = await fetchWeatherByCity(city);
      const forecast = await fetchForecastByCity(city);
      setWeatherData(weather);
      setForecastData(forecast);
      if (forecast?.list?.length) {
        setSelectedDay(forecast.list[0]);
      }
    }
    fetchData();
  }, [city]);

  if (!weatherData || !forecastData) return <p>Loading weather data...</p>;

  return (
     <div className="weather-dashboard">
      <div className="top-bar">

        <h1 className="app-title">Weather App</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} /> 
        
      </div>
      <SearchBar onSearch={setCity} />
      
      <div className="weather-main">
        <LocationMap setCity={setCity} city={city} />
        <WeatherCard data={weatherData} />
      </div>

      <ForecastDayList forecast={forecastData} onSelect={setSelectedDay} />
      <ForecastChart dayDataList={
        forecastData.list.filter(item =>
          new Date(item.dt_txt).toDateString() === new Date(selectedDay.dt_txt).toDateString()
        )
      } />

    </div>
  );
};

export default WeatherDashboard;
