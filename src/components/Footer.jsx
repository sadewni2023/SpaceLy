import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-bg"></div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-logo">
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
                <h3>Space<span style={{ color: 'var(--primary)' }}>Ly</span></h3>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px' }}>
                Your trusted partner in finding the perfect property. 
                We connect you with your dream home.
              </p>
              <div className="social-links" style={{ display: 'flex', gap: '12px' }}>
                <a href="#" style={{ color: 'white' }}>f</a>
                <a href="#" style={{ color: 'white' }}>𝕏</a>
                <a href="#" style={{ color: 'white' }}>in</a>
                <a href="#" style={{ color: 'white' }}>ig</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><a href="#properties">Properties</a></li>
                <li><a href="#agents">Our Agents</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Property Types</h4>
              <ul className="footer-links">
                <li><a href="#houses">Houses</a></li>
                <li><a href="#apartments">Apartments</a></li>
                <li><a href="#studios">Studios</a></li>
                <li><a href="#penthouses">Penthouses</a></li>
                <li><a href="#townhouses">Townhouses</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span>📍</span>
                  <span>123 Property Street, London</span>
                </div>
                <div className="contact-item">
                  <span>📞</span>
                  <span>+44 7123 4568</span>
                </div>
                <div className="contact-item">
                  <span>✉️</span>
                  <span>info@spacely.co.uk</span>
                </div>
                <div className="contact-item">
                  <span>🕒</span>
                  <span>Mon-Fri: 9am-6pm</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {currentYear} Spacely. All rights reserved.</p>
            <p style={{ marginTop: '8px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
              This website is for educational purposes. All property listings are fictional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;