import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password,
    };

    try {
      await axios.post('http://localhost:8082/api/users/register', userData);
      alert('Registration Successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <p className="title">Register</p>
        <form className="form" onSubmit={handleSubmit}>

          {/* Email Field */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* Register Button */}
          <button className="register" type="submit">Register</button>
        </form>

        <p className="registerlink">
          Already have an account? <Link to="/login" className="register-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
