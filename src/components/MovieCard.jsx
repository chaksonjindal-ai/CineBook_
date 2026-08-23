import { useState } from 'react';
import './MovieCard.css';

// MovieCard receives movie data through props
function MovieCard({ movie }) {
  // State to track if image failed to load
  const [imgError, setImgError] = useState(false);

  // If image failed to load, show a placeholder
  if (imgError) {
    return (
      <div className="movie-card">
        <div className="card-image placeholder">
          <span className="placeholder-emoji">🎬</span>
          <span className="placeholder-title">{movie.title}</span>
        </div>
        <div className="card-info">
          <h3 className="card-title">{movie.title}</h3>
          <div className="card-details">
            <span className="card-genre">{movie.genre}</span>
            <span className="card-rating">⭐ {movie.rating}</span>
          </div>
          <p className="card-language">{movie.language}</p>
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-card">
      {/* Movie poster */}
      <div className="card-image">
        <img
          src={movie.image}
          alt={movie.title}
          onError={() => setImgError(true)}
        />
      </div>

      {/* Movie info */}
      <div className="card-info">
        <h3 className="card-title">{movie.title}</h3>
        <div className="card-details">
          <span className="card-genre">{movie.genre}</span>
          <span className="card-rating">⭐ {movie.rating}</span>
        </div>
        <p className="card-language">{movie.language}</p>

        {/* Book Now button - will work in Phase 2 */}
        <button className="book-btn">Book Now</button>
      </div>
    </div>
  );
}

export default MovieCard;
