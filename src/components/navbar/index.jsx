// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">E-Learning</Link>
        <Link to="/courses" className="navbar-link">Courses</Link>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="navbar-button">Login</Link>
        <Link to="/register" className="navbar-button">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
