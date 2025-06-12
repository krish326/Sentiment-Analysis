import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import SearchInput from './components/SearchInput';
import FilterCategories from './components/FilterCategories';
import SavedFilters from './components/SavedFilters';
import FilterResults from './components/FilterResults';
import QuickFilters from './components/QuickFilters';

const SearchFilterManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [savedFilters, setSavedFilters] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSavedFilters, setShowSavedFilters] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  // Mock data for reviews and filters
  const mockReviews = [
    {
      id: 1,
      text: "Excellent product quality and fast delivery. Highly recommended!",
      sentiment: "positive",
      rating: 5,
      date: "2024-01-15",
      source: "amazon",
      verified: true,
      aspects: ["quality", "delivery"],
      reviewer: { name: "John D.", verified: true }
    },
    {
      id: 2,
      text: "Product arrived damaged. Poor packaging and customer service was unhelpful.",
      sentiment: "negative",
      rating: 2,
      date: "2024-01-10",
      source: "flipkart",
      verified: true,
      aspects: ["packaging", "service"],
      reviewer: { name: "Sarah M.", verified: true }
    },
    {
      id: 3,
      text: "Average product. Nothing special but does the job. Price could be better.",
      sentiment: "neutral",
      rating: 3,
      date: "2024-01-08",
      source: "amazon",
      verified: false,
      aspects: ["price", "quality"],
      reviewer: { name: "Mike R.", verified: false }
    }
  ];

  const mockSavedFilters = [
    {
      id: 1,
      name: "Negative Reviews - Last 30 Days",
      filters: {
        sentiment: ["negative"],
        dateRange: "30days",
        verified: true
      },
      count: 45,
      lastUsed: "2024-01-14"
    },
    {
      id: 2,
      name: "High Rating Amazon Reviews",
      filters: {
        rating: [4, 5],
        source: ["amazon"],
        verified: true
      },
      count: 128,
      lastUsed: "2024-01-12"
    }
  ];

  const mockSearchHistory = [
    "delivery issues",
    "product quality",
    "customer service",
    "packaging problems",
    "value for money"
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setSavedFilters(mockSavedFilters);
    setSearchHistory(mockSearchHistory);
    setFilteredResults(mockReviews);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
    }
    applyFilters({ ...activeFilters, search: query });
  };

  const handleFilterChange = (category, value) => {
    const newFilters = { ...activeFilters };
    
    if (!newFilters[category]) {
      newFilters[category] = [];
    }
    
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter(v => v !== value);
      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let filtered = [...mockReviews];
    
    if (filters.search) {
      filtered = filtered.filter(review => 
        review.text.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.sentiment) {
      filtered = filtered.filter(review => 
        filters.sentiment.includes(review.sentiment)
      );
    }
    
    if (filters.rating) {
      filtered = filtered.filter(review => 
        filters.rating.includes(review.rating)
      );
    }
    
    if (filters.source) {
      filtered = filtered.filter(review => 
        filters.source.includes(review.source)
      );
    }
    
    if (filters.verified !== undefined) {
      filtered = filtered.filter(review => 
        review.verified === filters.verified
      );
    }
    
    setFilteredResults(filtered);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setFilteredResults(mockReviews);
  };

  const saveCurrentFilters = (name) => {
    const newFilter = {
      id: Date.now(),
      name,
      filters: { ...activeFilters, search: searchQuery },
      count: filteredResults.length,
      lastUsed: new Date().toISOString().split('T')[0]
    };
    setSavedFilters(prev => [newFilter, ...prev]);
  };

  const applySavedFilter = (savedFilter) => {
    setActiveFilters(savedFilter.filters);
    setSearchQuery(savedFilter.filters.search || '');
    applyFilters(savedFilter.filters);
    setShowSavedFilters(false);
  };

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).length + (searchQuery ? 1 : 0);
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
        {/* Mobile Header */}
        <div className="bg-surface border-b border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/analysis-results-dashboard')}
              className="p-2 hover:bg-secondary-50 rounded-md transition-micro"
            >
              <Icon name="ArrowLeft" size={24} />
            </button>
            <h1 className="text-lg font-heading font-semibold text-text-primary">
              Search & Filters
            </h1>
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary-700 font-medium"
              disabled={getActiveFilterCount() === 0}
            >
              Clear All
            </button>
          </div>
          
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            searchHistory={searchHistory}
            placeholder="Search reviews..."
          />
          
          {getActiveFilterCount() > 0 && (
            <div className="mt-3 flex items-center text-sm text-text-secondary">
              <Icon name="Filter" size={16} className="mr-1" />
              <span>{getActiveFilterCount()} filters active</span>
              <span className="ml-2 px-2 py-1 bg-primary-50 text-primary rounded-full text-xs">
                {filteredResults.length} results
              </span>
            </div>
          )}
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto">
          <QuickFilters
            onFilterSelect={(filter) => handleFilterChange(filter.category, filter.value)}
            activeFilters={activeFilters}
          />
          
          <FilterCategories
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            resultCounts={mockReviews}
          />
          
          <div className="p-4 border-t border-border">
            <button
              onClick={() => setShowSavedFilters(!showSavedFilters)}
              className="w-full flex items-center justify-between p-3 bg-secondary-50 rounded-lg text-text-primary hover:bg-secondary-100 transition-micro"
            >
              <div className="flex items-center">
                <Icon name="Bookmark" size={20} className="mr-2" />
                <span className="font-medium">Saved Filters</span>
              </div>
              <Icon name={showSavedFilters ? "ChevronUp" : "ChevronDown"} size={20} />
            </button>
            
            {showSavedFilters && (
              <SavedFilters
                savedFilters={savedFilters}
                onApplyFilter={applySavedFilter}
                onSaveCurrentFilter={saveCurrentFilters}
                hasActiveFilters={getActiveFilterCount() > 0}
              />
            )}
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="bg-surface border-t border-border p-4">
          <button
            onClick={() => navigate('/analysis-results-dashboard')}
            className="w-full flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-micro"
          >
            <Icon name="Eye" size={20} className="mr-2" />
            View {filteredResults.length} Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Header */}
        <div className="bg-surface rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Search & Filter Management
              </h1>
              <p className="text-text-secondary">
                Find and filter through analyzed review data with advanced search capabilities
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-micro ${
                  isAdvancedMode
                    ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Advanced Mode
              </button>
              
              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center px-4 py-2 bg-error-50 text-error-700 rounded-lg font-medium hover:bg-error-100 transition-micro"
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Clear All ({getActiveFilterCount()})
                </button>
              )}
            </div>
          </div>
          
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            searchHistory={searchHistory}
            placeholder="Search across all review data..."
            isAdvanced={isAdvancedMode}
          />
          
          {getActiveFilterCount() > 0 && (
            <div className="mt-4 flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <div className="flex items-center text-primary">
                <Icon name="Filter" size={16} className="mr-2" />
                <span className="font-medium">
                  {getActiveFilterCount()} filters active
                </span>
              </div>
              <div className="text-primary font-semibold">
                {filteredResults.length} results found
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickFilters
              onFilterSelect={(filter) => handleFilterChange(filter.category, filter.value)}
              activeFilters={activeFilters}
            />
            
            <FilterCategories
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              resultCounts={mockReviews}
              isAdvanced={isAdvancedMode}
            />
            
            <SavedFilters
              savedFilters={savedFilters}
              onApplyFilter={applySavedFilter}
              onSaveCurrentFilter={saveCurrentFilters}
              hasActiveFilters={getActiveFilterCount() > 0}
            />
          </div>

          {/* Desktop Results */}
          <div className="lg:col-span-3">
            <FilterResults
              results={filteredResults}
              searchQuery={searchQuery}
              activeFilters={activeFilters}
              onNavigateToDetail={(reviewId) => navigate('/individual-review-analysis-detail')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterManagement;