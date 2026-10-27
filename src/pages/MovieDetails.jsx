import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import movies from '../data/movies';
import { toggleFavourite, selectIsFavourite } from '../store/favouritesSlice';
import MovieGrid from '../components/MovieGrid';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  // Find movie by ID (handle string vs number)
  const movie = movies.find((m) => m.id === Number(id));

  // Redux selector for favourites
  const isFavourite = useSelector((state) => (movie ? selectIsFavourite(state, movie.id) : false));

  // If movie does not exist
  if (!movie) {
    return (
      <div className="movie-not-found">
        <span className="not-found-icon">🎬</span>
        <h2>Movie Not Found</h2>
        <p>The movie with identifier #{id} does not exist in our catalog.</p>
        <Link to="/movies" className="back-catalog-btn">
          Back to Movies Catalog
        </Link>
      </div>
    );
  }

  // Related movies from same genre (excluding current movie)
  const relatedMovies = movies
    .filter((m) => m.genre === movie.genre && m.id !== movie.id)
    .slice(0, 4);

  const handleToggleFavourite = () => {
    dispatch(toggleFavourite(movie.id));
  };

  return (
    <div className="movie-details-page">
      {/* Hero Backdrop Banner */}
      <div
        className="details-hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 15, 0.45) 0%, rgba(10, 10, 15, 0.95) 90%), url(${movie.backdrop || movie.image})`,
        }}
      >
        <div className="hero-inner-container">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/movies">Movies</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{movie.title}</span>
          </nav>

          <div className="details-header-grid">
            {/* Poster Card */}
            <div className="details-poster-wrap">
              {imgError ? (
                <div className="details-poster placeholder">
                  <span className="emoji">🎬</span>
                  <span>{movie.title}</span>
                </div>
              ) : (
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="details-poster"
                  onError={() => setImgError(true)}
                />
              )}
            </div>

            {/* Movie Meta Information */}
            <div className="details-info-column">
              <div className="badges-row">
                <span className="genre-pill">{movie.genre}</span>
                {movie.ageRating && <span className="age-pill">{movie.ageRating}</span>}
                <span className="lang-pill">🗣️ {movie.language}</span>
              </div>

              <h1 className="movie-title">{movie.title}</h1>

              <div className="meta-stats-row">
                <span className="meta-stat rating">⭐ {movie.rating} / 10</span>
                {movie.duration && <span className="meta-stat">⏱️ {movie.duration}</span>}
                {movie.releaseYear && <span className="meta-stat">📅 {movie.releaseYear}</span>}
                <span className="meta-stat price-badge">🎟️ From ₹{movie.price || 250}</span>
              </div>

              {/* Action Buttons */}
              <div className="cta-actions-row">
                <button
                  className="book-tickets-btn"
                  onClick={() => navigate(`/booking/${movie.id}`)}
                >
                  🎟️ Book Tickets Now
                </button>

                <button
                  className={`fav-toggle-btn ${isFavourite ? 'active' : ''}`}
                  onClick={handleToggleFavourite}
                  title={isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                >
                  {isFavourite ? '❤️ In Favourites' : '🤍 Add to Favourites'}
                </button>
              </div>

              {/* Synopsis */}
              <div className="synopsis-box">
                <h3>Synopsis</h3>
                <p>{movie.description || 'Experience this unforgettable cinematic masterpiece exclusively on CineBook screens.'}</p>
              </div>

              {/* Cast & Crew Info */}
              <div className="credits-section">
                {movie.director && (
                  <div className="credit-row">
                    <span className="credit-label">Director:</span>
                    <span className="credit-value">{movie.director}</span>
                  </div>
                )}

                {movie.cast && movie.cast.length > 0 && (
                  <div className="credit-row">
                    <span className="credit-label">Starring:</span>
                    <div className="cast-chips">
                      {movie.cast.map((actor) => (
                        <span key={actor} className="cast-chip">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {movie.showtimes && (
                  <div className="credit-row">
                    <span className="credit-label">Daily Shows:</span>
                    <div className="showtime-pills">
                      {movie.showtimes.map((time) => (
                        <span key={time} className="showtime-pill">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Movies Section */}
      {relatedMovies.length > 0 && (
        <div className="related-movies-container">
          <div className="related-header">
            <h2>More {movie.genre} Blockbusters</h2>
            <p>You might also love these titles</p>
          </div>
          <MovieGrid movies={relatedMovies} />
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
