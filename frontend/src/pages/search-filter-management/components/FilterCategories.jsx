import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterCategories = ({ 
  activeFilters, 
  onFilterChange, 
  resultCounts = [], 
  isAdvanced = false 
}) => {
  const [expandedCategories, setExpandedCategories] = useState({
    sentiment: true,
    rating: true,
    source: true
  });

  const filterCategories = [
    {
      id: 'sentiment',
      label: 'Sentiment',
      icon: 'Heart',
      options: [
        { value: 'positive', label: 'Positive', color: 'text-success', count: 156 },
        { value: 'negative', label: 'Negative', color: 'text-error', count: 89 },
        { value: 'neutral', label: 'Neutral', color: 'text-secondary', count: 45 }
      ]
    },
    {
      id: 'rating',
      label: 'Rating',
      icon: 'Star',
      options: [
        { value: 5, label: '5 Stars', count: 120 },
        { value: 4, label: '4 Stars', count: 85 },
        { value: 3, label: '3 Stars', count: 45 },
        { value: 2, label: '2 Stars', count: 25 },
        { value: 1, label: '1 Star', count: 15 }
      ]
    },
    {
      id: 'source',
      label: 'Source Platform',
      icon: 'Globe',
      options: [
        { value: 'amazon', label: 'Amazon', count: 180 },
        { value: 'flipkart', label: 'Flipkart', count: 110 }
      ]
    },
    {
      id: 'verified',
      label: 'Verification Status',
      icon: 'Shield',
      options: [
        { value: true, label: 'Verified Purchase', count: 220 },
        { value: false, label: 'Unverified', count: 70 }
      ]
    },
    {
      id: 'dateRange',
      label: 'Date Range',
      icon: 'Calendar',
      options: [
        { value: '7days', label: 'Last 7 days', count: 45 },
        { value: '30days', label: 'Last 30 days', count: 120 },
        { value: '90days', label: 'Last 3 months', count: 200 },
        { value: '1year', label: 'Last year', count: 290 }
      ]
    }
  ];

  if (isAdvanced) {
    filterCategories.push(
      {
        id: 'aspects',
        label: 'Product Aspects',
        icon: 'Tag',
        options: [
          { value: 'quality', label: 'Quality', count: 145 },
          { value: 'delivery', label: 'Delivery', count: 98 },
          { value: 'packaging', label: 'Packaging', count: 67 },
          { value: 'service', label: 'Customer Service', count: 54 },
          { value: 'price', label: 'Price/Value', count: 89 }
        ]
      },
      {
        id: 'reviewLength',
        label: 'Review Length',
        icon: 'FileText',
        options: [
          { value: 'short', label: 'Short (< 50 words)', count: 78 },
          { value: 'medium', label: 'Medium (50-150 words)', count: 156 },
          { value: 'long', label: 'Long (> 150 words)', count: 56 }
        ]
      }
    );
  }

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const isOptionActive = (categoryId, optionValue) => {
    return activeFilters[categoryId]?.includes(optionValue) || false;
  };

  const getActiveCount = (categoryId) => {
    return activeFilters[categoryId]?.length || 0;
  };

  const clearCategoryFilters = (categoryId) => {
    if (activeFilters[categoryId]) {
      activeFilters[categoryId].forEach(value => {
        onFilterChange(categoryId, value);
      });
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filters
        </h3>
      </div>

      <div className="divide-y divide-border">
        {filterCategories.map((category) => {
          const isExpanded = expandedCategories[category.id];
          const activeCount = getActiveCount(category.id);

          return (
            <div key={category.id} className="p-4">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between text-left mb-3 hover:text-primary transition-micro"
              >
                <div className="flex items-center">
                  <Icon name={category.icon} size={16} className="mr-2" />
                  <span className="font-medium text-text-primary">
                    {category.label}
                  </span>
                  {activeCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                      {activeCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {activeCount > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearCategoryFilters(category.id);
                      }}
                      className="mr-2 p-1 text-text-muted hover:text-error transition-micro"
                      title="Clear filters"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-text-muted" 
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="space-y-2">
                  {category.options.map((option) => {
                    const isActive = isOptionActive(category.id, option.value);
                    
                    return (
                      <label
                        key={option.value}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-secondary-50 cursor-pointer transition-micro"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => onFilterChange(category.id, option.value)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500 focus:ring-2"
                          />
                          <span className={`ml-3 text-sm ${option.color || 'text-text-primary'}`}>
                            {option.label}
                          </span>
                        </div>
                        <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded">
                          {option.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCategories;