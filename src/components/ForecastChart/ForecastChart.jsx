import React from 'react';
import './ForecastChart.css';
import 'chart.js/auto';
import { getFormattedTime, kelvinToCelsius } from '../../utils/helpers';
import { Line } from 'react-chartjs-2';

const ForecastChart = ({ dayDataList }) => {
  if (!dayDataList || dayDataList.length === 0) return null;

  const labels = dayDataList.map((item) => getFormattedTime(item.dt));
  const temperatures = dayDataList.map((item) => kelvinToCelsius(item.main.temp));

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "#948979",
        backgroundColor: "rgba(148, 137, 121, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="forecast-chart">
      <h5 className="mb-3">Temperature Trend (4-hour Intervals)</h5>
      <Line data={data} />
    </div>
  );
};

export default ForecastChart;
