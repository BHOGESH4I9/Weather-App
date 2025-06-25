import React, { useState } from 'react'
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    onSearch(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar d-flex mb-4">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Enter city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
};

export default SearchBar;