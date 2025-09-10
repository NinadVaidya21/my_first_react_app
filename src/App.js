import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import ChatBot from "./chatbot.js";
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?apikey=12e9cd8b";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("dark");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "";
  }, [theme]);

  return (
    <div className="app">
      <h1>Filmora</h1>

      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle" 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Search Box */}
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies(searchTerm)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {/* Movies */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default App;
