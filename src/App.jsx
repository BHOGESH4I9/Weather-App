import { useEffect, useState } from 'react'
import './App.css'
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import WeatherDashboard from './pages/WeatherDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={`app container py-4 ${theme}`}> 

      <WeatherDashboard />
    </div>
  );
};

export default App;
