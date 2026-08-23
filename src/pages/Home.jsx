import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import movies from '../data/movies';
import './Home.css';

function Home() {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get featured movies (first 4) - only show when not searching
  const featuredMovies = movies.slice(0, 4);

  // Get popular movies (sorted by rating, top 4) - only show when not searching
  const popularMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Check if user is searching
  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="home">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Your Next Movie Experience <span>Starts Here</span></h1>
          <p>Book tickets for the latest blockbusters. Fast and easy.</p>

          {/* Search bar */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Search Results Section - shows when user is searching */}
      {isSearching && (
        <section className="movies-section">
          <div className="section-container">
            <h2>🔍 Search Results ({filteredMovies.length} found)</h2>
            {filteredMovies.length > 0 ? (
              <div className="movies-grid">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="no-results">No movies found for "{searchTerm}"</p>
            )}
          </div>
        </section>
      )}

      {/* Featured Movies Section - shows when NOT searching */}
      {!isSearching && (
        <section id="movies" className="movies-section">
          <div className="section-container">
            <h2>🔥 Featured Movies</h2>
            <div className="movies-grid">
              {featuredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Movies Section - shows when NOT searching */}
      {!isSearching && (
        <section id="popular" className="movies-section">
          <div className="section-container">
            <h2>📈 Popular Movies</h2>
            <div className="movies-grid">
              {popularMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
