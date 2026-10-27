import { useState, useMemo } from 'react';
import movies from '../data/movies';
import MovieGrid from '../components/MovieGrid';
import './Movies.css';

// Extract distinct genres from dataset
const GENRES = ['All', 'Action', 'Sci-Fi', 'Comedy', 'Drama'];

function Movies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating-desc'); // rating-desc, rating-asc, title-asc, title-desc

  // Filter & sort movies using useMemo for high performance
  const processedMovies = useMemo(() => {
    let result = [...movies];

    // 1. Search filter (by title, language, director)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(term) ||
          m.language.toLowerCase().includes(term) ||
          (m.director && m.director.toLowerCase().includes(term))
      );
    }

    // 2. Genre filter
    if (selectedGenre !== 'All') {
      result = result.filter((m) => m.genre === selectedGenre);
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'rating-asc') return a.rating - b.rating;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      return 0;
    });

    return result;
  }, [searchTerm, selectedGenre, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSortBy('rating-desc');
  };

  return (
    <div className="movies-page">
      <div className="movies-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-text">
            <h1>🎬 Cinema Catalog</h1>
            <p>Browse all currently playing movies, discover top ratings, and reserve tickets.</p>
          </div>
          <div className="results-count-badge">
            {processedMovies.length} {processedMovies.length === 1 ? 'Movie' : 'Movies'} Available
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="filters-toolbar">
          {/* Search bar */}
          <div className="filter-search">
            <input
              type="text"
              placeholder="Search by title, director, or language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="catalog-search-input"
              aria-label="Filter movies by title or keyword"
            />
            {searchTerm && (
              <button
                className="clear-icon-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear keyword"
              >
                ✕
              </button>
            )}
          </div>

          {/* Genre chips */}
          <div className="genre-chips-container" role="group" aria-label="Genre filters">
            {GENRES.map((genre) => (
              <button
                key={genre}
                type="button"
                className={`genre-chip ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">
              Sort By:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="rating-desc">Rating: High to Low ⭐</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="title-asc">Title: A &rarr; Z</option>
              <option value="title-desc">Title: Z &rarr; A</option>
            </select>
          </div>
        </div>

        {/* Movies Grid or Empty State */}
        <MovieGrid
          movies={processedMovies}
          emptyMessage={
            <div className="empty-filter-wrapper">
              <p>No movies matched your search and filter criteria.</p>
              <button className="reset-filters-btn" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Movies;
