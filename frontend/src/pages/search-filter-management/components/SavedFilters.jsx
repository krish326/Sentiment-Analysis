import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SavedFilters = ({ 
  savedFilters, 
  onApplyFilter, 
  onSaveCurrentFilter, 
  hasActiveFilters 
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSaveFilter = () => {
    if (filterName.trim()) {
      onSaveCurrentFilter(filterName.trim());
      setFilterName('');
      setShowSaveDialog(false);
    }
  };

  const formatFilterSummary = (filters) => {
    const parts = [];
    
    if (filters.sentiment) {
      parts.push(`${filters.sentiment.length} sentiment${filters.sentiment.length > 1 ? 's' : ''}`);
    }
    if (filters.rating) {
      parts.push(`${filters.rating.length} rating${filters.rating.length > 1 ? 's' : ''}`);
    }
    if (filters.source) {
      parts.push(`${filters.source.length} source${filters.source.length > 1 ? 's' : ''}`);
    }
    if (filters.search) {
      parts.push(`search: "${filters.search}"`);
    }
    
    return parts.join(', ') || 'No filters';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary flex items-center">
            <Icon name="Bookmark" size={20} className="mr-2" />
            Saved Filters
          </h3>
          
          {hasActiveFilters && (
            <button
              onClick={() => setShowSaveDialog(true)}
              className="flex items-center px-3 py-1.5 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-micro"
            >
              <Icon name="Plus" size={14} className="mr-1" />
              Save Current
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {savedFilters.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bookmark" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-2">No saved filters yet</p>
            <p className="text-sm text-text-muted">
              Apply some filters and save them for quick access
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedFilters.slice(0, isExpanded ? savedFilters.length : 3).map((filter) => (
              <div
                key={filter.id}
                className="p-3 border border-border rounded-lg hover:border-primary-200 transition-micro"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">
                      {filter.name}
                    </h4>
                    <p className="text-sm text-text-secondary mb-2">
                      {formatFilterSummary(filter.filters)}
                    </p>
                    <div className="flex items-center text-xs text-text-muted">
                      <Icon name="Calendar" size={12} className="mr-1" />
                      <span>Last used: {formatDate(filter.lastUsed)}</span>
                      <span className="mx-2">•</span>
                      <span>{filter.count} results</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onApplyFilter(filter)}
                    className="ml-3 flex items-center px-3 py-1.5 bg-primary-50 text-primary rounded-md text-sm font-medium hover:bg-primary-100 transition-micro"
                  >
                    <Icon name="Play" size={14} className="mr-1" />
                    Apply
                  </button>
                </div>
              </div>
            ))}
            
            {savedFilters.length > 3 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-2 text-sm text-primary hover:text-primary-700 font-medium transition-micro"
              >
                {isExpanded ? 'Show Less' : `Show ${savedFilters.length - 3} More`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Save Current Filters
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Filter Name
                </label>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="e.g., Negative Reviews - Electronics"
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-micro"
                  autoFocus
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowSaveDialog(false);
                    setFilterName('');
                  }}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary transition-micro"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFilter}
                  disabled={!filterName.trim()}
                  className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-micro"
                >
                  Save Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedFilters;