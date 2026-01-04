import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';

const PropertyCard = ({ property, isFavourite, onToggleFavourite }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'property',
    item: { id: property.id, type: 'property' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const formatPrice = (price, status) => {
    if (status === 'rent') {
      return `£${price}/month`;
    }
    return `£${price.toLocaleString()}`;
  };

  // Image fallback function
  const getPropertyImage = () => {
    // Always return a working image URL
    return property.image || property.picture || `https://picsum.photos/800/600?random=${property.id.replace('prop', '')}`;
  };

  return (
    <div 
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="property-image">
        <img 
          src={getPropertyImage()} 
          alt={property.title || property.location}
          className="property-img"
          onError={(e) => {
            // Multiple fallbacks
            e.target.src = `/images/properties/default.jpg`;
            e.target.onerror = null; // Prevent infinite loop
          }}
        />
        <div className="property-badges">
          <span className={`status-badge ${property.status}`}>
            {property.status === 'sale' ? 'FOR SALE' : 'FOR RENT'}
          </span>
          <span className="type-badge">
            {property.type}
          </span>
        </div>
        
        <button 
          className={`favourite-btn ${isFavourite ? 'active' : ''}`}
          onClick={() => onToggleFavourite(property.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
        
        <div className="drag-hint">
          👆 Drag to favourites
        </div>
      </div>
      
      <div className="property-content">
        <div className="property-header">
          <h3 className="property-title">{property.title || `${property.bedrooms} Bedroom ${property.type}`}</h3>
          <div className="property-price">
            {formatPrice(property.price, property.status)}
          </div>
        </div>
        
        <p className="property-location">
          <span>📍</span>
          {property.location}
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
            <span>{(property.sqft || 1000).toLocaleString()} sqft</span>
          </div>
        </div>
        
        <p className="property-description">
          {property.description?.substring(0, 100)}...
        </p>
        
        <div className="property-footer">
          <Link to={`/property/${property.id}`} className="btn btn-view">
            View Details
          </Link>
          <div className="property-agent">
            <span>Agent: {property.agent || 'Professional Agent'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyGrid = ({ properties, favourites, onToggleFavourite }) => {
  console.log('PropertyGrid rendering with', properties.length, 'properties');

  if (properties.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🏠</div>
        <h3>No properties found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="property-grid">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavourite={favourites.includes(property.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;