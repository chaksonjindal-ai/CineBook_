import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="error-code">404</span>
        <span className="not-found-icon">📽️</span>
        <h1>Lost in the Cinema?</h1>
        <p>
          The page or reel you are looking for has been cut from the final film or moved to another screen.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-home">
            🎬 Go Back Home
          </Link>
          <Link to="/movies" className="btn-catalog">
            🍿 Explore Movies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

