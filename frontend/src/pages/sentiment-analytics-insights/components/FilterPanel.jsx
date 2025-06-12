import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange }) => {
  const filterOptions = {
    source: [
      { value: 'all', label: 'All Sources' },
      { value: 'amazon', label: 'Amazon' },
      { value: 'flipkart', label: 'Flipkart' }
    ],
    verified: [
      { value: 'all', label: 'All Reviews' },
      { value: 'verified', label: 'Verified Only' },
      { value: 'unverified', label: 'Unverified Only' }
    ],
    rating: [
      { value: 'all', label: 'All Ratings' },
      { value: '5', label: '5 Stars' },
      { value: '4', label: '4 Stars' },
      { value: '3', label: '3 Stars' },
      { value: '2', label: '2 Stars' },
      { value: '1', label: '1 Star' }
    ],
    helpfulness: [
      { value: 'all', label: 'All Reviews' },
      { value: 'helpful', label: 'Helpful (>10 votes)' },
      { value: 'very_helpful', label: 'Very Helpful (>50 votes)' }
    ]
  };

  const handleReset = () => {
    Object.keys(filters).forEach(key => {
      onFilterChange(key, 'all');
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-300"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-surface shadow-lg z-400 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Advanced Filters
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Review Source */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Review Source
              </label>
              <div className="space-y-2">
                {filterOptions.source.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="source"
                      value={option.value}
                      checked={filters.source === option.value}
                      onChange={(e) => onFilterChange('source', e.target.value)}
                      className="mr-3 text-primary focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-secondary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Verification Status
              </label>
              <div className="space-y-2">
                {filterOptions.verified.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="verified"
                      value={option.value}
                      checked={filters.verified === option.value}
                      onChange={(e) => onFilterChange('verified', e.target.value)}
                      className="mr-3 text-primary focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-secondary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Rating Filter
              </label>
              <div className="space-y-2">
                {filterOptions.rating.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={option.value}
                      checked={filters.rating === option.value}
                      onChange={(e) => onFilterChange('rating', e.target.value)}
                      className="mr-3 text-primary focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-secondary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Helpfulness */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Review Helpfulness
              </label>
              <div className="space-y-2">
                {filterOptions.helpfulness.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="helpfulness"
                      value={option.value}
                      checked={filters.helpfulness === option.value}
                      onChange={(e) => onFilterChange('helpfulness', e.target.value)}
                      className="mr-3 text-primary focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-secondary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-8 pt-6 border-t border-border">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-micro"
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-micro"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;