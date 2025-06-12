import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterResults = ({ 
  results, 
  searchQuery, 
  activeFilters, 
  onNavigateToDetail 
}) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('list');

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'date', label: 'Date (Newest)', icon: 'Calendar' },
    { value: 'rating', label: 'Rating (Highest)', icon: 'Star' },
    { value: 'sentiment', label: 'Sentiment', icon: 'Heart' }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success bg-success-50 border-success-100';
      case 'negative': return 'text-error bg-error-50 border-error-100';
      case 'neutral': return 'text-secondary bg-secondary-50 border-secondary-100';
      default: return 'text-text-muted bg-secondary-50 border-border';
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < rating ? "Star" : "Star"}
        size={14}
        className={i < rating ? "text-accent fill-current" : "text-secondary-300"}
      />
    ));
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent-100 text-accent-700 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getActiveFilterSummary = () => {
    const filterCount = Object.keys(activeFilters).length + (searchQuery ? 1 : 0);
    if (filterCount === 0) return 'All reviews';
    
    const parts = [];
    if (searchQuery) parts.push(`"${searchQuery}"`);
    if (activeFilters.sentiment) parts.push(`${activeFilters.sentiment.join(', ')} sentiment`);
    if (activeFilters.rating) parts.push(`${activeFilters.rating.join(', ')} star rating`);
    if (activeFilters.source) parts.push(`from ${activeFilters.source.join(', ')}`);
    
    return parts.join(', ');
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Results Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Search Results
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {results.length} results found for: {getActiveFilterSummary()}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-secondary-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-micro ${
                  viewMode === 'list' ?'bg-surface text-primary shadow-sm' :'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-micro ${
                  viewMode === 'grid' ?'bg-surface text-primary shadow-sm' :'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
            </div>
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-micro"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="p-4">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              No results found
            </h3>
            <p className="text-text-secondary mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-text-muted">
              <Icon name="Lightbulb" size={16} />
              <span>Try searching for "quality", "delivery", or "service"</span>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {results.map((review) => (
              <div
                key={review.id}
                className="border border-border rounded-lg p-4 hover:border-primary-200 transition-micro cursor-pointer"
                onClick={() => onNavigateToDetail(review.id)}
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {getRatingStars(review.rating)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(review.sentiment)}`}>
                      {review.sentiment}
                    </span>
                    {review.verified && (
                      <div className="flex items-center text-xs text-success">
                        <Icon name="Shield" size={12} className="mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-xs text-text-muted">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    {formatDate(review.date)}
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-3">
                  <p className="text-text-primary leading-relaxed">
                    {highlightSearchTerm(review.text, searchQuery)}
                  </p>
                </div>

                {/* Review Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-text-muted">
                      <Icon name="User" size={14} className="mr-1" />
                      {review.reviewer.name}
                    </div>
                    
                    <div className="flex items-center text-text-muted">
                      <Icon name="Globe" size={14} className="mr-1" />
                      <span className="capitalize">{review.source}</span>
                    </div>
                  </div>
                  
                  {review.aspects && review.aspects.length > 0 && (
                    <div className="flex items-center space-x-1">
                      {review.aspects.slice(0, 2).map((aspect) => (
                        <span
                          key={aspect}
                          className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full"
                        >
                          {aspect}
                        </span>
                      ))}
                      {review.aspects.length > 2 && (
                        <span className="text-xs text-text-muted">
                          +{review.aspects.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Footer */}
      {results.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Showing {results.length} of {results.length} results
            </p>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
                <Icon name="Download" size={16} className="mr-2" />
                Export Results
              </button>
              
              <button className="flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
                <Icon name="Share2" size={16} className="mr-2" />
                Share Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterResults;