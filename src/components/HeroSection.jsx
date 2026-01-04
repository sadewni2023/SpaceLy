import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg"></div>
      
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect Property
          </h1>
          
          <p className="hero-subtitle">
            Discover exclusive properties with premium amenities. 
            Your dream home is just a search away.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Properties</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;