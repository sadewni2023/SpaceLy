import React from 'react';
import { Link } from 'react-router-dom';

const FavouritesPage = ({ favourites, properties, removeFavourite, clearFavourites }) => {
  // Filter properties to show only favourites
  const favouriteProperties = properties.filter(property => 
    favourites.includes(property.id)
  );

  const handleRemoveFavourite = (propertyId) => {
    removeFavourite(propertyId);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favourites?')) {
      clearFavourites();
    }
  };

  const calculateTotalValue = () => {
    return favouriteProperties.reduce((total, property) => total + property.price, 0);
  };

  const calculateAveragePrice = () => {
    if (favouriteProperties.length === 0) return 0;
    return calculateTotalValue() / favouriteProperties.length;
  };

  return (
    <div className="favourites-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Your Favourites</h1>
          <p className="page-subtitle">
            {favouriteProperties.length > 0 
              ? `You have ${favouriteProperties.length} saved properties`
              : 'Start saving your favourite properties'
            }
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {favouriteProperties.length === 0 ? (
            <div className="empty-favourites">
              <div className="empty-state">
                <div className="empty-icon">❤️</div>
                <h2>No Favourite Properties Yet</h2>
                <p>Start exploring our properties and add them to your favourites list.</p>
                <div className="empty-actions">
                  <Link to="/" className="btn btn-primary">
                    Browse Properties
                  </Link>
                </div>
                <div className="empty-tips">
                  <div className="tip">
                    <span className="tip-icon">⭐</span>
                    <span>Click the heart icon on any property card</span>
                  </div>
                  <div className="tip">
                    <span className="tip-icon">👆</span>
                    <span>Drag and drop properties to the favourites sidebar</span>
                  </div>
                  <div className="tip">
                    <span className="tip-icon">📱</span>
                    <span>Access your favourites from any device</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="favourites-header">
                <div className="favourites-stats">
                  <div className="stat-card">
                    <div className="stat-value">{favouriteProperties.length}</div>
                    <div className="stat-label">Properties</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      £{calculateTotalValue().toLocaleString()}
                    </div>
                    <div className="stat-label">Total Value</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      £{calculateAveragePrice().toLocaleString()}
                    </div>
                    <div className="stat-label">Average Price</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      {Math.max(...favouriteProperties.map(p => p.bedrooms))}
                    </div>
                    <div className="stat-label">Max Bedrooms</div>
                  </div>
                </div>
                
                <div className="favourites-actions">
                  <button 
                    onClick={handleClearAll}
                    className="btn btn-secondary"
                  >
                    Clear All Favourites
                  </button>
                  <button className="btn btn-primary">
                    Compare Properties
                  </button>
                  <button className="btn btn-primary">
                    Contact About These
                  </button>
                </div>
              </div>

              <div className="favourites-grid-section">
                <h2>Your Saved Properties</h2>
                <div className="property-grid">
                  {favouriteProperties.map(property => (
                    <div key={property.id} className="property-card">
                      <div className="property-image">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="property-img"
                        />
                        <div className="property-badges">
                          <span className={`status-badge ${property.status}`}>
                            {property.status === 'sale' ? 'FOR SALE' : 'FOR RENT'}
                          </span>
                          <span className="type-badge">{property.type}</span>
                        </div>
                        <button 
                          className="favourite-btn active"
                          onClick={() => handleRemoveFavourite(property.id)}
                        >
                          ❤️
                        </button>
                      </div>
                      <div className="property-content">
                        <div className="property-header">
                          <h3 className="property-title">{property.title}</h3>
                          <div className="property-price">
                            £{property.price.toLocaleString()}
                          </div>
                        </div>
                        <p className="property-location">
                          <span>📍</span> {property.location}
                        </p>
                        <div className="property-features">
                          <div className="feature">
                            <span>🛏️</span>
                            <span>{property.bedrooms} beds</span>
                          </div>
                          <div className="feature">
                            <span>🛁</span>
                            <span>{property.bathrooms || 1} baths</span>
                          </div>
                          <div className="feature">
                            <span>📐</span>
                            <span>{property.sqft.toLocaleString()} sqft</span>
                          </div>
                        </div>
                        <p className="property-description">
                          {property.description?.substring(0, 100)}...
                        </p>
                        <div className="property-footer">
                          <Link to={`/property/${property.id}`} className="btn btn-view">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;