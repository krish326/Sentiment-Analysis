import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SearchInput = ({ 
  value, 
  onChange, 
  searchHistory = [], 
  placeholder = "Search...",
  isAdvanced = false 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const mockSuggestions = [
    "delivery issues",
    "product quality",
    "customer service",
    "packaging problems",
    "value for money",
    "fast shipping",
    "excellent quality",
    "poor quality",
    "damaged product",
    "great experience"
  ];

  useEffect(() => {
    if (value) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase()) &&
        suggestion.toLowerCase() !== value.toLowerCase()
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions(searchHistory.slice(0, 5));
    }
  }, [value, searchHistory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-muted" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-micro bg-surface text-text-primary placeholder-text-muted"
        />
        
        {value && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-micro"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>

      {isAdvanced && (
        <div className="mt-2 text-xs text-text-secondary">
          <span className="font-medium">Advanced search:</span> Use quotes for exact phrases, + for required terms, - to exclude terms
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          <div className="py-2">
            {!value && searchHistory.length > 0 && (
              <div className="px-3 py-1 text-xs font-medium text-text-muted uppercase tracking-wide">
                Recent Searches
              </div>
            )}
            
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-3 py-2 text-left hover:bg-secondary-50 transition-micro flex items-center"
              >
                <Icon 
                  name={!value ? "Clock" : "Search"} 
                  size={16} 
                  className="text-text-muted mr-3" 
                />
                <span className="text-text-primary">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;