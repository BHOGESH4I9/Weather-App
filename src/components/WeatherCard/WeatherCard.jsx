import React from 'react';
import './WeatherCard.css';
import { weatherIcons } from '../../utils/weatherIcons';
import { getFormattedDate, getFormattedTime } from '../../utils/helpers';
import TemperatureInfo from '../TemperatureInfo/TemperatureInfo';

const WeatherCard = ({ data }) => {
  if (!data || !data.weather || !data.main || !data.sys || !data.wind) {
    return <div className="card weather-card mb-4">No weather data available</div>;
  }

  const status = data.weather[0]?.main || 'Unknown';
  const icon = weatherIcons[status] || '❓';

  return (
    <div className="card weather-card mb-4">
      <div className="card-body">
        <h4 className="card-title">{data.name}, {data.sys.country}</h4>
        <p className="card-text card-date">{getFormattedDate(data.dt)} - {getFormattedTime(data.dt)}</p>
        <p className="status-icon">
          {icon} <strong>{status}</strong>
        </p>
        <TemperatureInfo temp={data.main.temp} />
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
};


export default WeatherCard;