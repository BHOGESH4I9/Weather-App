import React from 'react'
import './ThemeToggle.css';

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      <button
        className="btn btn-outline-secondary theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
         {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
};
export default ThemeToggle;