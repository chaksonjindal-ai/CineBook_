import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import movies from '../data/movies';
import { selectFavouriteIds, removeFavourite } from '../store/favouritesSlice';
import MovieGrid from '../components/MovieGrid';
import './Favourites.css';

function Favourites() {
  const dispatch = useDispatch();
  const favouriteIds = useSelector(selectFavouriteIds);

  // Match favourite IDs with movies dataset
  const favouriteMovies = useMemo(() => {
    return movies.filter((m) => favouriteIds.includes(m.id));
  }, [favouriteIds]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all movies from your favourites?')) {
      favouriteIds.forEach((id) => dispatch(removeFavourite(id)));
    }
  };

  return (
    <div className="favourites-page">
      <div className="favourites-container">
        {/* Header */}
        <div className="favourites-header">
          <div>
            <h1>❤️ My Favourites Watchlist</h1>
            <p>Your handpicked collection of blockbusters. Ready for instant booking.</p>
          </div>

          {favouriteMovies.length > 0 && (
            <button className="clear-all-favs-btn" onClick={handleClearAll}>
              Clear All Favourites
            </button>
          )}
        </div>

        {/* Favourites Grid or Empty State */}
        {favouriteMovies.length === 0 ? (
          <div className="empty-favourites-card">
            <span className="empty-heart-icon">🤍</span>
            <h2>Your Watchlist is Empty</h2>
            <p>
              You haven't bookmarked any movies yet. Click the heart icon on any movie poster
              to save it to your favourites.
            </p>
            <Link to="/movies" className="browse-btn">
              Explore Cinema Catalog
            </Link>
          </div>
        ) : (
          <MovieGrid movies={favouriteMovies} />
        )}
      </div>
    </div>
  );
}

export default Favourites;

