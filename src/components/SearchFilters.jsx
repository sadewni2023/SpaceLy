import React, { useState } from 'react';

const SearchFilters = ({ onSearch, onClear, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({
      location: '',
      type: 'all',
      status: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      searchQuery: ''
    });
    onClear();
  };

  return (
    <div className="search-section">
      <div className="container">
        <div className="search-container">
          <div className="search-header">
            <h2>Refine Your Search</h2>
            <p>Use our advanced filters to find your perfect property</p>
          </div>
          
          <form onSubmit={handleSubmit} className="filters-form">
            <div className="filter-grid">
              <div className="filter-group">
                <label className="filter-label">
                  <span>📍</span>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={localFilters.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <span>🏠</span>
                  Type
                </label>
                <select
                  name="type"
                  value={localFilters.type}
                  onChange={handleChange}
                  className="filter-select"
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="studio">Studio</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="loft">Loft</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <span>🏷️</span>
                  Status
                </label>
                <select
                  name="status"
                  value={localFilters.status}
                  onChange={handleChange}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div className="price-range-group">
                <label className="filter-label">
                  <span>💰</span>
                  Price Range
                </label>
                <div className="price-inputs">
                  <input
                    type="number"
                    name="minPrice"
                    value={localFilters.minPrice}
                    onChange={handleChange}
                    placeholder="Min Price"
                    className="price-input"
                  />
                  <span className="price-separator">to</span>
                  <input
                    type="number"
                    name="maxPrice"
                    value={localFilters.maxPrice}
                    onChange={handleChange}
                    placeholder="Max Price"
                    className="price-input"
                  />
                </div>
              </div>

              <div className="bedrooms-group">
                <label className="filter-label">
                  <span>🛏️</span>
                  Bedrooms
                </label>
                <select
                  name="bedrooms"
                  value={localFilters.bedrooms}
                  onChange={handleChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1+ Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <span>🔍</span>
                  Keyword
                </label>
                <input
                  type="text"
                  name="searchQuery"
                  value={localFilters.searchQuery}
                  onChange={handleChange}
                  placeholder="Type here to search..."
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-actions">
              <button type="submit" className="btn btn-primary">
                <span>🔍</span>
                Search Properties
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;