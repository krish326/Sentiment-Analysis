import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState('input');
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'New Analysis',
      path: '/product-url-input-analysis-setup',
      icon: 'Plus',
      phase: 'input'
    },
    {
      label: 'Dashboard',
      path: '/analysis-results-dashboard',
      icon: 'BarChart3',
      phase: 'results'
    },
    {
      label: 'Review Details',
      path: '/individual-review-analysis-detail',
      icon: 'FileText',
      phase: 'detailed'
    },
    {
      label: 'Analytics',
      path: '/sentiment-analytics-insights',
      icon: 'TrendingUp',
      phase: 'insights'
    },
    {
      label: 'Search & Filters',
      path: '/search-filter-management',
      icon: 'Search',
      phase: 'utility'
    }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navigationItems.find(item => item.path === currentPath);
    if (currentItem) {
      setAnalysisPhase(currentItem.phase);
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  const getPrimaryAction = () => {
    switch (analysisPhase) {
      case 'input':
        return { label: 'Start Analysis', icon: 'Play' };
      case 'results':
        return { label: 'Export Results', icon: 'Download' };
      case 'detailed':
        return { label: 'Share Analysis', icon: 'Share2' };
      case 'insights':
        return { label: 'Generate Report', icon: 'FileBarChart' };
      default:
        return { label: 'New Analysis', icon: 'Plus' };
    }
  };

  const primaryAction = getPrimaryAction();

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-100">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer transition-micro hover:opacity-80"
              onClick={() => handleNavigation('/analysis-results-dashboard')}
            >
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mr-3">
                <Icon name="BarChart3" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                ReviewAnalyzer
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name={item.icon} size={16} className="mr-2" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-micro focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <Icon name={primaryAction.icon} size={16} className="mr-2" />
              {primaryAction.label}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-micro"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-down">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-3 py-3 rounded-md text-sm font-medium transition-micro ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={item.icon} size={18} className="mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-border">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-micro">
                <Icon name={primaryAction.icon} size={16} className="mr-2" />
                {primaryAction.label}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;