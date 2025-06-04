import React from 'react';
import './Navbar.css';  // <-- Make sure the path is correct relative to your component

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Groway</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Test List</a></li>
        <li><a href="#pricing">Plans and Pricing</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;




