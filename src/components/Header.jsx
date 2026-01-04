import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ favourites = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo with Link to Home */}
          <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
            {/* Option 1: Image Logo */}
            <div className="logo-symbol">
              <img 
                src="/logo.png" 
                alt="EstatePro Logo"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '🏠';
                }}
              />
            </div>
            
            {/* Option 2: Text-only Logo (fallback) */}
            <div className="logo-text">
              <h1 style={{ 
                fontSize: '28px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Space<span style={{ color: '#06b6d4' }}>Ly</span>
              </h1>
              <div className="logo-subtitle">Find Your Modern Property</div>
            </div>
          </Link>

          {/* Navigation - Use React Router Links */}
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Properties
            </Link>
            
            <Link 
              to="/agents" 
              className={`nav-link ${isActive('/agents') ? 'active' : ''}`}
            >
              Agents
            </Link>
            
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact
            </Link>
            
            <Link 
              to="/favourites" 
              className="btn-favourites"
              style={{ textDecoration: 'none' }}
            >
              <span>❤️</span>
              Favourites
              {favourites.length > 0 && (
                <span style={{ 
                  marginLeft: '8px',
                  background: '#ef4444',
                  color: 'white',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {favourites.length}
                </span>
              )}
            </Link>
          </nav>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px'
            }}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;