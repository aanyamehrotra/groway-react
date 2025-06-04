import React from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  return (
    <div className="login-signup-container">
      <h2>Login or Signup</h2>
      <form className="login-signup-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="#">Sign Up</a></p>
      </form>
    </div>
  );
};

export default LoginSignup;
