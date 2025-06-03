import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Groway</div>
      <ul className="nav-links">
        <li><a href="#home">Plans and Pricing</a></li>
        <li><a href="#features">Test List</a></li>
        <li><a href="#pricing">Start Test</a></li>
        {/* Remove login and signup */}
        <li>
          <a href="#get-started" className="get-started-btn">
            Get Started
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

