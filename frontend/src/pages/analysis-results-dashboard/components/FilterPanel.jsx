import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange, reviewsData }) => {
  const sentimentOptions = [
    { value: 'all', label: 'All Sentiments' },
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' }
  ];

  const aspectOptions = [
    { value: 'quality', label: 'Quality' },
    { value: 'value', label: 'Value for Money' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'features', label: 'Features' },
    { value: 'connectivity', label: 'Connectivity' },
    { value: 'support', label: 'Customer Support' }
  ];

  const handleAspectToggle = (aspect) => {
    const currentAspects = filters.aspects || [];
    const newAspects = currentAspects.includes(aspect)
      ? currentAspects.filter(a => a !== aspect)
      : [...currentAspects, aspect];
    onFilterChange('aspects', newAspects);
  };

  const clearAllFilters = () => {
    onFilterChange('sentiment', 'all');
    onFilterChange('rating', 'all');
    onFilterChange('dateRange', 'all');
    onFilterChange('aspects', []);
  };

  const getFilterCount = () => {
    let count = 0;
    if (filters.sentiment !== 'all') count++;
    if (filters.rating !== 'all') count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.aspects && filters.aspects.length > 0) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-lg z-400 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                Filters
              </h2>
              {getFilterCount() > 0 && (
                <p className="text-sm text-text-secondary mt-1">
                  {getFilterCount()} filter{getFilterCount() > 1 ? 's' : ''} applied
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Sentiment Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Sentiment
            </h3>
            <div className="space-y-2">
              {sentimentOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="sentiment"
                    value={option.value}
                    checked={filters.sentiment === option.value}
                    onChange={(e) => onFilterChange('sentiment', e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary-500 border-border"
                  />
                  <span className="ml-3 text-sm text-text-secondary">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Rating
            </h3>
            <div className="space-y-2">
              {ratingOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={option.value}
                    checked={filters.rating === option.value}
                    onChange={(e) => onFilterChange('rating', e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary-500 border-border"
                  />
                  <span className="ml-3 text-sm text-text-secondary">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Date Range
            </h3>
            <div className="space-y-2">
              {dateRangeOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="dateRange"
                    value={option.value}
                    checked={filters.dateRange === option.value}
                    onChange={(e) => onFilterChange('dateRange', e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary-500 border-border"
                  />
                  <span className="ml-3 text-sm text-text-secondary">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Aspect Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Review Aspects
            </h3>
            <div className="space-y-2">
              {aspectOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={filters.aspects?.includes(option.value) || false}
                    onChange={() => handleAspectToggle(option.value)}
                    className="w-4 h-4 text-primary focus:ring-primary-500 border-border rounded"
                  />
                  <span className="ml-3 text-sm text-text-secondary">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={clearAllFilters}
              className="flex-1 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg font-medium hover:bg-secondary-200 transition-micro"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-micro"
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