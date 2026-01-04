import React from 'react';
import { Link } from 'react-router-dom';
import { useDrop } from 'react-dnd';

const FavouriteItem = ({ property, onRemove }) => {
  const formatPrice = (price, status) => {
    if (status === 'rent') {
      return `£${price}/month`;
    }
    return `£${price.toLocaleString()}`;
  };

  return (
    <div className="favourite-item">
      <div className="favourite-image">
        <img 
          src={property.image} 
          alt={property.title}
          className="favourite-img"
        />
      </div>
      
      <div className="favourite-content">
        <div className="favourite-header">
          <h4 className="favourite-title">{property.title}</h4>
          <button 
            className="remove-btn"
            onClick={() => onRemove(property.id)}
            aria-label="Remove from favourites"
          >
            ✕
          </button>
        </div>
        
        <div className="favourite-details">
          <div className="favourite-price">
            {formatPrice(property.price, property.status)}
          </div>
          <div className="favourite-location">
            <span>•</span>
            {property.location}
          </div>
        </div>
        
        <div className="favourite-features">
          <span className="feature-pill">{property.bedrooms} beds</span>
          <span className="feature-pill">{property.bathrooms} baths</span>
          <span className="feature-pill">{property.sqft} sqft</span>
        </div>
        
        <div className="favourite-actions">
          <Link to={`/property/${property.id}`} className="btn-favourite-view">
            View Property
          </Link>
          
        </div>
      </div>
    </div>
  );
};

const FavouritesSidebar = ({ favourites, properties, onRemoveFavourite, onClearFavourites, onAddFavourite }) => {
  const favouriteProperties = properties.filter(p => favourites.includes(p.id));

  const [{ isOver }, drop] = useDrop({
    accept: 'property',
    drop: (item) => {
      if (!favourites.includes(item.id)) {
        onAddFavourite(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div 
      className={`favourites-sidebar ${isOver ? 'drag-over' : ''}`}
      ref={drop}
    >
      <div className="sidebar-header">
        <div className="sidebar-title">
          <h3>⭐ My Favourites</h3>
          <span className="favourite-count">{favouriteProperties.length}</span>
        </div>
        
        {favouriteProperties.length > 0 && (
          <button 
            className="btn-clear-all"
            onClick={onClearFavourites}
            aria-label="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="sidebar-content">
        {favouriteProperties.length === 0 ? (
          <div className="empty-favourites">
            <div className="drop-zone">
              <div className="drop-icon">👇</div>
              <h4>No favourites yet</h4>
              <p>Drag properties here or click the heart icon to add them</p>
              <div className="drag-instructions">
                <p>• Click 🤍 on any property</p>
                <p>• Or drag and drop properties here</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="favourites-list">
              {favouriteProperties.map(property => (
                <FavouriteItem
                  key={property.id}
                  property={property}
                  onRemove={onRemoveFavourite}
                />
              ))}
            </div>
            
            <div className="sidebar-stats">
              <div className="stat-card">
                <div className="stat-value">
                  £{Math.max(...favouriteProperties.map(p => p.price)).toLocaleString()}
                </div>
                <div className="stat-label">Highest Price</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{favouriteProperties.length}</div>
                <div className="stat-label">Properties</div>
              </div>
            </div>
            
            <div className="sidebar-actions">
              <button className="btn-compare">
                Compare Properties
              </button>
              <button className="btn-contact">
                Contact Agents
              </button>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritesSidebar;