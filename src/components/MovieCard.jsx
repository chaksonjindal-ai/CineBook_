import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite, selectIsFavourite } from '../store/favouritesSlice';
import './MovieCard.css';

// MovieCard receives movie data through props
function MovieCard({ movie }) {
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selector: check if this movie is favourited
  const isFavourite = useSelector((state) => selectIsFavourite(state, movie.id));

  const handleToggleFavourite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleFavourite(movie.id));
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="movie-card">
      {/* Poster Image Container */}
      <div className="card-image-wrap">
        <Link to={`/movies/${movie.id}`} className="card-link" aria-label={`View details for ${movie.title}`}>
          {imgError ? (
            <div className="card-image placeholder">
              <span className="placeholder-emoji" role="img" aria-label="movie">🎬</span>
              <span className="placeholder-title">{movie.title}</span>
            </div>
          ) : (
            <img
              src={movie.image}
              alt={movie.title}
              className="card-poster"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}
        </Link>

        {/* Favourites Redux Action Button */}
        <button
          className={`favourite-btn ${isFavourite ? 'is-favourite' : ''}`}
          onClick={handleToggleFavourite}
          aria-label={isFavourite ? `Remove ${movie.title} from favourites` : `Add ${movie.title} to favourites`}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>

        {/* Badge for Age Rating or Year */}
        {movie.releaseYear && (
          <span className="year-badge">{movie.releaseYear}</span>
        )}
      </div>

      {/* Movie info */}
      <div className="card-info">
        <Link to={`/movies/${movie.id}`} className="card-title-link">
          <h3 className="card-title">{movie.title}</h3>
        </Link>

        <div className="card-details">
          <span className="card-genre">{movie.genre}</span>
          <span className="card-rating">⭐ {movie.rating}</span>
        </div>

        <div className="card-subdetails">
          <span className="card-language">🗣️ {movie.language}</span>
          {movie.duration && <span className="card-duration">⏱️ {movie.duration}</span>}
        </div>

        {/* Quick action buttons */}
        <div className="card-actions">
          <Link to={`/movies/${movie.id}`} className="details-btn">
            Details
          </Link>
          <button className="book-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
