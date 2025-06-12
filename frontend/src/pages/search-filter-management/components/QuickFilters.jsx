import React from 'react';
import Icon from 'components/AppIcon';

const QuickFilters = ({ onFilterSelect, activeFilters }) => {
  const quickFilters = [
    {
      label: 'Negative Reviews',
      icon: 'ThumbsDown',
      category: 'sentiment',
      value: 'negative',
      color: 'bg-error-50 text-error-700 border-error-200 hover:bg-error-100'
    },
    {
      label: 'Recent Feedback',
      icon: 'Clock',
      category: 'dateRange',
      value: '7days',
      color: 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100'
    },
    {
      label: 'Verified Purchases',
      icon: 'Shield',
      category: 'verified',
      value: true,
      color: 'bg-success-50 text-success-700 border-success-200 hover:bg-success-100'
    },
    {
      label: 'High Ratings',
      icon: 'Star',
      category: 'rating',
      value: 5,
      color: 'bg-accent-50 text-accent-700 border-accent-200 hover:bg-accent-100'
    },
    {
      label: 'Amazon Reviews',
      icon: 'Globe',
      category: 'source',
      value: 'amazon',
      color: 'bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100'
    },
    {
      label: 'Quality Issues',
      icon: 'AlertTriangle',
      category: 'aspects',
      value: 'quality',
      color: 'bg-warning-50 text-warning-700 border-warning-200 hover:bg-warning-100'
    }
  ];

  const isFilterActive = (filter) => {
    return activeFilters[filter.category]?.includes(filter.value) || false;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="Zap" size={20} className="mr-2" />
        Quick Filters
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
        {quickFilters.map((filter, index) => {
          const isActive = isFilterActive(filter);
          
          return (
            <button
              key={index}
              onClick={() => onFilterSelect(filter)}
              className={`flex items-center px-3 py-2 rounded-lg border text-sm font-medium transition-micro ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : filter.color
              }`}
            >
              <Icon name={filter.icon} size={16} className="mr-2" />
              {filter.label}
              {isActive && (
                <Icon name="Check" size={14} className="ml-auto" />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-muted">
          Click any filter above for instant results, or use the detailed filters below for more precise control.
        </p>
      </div>
    </div>
  );
};

export default QuickFilters;