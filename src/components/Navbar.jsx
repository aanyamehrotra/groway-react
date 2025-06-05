import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onLoginClick, onNavigation, currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleNavClick = (section) => {
    setIsMenuOpen(false);
    onNavigation(section);
    
    if (section === 'pricing' || section === 'contact') {
      const element = document.getElementById(`${section}-section`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo" onClick={() => handleNavClick('home')}>
        Groway
      </div>
      <button 
        className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#" onClick={() => handleNavClick('home')}>Home</a></li>
        <li><a href="#" onClick={() => handleNavClick('test')}>Test List</a></li>
        <li><a href="#" onClick={() => handleNavClick('pricing')}>Plans & Pricing</a></li>
        <li><a href="#" onClick={() => handleNavClick('contact')}>Contact</a></li>
        <li><button className="get-started-btn" onClick={onLoginClick}>Get Started</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;