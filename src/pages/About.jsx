import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About CineBook</h1>
        <p className="about-tagline">
          Your one-stop platform for booking movie tickets online.
        </p>

        <div className="about-content">
          <div className="about-card">
            <span className="about-icon">🎬</span>
            <h3>Our Mission</h3>
            <p>
              We make movie ticket booking simple and fast. No long queues,
              no hassle — just pick your movie and book.
            </p>
          </div>

          <div className="about-card">
            <span className="about-icon">🎫</span>
            <h3>Easy Booking</h3>
            <p>
              Browse movies, choose your showtime, select seats, and you're
              done. The whole process takes less than a minute.
            </p>
          </div>

          <div className="about-card">
            <span className="about-icon">💻</span>
            <h3>Built with React</h3>
            <p>
              This project is built using React with Vite, React Router,
              and modern CSS as part of our Front End Engineering course.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
