import React, { useState } from 'react';
import { getFloorPlanImage, getMapImage } from '../imageData';

const PropertyTabs = ({ property }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'floorPlan', label: 'Floor Plan' },
    { id: 'map', label: 'Location' }
  ];

  // Get floor plan and map images
  const floorPlanImage = getFloorPlanImage(property.id);
  const mapImage = getMapImage(property.id);

  return (
    <div className="property-detail-tabs">
      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {/* Description Tab */}
        <div className={`tab-pane ${activeTab === 'description' ? 'active' : ''}`}>
          <div className="long-description">
            <div dangerouslySetInnerHTML={{ __html: property.longDescription }} />
            
            <div className="property-features-details">
              <h3>Property Features</h3>
              <div className="features-grid">
                {property.features?.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Floor Plan Tab */}
        <div className={`tab-pane ${activeTab === 'floorPlan' ? 'active' : ''}`}>
          <div className="floor-plan-container">
            <div className="floor-plan-header">
              <h3>{property.bedrooms} Bedroom {property.type} Floor Plan</h3>
              <p>Total Area: {(property.sqft || 1200).toLocaleString()} sqft</p>
            </div>
            
            <div className="floor-plan-image-container">
              <img 
                src={floorPlanImage} 
                alt={`Floor plan for ${property.location}`}
                className="floor-plan-image"
                onError={(e) => {
                  e.target.src = 'floor-plan.avif';
                }}
              />
            </div>
            
            <div className="floor-plan-details">
              <div className="floor-plan-detail">
                <div className="detail-icon">🛏️</div>
                <div className="detail-value">{property.bedrooms}</div>
                <div className="detail-label">Bedrooms</div>
              </div>
              <div className="floor-plan-detail">
                <div className="detail-icon">🛁</div>
                <div className="detail-value">{property.bathrooms || 1}</div>
                <div className="detail-label">Bathrooms</div>
              </div>
              <div className="floor-plan-detail">
                <div className="detail-icon">📐</div>
                <div className="detail-value">{(property.sqft || 1200).toLocaleString()}</div>
                <div className="detail-label">Square Feet</div>
              </div>
              <div className="floor-plan-detail">
                <div className="detail-icon">🏠</div>
                <div className="detail-value">{property.type}</div>
                <div className="detail-label">Property Type</div>
              </div>
            </div>
            
            <div className="floor-plan-notes">
              <h4>Floor Plan Notes:</h4>
              <ul>
                <li>Dimensions are approximate</li>
                <li>Room sizes may vary</li>
                <li>Layout subject to verification</li>
                <li>All measurements are in feet</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Map Tab */}
        <div className={`tab-pane ${activeTab === 'map' ? 'active' : ''}`}>
          <div className="map-container">
            <div className="map-image-container">
              <img 
                src={mapImage} 
                alt={`Map location of ${property.location}`}
                className="map-image"
                onError={(e) => {
                  // Fallback to static map if Google Maps API fails
                  e.target.src = `https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=${encodeURIComponent(property.location)}`;
                }}
              />
              <div className="map-marker">
                <div className="marker-pin"></div>
                <div className="marker-label">📍 Property Location</div>
              </div>
            </div>
            
            <div className="location-info">
              <h3>Location Details</h3>
              
              <div className="address-details">
                <div className="address-item">
                  <span className="address-label">Full Address:</span>
                  <span className="address-value">{property.location}, {property.postcode}</span>
                </div>
                <div className="address-item">
                  <span className="address-label">Coordinates:</span>
                  <span className="address-value">
                    {property.coordinates?.lat?.toFixed(4)}, {property.coordinates?.lng?.toFixed(4)}
                  </span>
                </div>
              </div>
              
              <div className="nearby-amenities">
                <h4>Nearby Amenities</h4>
                <div className="amenities-grid">
                  <div className="amenity">
                    <span className="amenity-icon">🚇</span>
                    <span className="amenity-text">Public Transport</span>
                    <span className="amenity-distance">5-10 min walk</span>
                  </div>
                  <div className="amenity">
                    <span className="amenity-icon">🛒</span>
                    <span className="amenity-text">Supermarkets</span>
                    <span className="amenity-distance">10-15 min walk</span>
                  </div>
                  <div className="amenity">
                    <span className="amenity-icon">🏫</span>
                    <span className="amenity-text">Schools</span>
                    <span className="amenity-distance">15-20 min walk</span>
                  </div>
                  <div className="amenity">
                    <span className="amenity-icon">🏥</span>
                    <span className="amenity-text">Medical Facilities</span>
                    <span className="amenity-distance">10-15 min drive</span>
                  </div>
                  <div className="amenity">
                    <span className="amenity-icon">🌳</span>
                    <span className="amenity-text">Parks</span>
                    <span className="amenity-distance">5-10 min walk</span>
                  </div>
                  <div className="amenity">
                    <span className="amenity-icon">🍽️</span>
                    <span className="amenity-text">Restaurants</span>
                    <span className="amenity-distance">5-10 min walk</span>
                  </div>
                </div>
              </div>
              
              <div className="transport-links">
                <h4>Transport Links</h4>
                <div className="transport-list">
                  <div className="transport-item">
                    <span className="transport-mode">🚇 Tube/Underground:</span>
                    <span className="transport-info">Nearest station 0.5 miles</span>
                  </div>
                  <div className="transport-item">
                    <span className="transport-mode">🚌 Bus Routes:</span>
                    <span className="transport-info">Multiple routes within 0.2 miles</span>
                  </div>
                  <div className="transport-item">
                    <span className="transport-mode">🚗 Parking:</span>
                    <span className="transport-info">{property.type === 'House' ? 'Private driveway' : 'Street parking'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyTabs;