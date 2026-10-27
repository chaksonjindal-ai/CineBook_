import MovieCard from './MovieCard';
import './MovieGrid.css';

function MovieGrid({ movies = [], emptyMessage = 'No movies available.' }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-grid-empty">
        <span className="empty-icon" role="img" aria-label="film reel">🎞️</span>
        <p className="empty-text">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
