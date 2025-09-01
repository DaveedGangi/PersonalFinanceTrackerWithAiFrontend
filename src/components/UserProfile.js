// src/pages/UserProfile.js
import React from "react";
//import { Redirect } from "react-router-dom";
import "./UserProfile.css";
import axios from "axios";
import { useState, useEffect } from "react";

import Navbar from "../pages/Navbar";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://personalfinancewithaidaveed.onrender.com/auth/me", { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loading">
      <i className="fas fa-spinner fa-spin"></i>
      <h2>Loading...</h2>
    </div>
  );
  
  if (!user) return (
    <div className="error-message">
      <h2>Please login first</h2>
      <p>Your session may have expired.</p>
      <a href="/login">Go to Login</a>
    </div>
  );

  const handleLogout = async () => {
    try {
      await axios.get("https://personalfinancewithaidaveed.onrender.com/auth/logout", { withCredentials: true });
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      window.location.href = "/"; // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div> <Navbar/>
    <div className="profile-page">
    
    <div className="profile-container">
      <div className="profile-sidebar">
        {user.avatar && (
          <img src={user.avatar} alt="Profile" className="profile-picture" />
        )}
        <h1 className="profile-name">Welcome, {user.name}</h1>
        <p className="profile-email">{user.email}</p>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span>Member since</span>
            <span>Jan 2023</span>
          </div>
          <div className="stat-item">
            <span>Transactions</span>
            <span>142</span>
          </div>
          <div className="stat-item">
            <span>Categories</span>
            <span>8</span>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-card">
          <h2>User Profile</h2>
          <div className="welcome-message">
            Welcome! You are logged in 🎉
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email Address</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Status</span>
              <span className="info-value">Active</span>
            </div>
            <div className="info-item">
              <span className="info-label">User ID</span>
              <span className="info-value">{user.id || 'N/A'}</span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="edit-button">
              <i className="fas fa-edit"></i>
              Edit Profile
            </button>
            <button className="logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
        
        <div className="profile-card financial-section">
          <h2>Financial Overview</h2>
          <div className="financial-cards">
            <div className="financial-card">
              <div className="card-title">Total Balance</div>
              <div className="card-value">$12,458.75</div>
              <div className="card-change">
                <i className="fas fa-arrow-up"></i>
                <span>2.5% from last month</span>
              </div>
            </div>
            
            <div className="financial-card income">
              <div className="card-title">Income</div>
              <div className="card-value">$5,250.00</div>
              <div className="card-change">
                <i className="fas fa-arrow-up"></i>
                <span>4.2% from last month</span>
              </div>
            </div>
            
            <div className="financial-card expenses">
              <div className="card-title">Expenses</div>
              <div className="card-value">$3,125.50</div>
              <div className="card-change">
                <i className="fas fa-arrow-down"></i>
                <span>1.8% from last month</span>
              </div>
            </div>
            
            <div className="financial-card savings">
              <div className="card-title">Savings</div>
              <div className="card-value">$2,083.25</div>
              <div className="card-change">
                <i className="fas fa-arrow-up"></i>
                <span>3.7% from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default UserProfile;