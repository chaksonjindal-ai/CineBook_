import { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import movies from '../data/movies';
import './Home.css';

function Home() {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get featured movies (first 4)
  const featuredMovies = movies.slice(0, 4);

  // Get popular movies (sorted by rating, top 4)
  const popularMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Check if user is actively searching
  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">🎟️ The Ultimate Movie Experience</div>
          <h1 className="hero-title">
            Your Next Cinema Experience <span>Starts Here</span>
          </h1>
          <p className="hero-subtitle">
            Book tickets for the latest blockbusters, select your favorite cinema seats, and enjoy seamless showtimes.
          </p>

          {/* Search bar */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by title, genre (Sci-Fi, Action...) or language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search movies"
            />
            {isSearching && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            <Link to="/movies" className="browse-all-btn">
              Explore All Movies
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="home-container">
        {/* Search Results Section */}
        {isSearching && (
          <section className="movies-section">
            <div className="section-header">
              <h2>🔍 Search Results ({filteredMovies.length} found)</h2>
              <button className="reset-btn" onClick={() => setSearchTerm('')}>
                Clear Search
              </button>
            </div>
            <MovieGrid
              movies={filteredMovies}
              emptyMessage={`No movies found matching "${searchTerm}". Try searching for Action, Sci-Fi, or Nolan.`}
            />
          </section>
        )}

        {/* Featured Movies Section */}
        {!isSearching && (
          <section className="movies-section">
            <div className="section-header">
              <div>
                <h2>🔥 Now Showing & Featured</h2>
                <p className="section-subtitle">Hand-picked blockbusters running in theaters today</p>
              </div>
              <Link to="/movies" className="view-more-link">
                View All &rarr;
              </Link>
            </div>
            <MovieGrid movies={featuredMovies} />
          </section>
        )}

        {/* Popular / Top Rated Movies Section */}
        {!isSearching && (
          <section className="movies-section">
            <div className="section-header">
              <div>
                <h2>⭐ Highest Rated Films</h2>
                <p className="section-subtitle">Critically acclaimed cinema rated by global movie lovers</p>
              </div>
              <Link to="/movies" className="view-more-link">
                View All &rarr;
              </Link>
            </div>
            <MovieGrid movies={popularMovies} />
          </section>
        )}

        {/* Why CineBook Feature Highlights */}
        <section className="features-section">
          <div className="features-header">
            <h2>Why Book With CineBook?</h2>
            <p>Designed for fast, reliable, and premium movie ticket reservations.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">💺</span>
              <h3>Interactive Cinema Seating</h3>
              <p>Pick standard or VIP reclining seats in real-time with visual occupancy maps.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Instant E-Tickets</h3>
              <p>Receive an instant booking reference and access your ticket history anytime.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🔄</span>
              <h3>Easy Cancellation</h3>
              <p>Plans changed? Cancel confirmed tickets with a single click and release seats.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">❤️</span>
              <h3>Save Favourites</h3>
              <p>Bookmark movies you love to your personal watchlist with persistent storage.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
