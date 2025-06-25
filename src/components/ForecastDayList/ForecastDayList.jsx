import React, { useState } from 'react'
import {getFormattedDate, getFormattedTime, kelvinToCelsius, kelvinToFahrenheit} from '../../utils/helpers'
import { weatherIcons } from '../../utils/weatherIcons';
import './ForecastDayList.css';

const ForecastDayList = ({ forecast, onSelect }) => {
  if (!forecast || !forecast.list || !Array.isArray(forecast.list)) {
    return <div className="forecast-day-list mb-4">No forecast data available</div>;
  }

  // Filter for one data point per day (every 8th item, assuming 3-hour intervals)
  const uniqueDays = forecast.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="forecast-day-list mb-3">
      <h3 className="mb-3">Upcoming Days</h3>
      <div className="d-flex flex-wrap gap-3">
        {uniqueDays.map((item, index) => (
          <ForecastCard key={index} data={item} onSelect={() => onSelect(item)} />
        ))}
      </div>
    </div>
  );
};

// New ForecastCard component to render individual cards
const ForecastCard = ({ data, onSelect }) => {
  const [unit, setUnit] = useState('C');
  const status = data.weather[0]?.main || 'Unknown';
  const icon = weatherIcons[status] || '❓';
  const temperature = unit === 'C' ? kelvinToCelsius(data.main.temp) : kelvinToFahrenheit(data.main.temp);

  return (
    <div className="card forecast-card" onClick={onSelect} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && onSelect()}>
      <div className="card-body">
        <h6 className="card-title">{getFormattedDate(data.dt)}</h6>
        <p className="card-text text-muted">{getFormattedTime(data.dt)}</p>
        <p className="status-icon">
          {icon} <strong>{status}</strong>
        </p>
        <p className="fs-5">
          Temperature: <strong>{temperature}°{unit}</strong>
        </p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
        <button
          className="btn btn-forecast-toggle"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering
            setUnit(unit === 'C' ? 'F' : 'C');
          }}
        >
          Switch to °{unit === 'C' ? 'F' : 'C'}
        </button>
      </div>
    </div>
  );
};

export default ForecastDayList;