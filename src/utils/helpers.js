export const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);
export const kelvinToFahrenheit = (k) => ((k - 273.15) * 9/5 + 32).toFixed(1);
export const getFormattedDate = (dt) => new Date(dt * 1000).toLocaleDateString();
export const getFormattedTime = (dt) => {
  const date = new Date(dt * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};