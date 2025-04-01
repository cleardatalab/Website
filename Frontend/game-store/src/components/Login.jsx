import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './login.css'

function Login() {
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const navigate = useNavigate(); 

  const handleusernameChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8082/api/users/login', data);
    
      if (response.status === 200) {
        const userData = response.data; 
        localStorage.setItem("userId", userData.id); 
        navigate('/main'); 
      } else {
        alert('Invalid User ID or Password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
    
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <p className="title">Login</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="email"
              placeholder="Enter your user ID"
              value={email}
              onChange={handleusernameChange}
              required
            />
          </div>
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
          <button className="sign" type="submit">Sign in</button>
        </form>
        <p className="signup">
          Don't have an account? <Link to="/register" className="register-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
