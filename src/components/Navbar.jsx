import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFavouriteIds } from '../store/favouritesSlice';
import { selectActiveBookings } from '../store/bookingSlice';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Redux state selectors for real-time counters
  const favouriteIds = useSelector(selectFavouriteIds);
  const activeBookings = useSelector(selectActiveBookings);

  // Auth context for login/logout state
  const { user, isAuthenticated, logout } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon" role="img" aria-label="movie camera">🎬</span>
          <span className="logo-text">CineBook</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" onClick={closeMenu}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourites" onClick={closeMenu} className="badge-link">
              Favourites
              {favouriteIds.length > 0 && (
                <span className="nav-badge" title={`${favouriteIds.length} favourites`}>
                  {favouriteIds.length}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings" onClick={closeMenu} className="badge-link">
              My Bookings
              {activeBookings.length > 0 && (
                <span className="nav-badge count-active" title={`${activeBookings.length} active bookings`}>
                  {activeBookings.length}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>

          {/* User Profile or Login */}
          {isAuthenticated ? (
            <li className="user-nav-item">
              <span className="user-greeting" title={user.email}>
                👤 {user.name}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className="login-btn" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
