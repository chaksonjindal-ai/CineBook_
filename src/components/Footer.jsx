import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer columns using CSS Grid */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h3>🎬 CineBook</h3>
            <p>
              Your modern platform for booking cinema tickets online. Select your favorite seats,
              enjoy top blockbusters, and experience seamless theater entertainment.
            </p>
            <div className="tech-stack-tag">
              Built with React • Redux Toolkit • Context API • Vite
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Browse Movies</Link></li>
              <li><Link to="/favourites">Watchlist & Favourites</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/about">About CineBook</Link></li>
              <li><Link to="/contact">Help & Contact</Link></li>
              <li><Link to="/login">Account Sign In</Link></li>
              <li><Link to="/signup">Register</Link></li>
            </ul>
          </div>

          {/* Academic Info */}
          <div className="footer-column">
            <h4>College Evaluation</h4>
            <ul>
              <li><span className="footer-info-text">Course: React Front End</span></li>
              <li><span className="footer-info-text">Milestone: Evaluation 2</span></li>
              <li><span className="footer-info-text">Architecture: Redux + Context</span></li>
              <li><span className="footer-info-text">Persistence: LocalStorage</span></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CineBook — Movie Ticket Booking System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
