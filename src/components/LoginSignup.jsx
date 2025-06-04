import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle login/signup logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-signup-container">
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <div className="toggle-form">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <a href="#" onClick={(e) => {
            e.preventDefault();
            setIsLogin(!isLogin);
          }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;