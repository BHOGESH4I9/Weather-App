import React, { useState } from 'react'
import { getFormattedDate, getFormattedTime, kelvinToCelsius, kelvinToFahrenheit } from '../../utils/helpers';
import { weatherIcons } from '../../utils/weatherIcons';
import './TemperatureInfo.css';

const TemperatureInfo = ({ temp }) => {
  const [unit, setUnit] = useState("C");
  const converted = unit === "C" ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp);

  return (
    <div className="temperature-info mb-4">
      <p className="fs-5">Temperature: <strong>{converted}°{unit}</strong></p>
      <button className="btn btn-secondary" onClick={() => setUnit(unit === "C" ? "F" : "C")}>
        Switch to °{unit === "C" ? "F" : "C"}
      </button>
    </div>
  );
};

export default TemperatureInfo;