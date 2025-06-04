import React from 'react';
import './landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="hero">
        <h1>Discover Yourself</h1>
        <p>Take a personalized test and explore your strengths.</p>
        <button className="hero-btn">Start Test</button>
      </section>

      <section className="quote">
        <img src="/assets/change-yourself.jpg" alt="Change Yourself" className="quote-img" />
        <h2>If you want to change the world, start with yourself.</h2>
      </section>

      <section className="categories" id="categories">
        <h2>Choose Your Category</h2>
        <div className="category-grid">
          {['Aptitude', 'Personality', 'Skills'].map((cat) => (
            <div key={cat} className="category-card">
              <h3>{cat}</h3>
              <p>Take a test to explore your {cat.toLowerCase()}.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Groway. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;