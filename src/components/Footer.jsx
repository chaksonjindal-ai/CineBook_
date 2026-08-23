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
            <p>Your go-to platform for booking movie tickets online.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#movies">Movies</a></li>
              <li><a href="#popular">Popular</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQs</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2025 CineBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
