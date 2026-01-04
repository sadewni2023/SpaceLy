import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedSection = ({ properties }) => {
  const featuredProperties = properties.slice(0, 3);

  return (
    <section className="featured-section">
      <div className="container">
        <div className="featured-content">
          <h2 className="featured-title">Featured Properties</h2>
          <p className="featured-subtitle">
            Discover our exclusive collection of premium properties.
          </p>
          
          <div className="featured-grid">
            {featuredProperties.map(property => (
              <div key={property.id} className="featured-card">
                <div className="featured-card-image">
                  <img src={property.image} alt={property.title} />
                </div>
                <div className="featured-card-content">
                  <h4>{property.title}</h4>
                  <p>{property.description}</p>
                  <div className="property-features">
                    <span>🛏️ {property.bedrooms} beds</span>
                    <span>🛁 {property.bathrooms} baths</span>
                    <span>📐 {property.sqft} sqft</span>
                  </div>
                  <Link 
                    to={`/property/${property.id}`} 
                    className="btn btn-primary"
                    style={{ marginTop: '16px', display: 'inline-block' }}
                  >
                    View Property
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;