import React, { useState } from 'react';
import './landing.css';

const Landing = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="landing-container">
      <section className="hero">
        <h1>Discover Your True Potential</h1>
        <p>Take our personalized assessment and unlock insights about your strengths and abilities.</p>
        <button className="hero-btn">Start Your Journey</button>
      </section>

      <section className="quote">
        <img src="/assets/change-yourself.jpg" alt="Personal Growth" className="quote-img" />
        <h2>"If you want to change the world, start with yourself."</h2>
      </section>

      <section className="categories" id="categories">
        <h2>Explore Your Growth Areas</h2>
        <div className="category-grid">
          {['Aptitude', 'Personality', 'Skills'].map((cat) => (
            <div key={cat} className="category-card">
              <h3>{cat}</h3>
              <p>Discover and develop your {cat.toLowerCase()} through our comprehensive assessment.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Get in Touch</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Groway. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;