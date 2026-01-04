import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">About Our Estate Agency</h1>
          <p className="page-subtitle">Excellence in property since 2005</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="about-section">
            <div className="about-grid">
              <div className="about-content">
                <h2>Our Story</h2>
                <p>
                  Founded in 2005, our estate agency has been helping families and individuals 
                  find their dream homes for nearly two decades. We started as a small local 
                  agency and have grown into one of the most trusted names in the property market.
                </p>
                <p>
                  Our philosophy is simple: treat every client like family and every property 
                  like it's our own. We believe that buying or selling a home should be an 
                  exciting journey, not a stressful experience.
                </p>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-number">18+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">5,000+</div>
                    <div className="stat-label">Properties Sold</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">25+</div>
                    <div className="stat-label">Expert Agents</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Client Satisfaction</div>
                  </div>
                </div>
              </div>
              
              <div className="about-image">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop" 
                  alt="Our office"
                />
              </div>
            </div>

            <div className="values-section">
              <h2>Our Values</h2>
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon">🤝</div>
                  <h3>Trust & Integrity</h3>
                  <p>We believe in honest, transparent communication with all our clients.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🎯</div>
                  <h3>Expertise</h3>
                  <p>Our agents have extensive knowledge of local property markets.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">❤️</div>
                  <h3>Client Focus</h3>
                  <p>Your needs always come first in everything we do.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🚀</div>
                  <h3>Innovation</h3>
                  <p>We use the latest technology to make property transactions seamless.</p>
                </div>
              </div>
            </div>

            <div className="team-preview">
              <h2>Meet Our Leadership</h2>
              <div className="team-grid">
                <div className="team-member">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop" 
                    alt="Sarah Johnson"
                  />
                  <h3>Sarah Johnson</h3>
                  <p className="position">Managing Director</p>
                  <p>15+ years in property management</p>
                </div>
                <div className="team-member">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop" 
                    alt="Michael Chen"
                  />
                  <h3>Michael Chen</h3>
                  <p className="position">Head of Sales</p>
                  <p>Specialist in luxury properties</p>
                </div>
                <div className="team-member">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop" 
                    alt="Emma Wilson"
                  />
                  <h3>Emma Wilson</h3>
                  <p className="position">Operations Manager</p>
                  <p>10+ years customer service experience</p>
                </div>
              </div>
              <div className="text-center">
                <Link to="/agents" className="btn btn-primary">
                  View All Agents
                </Link>
              </div>
            </div>

            <div className="cta-section">
              <h2>Ready to Find Your Dream Home?</h2>
              <p>Contact us today for a free property consultation</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">
                  Get in Touch
                </Link>
                <Link to="/" className="btn btn-secondary">
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;