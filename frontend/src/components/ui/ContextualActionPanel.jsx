import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ContextualActionPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getContextualActions = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/analysis-results-dashboard':
        return [
          { label: 'Filter Results', icon: 'Filter', action: () => console.log('Filter') },
          { label: 'Sort by Rating', icon: 'ArrowUpDown', action: () => console.log('Sort') },
          { label: 'Export Data', icon: 'Download', action: () => console.log('Export') },
          { label: 'Refresh Analysis', icon: 'RefreshCw', action: () => console.log('Refresh') }
        ];
      
      case '/sentiment-analytics-insights':
        return [
          { label: 'Sentiment Filter', icon: 'Heart', action: () => console.log('Sentiment') },
          { label: 'Time Range', icon: 'Calendar', action: () => console.log('Time Range') },
          { label: 'Chart Type', icon: 'BarChart3', action: () => console.log('Chart Type') },
          { label: 'Export Chart', icon: 'Image', action: () => console.log('Export Chart') }
        ];
      
      case '/individual-review-analysis-detail':
        return [
          { label: 'Previous Review', icon: 'ChevronLeft', action: () => console.log('Previous') },
          { label: 'Next Review', icon: 'ChevronRight', action: () => console.log('Next') },
          { label: 'Flag Review', icon: 'Flag', action: () => console.log('Flag') },
          { label: 'Share Review', icon: 'Share2', action: () => console.log('Share') }
        ];
      
      case '/search-filter-management':
        return [
          { label: 'Advanced Search', icon: 'Search', action: () => console.log('Advanced Search') },
          { label: 'Save Filter', icon: 'Bookmark', action: () => console.log('Save Filter') },
          { label: 'Clear All', icon: 'X', action: () => console.log('Clear All') },
          { label: 'Apply Filters', icon: 'Check', action: () => console.log('Apply') }
        ];
      
      default:
        return [
          { label: 'Quick Actions', icon: 'Zap', action: () => console.log('Quick Actions') },
          { label: 'Help', icon: 'HelpCircle', action: () => console.log('Help') }
        ];
    }
  };

  const actions = getContextualActions();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Floating Action Button */}
        <button
          onClick={togglePanel}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 transition-micro z-200 flex items-center justify-center"
          aria-label="Open contextual actions"
        >
          <Icon name={isOpen ? 'X' : 'Settings'} size={24} />
        </button>

        {/* Mobile Slide-up Panel */}
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-200"
              onClick={togglePanel}
            />
            <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-lg shadow-lg z-300 animate-slide-up">
              <div className="p-4">
                <div className="w-12 h-1 bg-secondary-300 rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.action();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-left text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
                    >
                      <Icon name={action.icon} size={20} className="mr-3" />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-200">
      <div className={`bg-surface border border-border rounded-lg shadow-md transition-smooth ${
        isOpen ? 'w-64' : 'w-12'
      }`}>
        {/* Toggle Button */}
        <button
          onClick={togglePanel}
          className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-micro"
          aria-label="Toggle contextual panel"
        >
          <Icon name={isOpen ? 'ChevronRight' : 'Settings'} size={20} />
        </button>

        {/* Desktop Panel Content */}
        {isOpen && (
          <div className="p-4 pt-0">
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
              Quick Actions
            </h3>
            <div className="space-y-1">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
                >
                  <Icon name={action.icon} size={16} className="mr-3" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextualActionPanel;