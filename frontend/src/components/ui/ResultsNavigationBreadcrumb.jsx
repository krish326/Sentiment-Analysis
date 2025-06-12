import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ResultsNavigationBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbMap = {
    '/product-url-input-analysis-setup': [
      { label: 'Home', path: '/', icon: 'Home' },
      { label: 'New Analysis', path: '/product-url-input-analysis-setup', icon: 'Plus' }
    ],
    '/analysis-results-dashboard': [
      { label: 'Home', path: '/', icon: 'Home' },
      { label: 'Analysis Results', path: '/analysis-results-dashboard', icon: 'BarChart3' }
    ],
    '/individual-review-analysis-detail': [
      { label: 'Home', path: '/', icon: 'Home' },
      { label: 'Dashboard', path: '/analysis-results-dashboard', icon: 'BarChart3' },
      { label: 'Review Details', path: '/individual-review-analysis-detail', icon: 'FileText' }
    ],
    '/sentiment-analytics-insights': [
      { label: 'Home', path: '/', icon: 'Home' },
      { label: 'Dashboard', path: '/analysis-results-dashboard', icon: 'BarChart3' },
      { label: 'Analytics & Insights', path: '/sentiment-analytics-insights', icon: 'TrendingUp' }
    ],
    '/search-filter-management': [
      { label: 'Home', path: '/', icon: 'Home' },
      { label: 'Dashboard', path: '/analysis-results-dashboard', icon: 'BarChart3' },
      { label: 'Search & Filters', path: '/search-filter-management', icon: 'Search' }
    ]
  };

  const currentBreadcrumbs = breadcrumbMap[location.pathname] || [
    { label: 'Home', path: '/', icon: 'Home' }
  ];

  const handleNavigation = (path) => {
    if (path === '/') {
      navigate('/analysis-results-dashboard');
    } else {
      navigate(path);
    }
  };

  if (currentBreadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {currentBreadcrumbs.map((crumb, index) => {
          const isLast = index === currentBreadcrumbs.length - 1;
          const isClickable = !isLast && crumb.path;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-muted mx-2" 
                />
              )}
              
              {isClickable ? (
                <button
                  onClick={() => handleNavigation(crumb.path)}
                  className="flex items-center hover:text-text-primary transition-micro focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-sm px-1 py-0.5"
                  aria-label={`Navigate to ${crumb.label}`}
                >
                  <Icon 
                    name={crumb.icon} 
                    size={14} 
                    className="mr-1.5" 
                  />
                  <span className="hidden sm:inline">{crumb.label}</span>
                  <span className="sm:hidden">
                    {crumb.label.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <span 
                  className={`flex items-center ${
                    isLast ? 'text-text-primary font-medium' : 'text-text-secondary'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  <Icon 
                    name={crumb.icon} 
                    size={14} 
                    className="mr-1.5" 
                  />
                  <span className="hidden sm:inline">{crumb.label}</span>
                  <span className="sm:hidden">
                    {crumb.label.split(' ')[0]}
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ResultsNavigationBreadcrumb;