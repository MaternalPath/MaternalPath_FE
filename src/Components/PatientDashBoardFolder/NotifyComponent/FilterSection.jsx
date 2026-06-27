import React from 'react';
import { FiSearch, FiCheck } from 'react-icons/fi';
import './Css/FilterSection.css';

const FilterSection = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery, isMobile }) => {
  const desktopFilters = [
    'All Notifications',
    'Pregnancy Updates', 
    'Health Reminders',
    'Wallet Alerts',
    'Hospital Notifications'
  ];

  const mobileFilters = ['All', 'Pregnancy', 'Health', 'Wallet', 'Hospital'];
  const filters = isMobile ? mobileFilters : desktopFilters;

  return (
    <div className="cardQuick filter-card">
      <div className="filters">
        {filters.map((filter, idx) => (
          <button 
            key={filter}
            className={`filter-btn ${(isMobile ? idx === 0 : activeFilter === filter) ? 'active' : ''}`}
            onClick={() => !isMobile && setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="search-box">
        <FiSearch size={16} />
        <input 
          type="text" 
          placeholder={isMobile ? "Search notifications" : "Search notifications..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button className="mark-read-btn">
        <FiCheck size={14} /> Mark All as Read
      </button>
    </div>
  );
};

export default FilterSection;