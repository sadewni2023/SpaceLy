import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyTabs from './PropertyTabs';
import { useDrag } from 'react-dnd';

const PropertyDetail = ({ properties, favourites, onToggleFavourite }) => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const property = properties.find(p => p.id === id);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'property',
    item: { id: property?.id, type: 'property' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  if (!property) {
    return (
      <div className="property-not-found">
        <div className="container">
          <div className="not-found-content">
            <h2>Property Not Found</h2>
            <p>The property you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="btn btn-primary">
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isFavourite = favourites.includes(property.id);
  
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    document.getElementById('lightbox-modal').classList.add('active');
  };

  const closeLightbox = () => {
    document.getElementById('lightbox-modal').classList.remove('active');
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.gallery.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.gallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="property-detail-page">
      {/* Hero Section */}
      <div className="property-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span> / </span>
            <Link to="/#properties">Properties</Link>
            <span> / </span>
            <span>{property.location}</span>
          </div>
          
          <div className="property-hero-content">
            <div className="property-hero-text">
              <h1 className="property-main-title">{property.title || `${property.type} in ${property.location}`}</h1>
              <div className="property-hero-meta">
                <span className="property-price-large">
                  {formatPrice(property.price)}
                </span>
                <span className="property-location-large">
                  <span className="location-icon">📍</span>
                  {property.location}, {property.postcode}
                </span>
                <span className={`property-status-badge ${property.status}`}>
                  {property.status === 'sale' ? 'FOR SALE' : 'FOR RENT'}
                </span>
              </div>
            </div>
            
            <div className="property-hero-actions">
              <button 
                className={`btn-favourite-large ${isFavourite ? 'active' : ''}`}
                onClick={() => onToggleFavourite(property.id)}
              >
                <span className="heart-icon-large">
                  {isFavourite ? '❤️' : '🤍'}
                </span>
                {isFavourite ? 'Saved' : 'Save Property'}
              </button>
              <button className="btn-contact-agent">
                📞 Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="property-detail-content">
          {/* Image Gallery */}
          <div className="property-gallery-section">
            <div className="gallery-header">
              <h2>Property Images</h2>
              <button 
                className="btn-view-all"
                onClick={() => openLightbox(0)}
              >
                👁️ View All Images ({property.gallery?.length || 0})
              </button>
            </div>
            
            <div className="thumbnail-grid">
              {property.gallery?.slice(0, 6).map((image, index) => (
                <div 
                  key={index}
                  className="thumbnail-item"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image} 
                    alt={`Property view ${index + 1}`}
                    className="thumbnail-img"
                    onError={(e) => {
                      e.target.src = 'Thumbnail.avif';
                    }}
                  />
                  {index === 5 && property.gallery?.length > 6 && (
                    <div className="thumbnail-overlay">
                      +{property.gallery.length - 6} more
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="property-info-grid">
            <div className="property-main-info">
              <div className="property-detail-section">
                <PropertyTabs property={property} />
              </div>
            </div>

            <div className="property-sidebar">
              <div className="sidebar-card">
                <h4 className="sidebar-title">Quick Actions</h4>
                <div className="quick-actions">
                  <button 
                    className={`btn-quick-fav ${isFavourite ? 'active' : ''}`}
                    onClick={() => onToggleFavourite(property.id)}
                  >
                    {isFavourite ? '❤️ Remove from Favourites' : '🤍 Add to Favourites'}
                  </button>
                  <button className="btn-schedule-viewing">
                    📅 Schedule Viewing
                  </button>
                  <button className="btn-share">
                    🔗 Share Property
                  </button>
                </div>
              </div>

              <div className="sidebar-card">
                <h4 className="sidebar-title">Property Summary</h4>
                <div className="summary-details">
                  <div className="summary-item">
                    <span className="summary-label">Type:</span>
                    <span className="summary-value">{property.type}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Bedrooms:</span>
                    <span className="summary-value">{property.bedrooms}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Bathrooms:</span>
                    <span className="summary-value">{property.bathrooms || 1}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Tenure:</span>
                    <span className="summary-value">{property.tenure}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Added:</span>
                    <span className="summary-value">
                      {property.added?.day} {property.added?.month} {property.added?.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <div id="lightbox-modal" className="lightbox-modal">
        <div className="lightbox-content">
          <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button>
          
          <img 
            src={property.gallery?.[currentImageIndex] || property.picture} 
            alt={`Property view ${currentImageIndex + 1}`}
            className="lightbox-main-image"
            onError={(e) => {
              e.target.src = 'Thumbnail.avif';
            }}
          />
          
          <button className="lightbox-nav lightbox-prev" onClick={goToPreviousImage}>
            ‹
          </button>
          <button className="lightbox-nav lightbox-next" onClick={goToNextImage}>
            ›
          </button>
          
          <div className="lightbox-thumbnails">
            {property.gallery?.map((image, index) => (
              <div 
                key={index}
                className={`lightbox-thumb ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'Thumbnail.avif';
                  }}
                />
              </div>
            ))}
          </div>
          
          <div className="lightbox-counter">
            {currentImageIndex + 1} / {property.gallery?.length || 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;