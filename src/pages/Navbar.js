import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";




function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // state to track mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-page">
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="brand">
            <div className="logo">
              <span>💰</span>
            </div>
            <h1 className="brand-name">Finance Tracker</h1>
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>
          </div>

          <div className={`nav-links ${isOpen ? "active" : ""}`}>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/transactions" className="nav-link">Transactions</Link>
            <Link to="/budget" className="nav-link">Budget</Link>
            <Link to="/reports" className="nav-link">Reports</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
