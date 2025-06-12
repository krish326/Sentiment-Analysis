import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentAnalysisHistory = ({ analyses, onReanalyze }) => {
  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getSentimentColor = (sentiment) => {
    const colors = {
      positive: 'text-success',
      negative: 'text-error',
      neutral: 'text-secondary'
    };
    return colors[sentiment] || 'text-secondary';
  };

  const getSentimentIcon = (sentiment) => {
    const icons = {
      positive: 'TrendingUp',
      negative: 'TrendingDown',
      neutral: 'Minus'
    };
    return icons[sentiment] || 'Minus';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      amazon: 'ShoppingBag',
      flipkart: 'Store'
    };
    return icons[platform] || 'Globe';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      amazon: 'text-orange-600',
      flipkart: 'text-blue-600'
    };
    return colors[platform] || 'text-secondary';
  };

  if (!analyses || analyses.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Recent Analyses
        </h2>
        <span className="text-sm text-text-secondary">
          {analyses.length} recent analysis{analyses.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="block lg:hidden space-y-4">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-smooth"
          >
            <div className="flex items-start space-x-3">
              <Image
                src={analysis.thumbnail}
                alt={analysis.productName}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon
                    name={getPlatformIcon(analysis.platform)}
                    size={14}
                    className={getPlatformColor(analysis.platform)}
                  />
                  <span className="text-xs text-text-muted uppercase font-medium">
                    {analysis.platform}
                  </span>
                </div>
                <h3 className="font-medium text-text-primary mb-2 line-clamp-2">
                  {analysis.productName}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Icon name="Star" size={14} className="text-accent mr-1" />
                      <span className="text-text-secondary">{analysis.averageRating}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="MessageSquare" size={14} className="text-text-muted mr-1" />
                      <span className="text-text-secondary">{analysis.totalReviews}</span>
                    </div>
                  </div>
                  <div className={`flex items-center ${getSentimentColor(analysis.sentiment)}`}>
                    <Icon name={getSentimentIcon(analysis.sentiment)} size={14} className="mr-1" />
                    <span className="text-xs font-medium capitalize">{analysis.sentiment}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-text-muted">
                    {formatDate(analysis.analyzedAt)}
                  </span>
                  <button
                    onClick={() => onReanalyze(analysis.url)}
                    className="flex items-center px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-700 hover:bg-primary-50 rounded-md transition-micro"
                  >
                    <Icon name="RefreshCw" size={12} className="mr-1" />
                    Reanalyze
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Horizontal Scroll */}
      <div className="hidden lg:block">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-smooth flex-shrink-0 w-80"
            >
              <div className="flex items-start space-x-4">
                <Image
                  src={analysis.thumbnail}
                  alt={analysis.productName}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name={getPlatformIcon(analysis.platform)}
                      size={16}
                      className={getPlatformColor(analysis.platform)}
                    />
                    <span className="text-xs text-text-muted uppercase font-medium">
                      {analysis.platform}
                    </span>
                    <div className={`flex items-center ml-auto ${getSentimentColor(analysis.sentiment)}`}>
                      <Icon name={getSentimentIcon(analysis.sentiment)} size={14} className="mr-1" />
                      <span className="text-xs font-medium capitalize">{analysis.sentiment}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-text-primary mb-3 line-clamp-2">
                    {analysis.productName}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center">
                      <Icon name="Star" size={14} className="text-accent mr-1" />
                      <span className="text-text-secondary">{analysis.averageRating}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="MessageSquare" size={14} className="text-text-muted mr-1" />
                      <span className="text-text-secondary">{analysis.totalReviews} reviews</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">
                      {formatDate(analysis.analyzedAt)}
                    </span>
                    <button
                      onClick={() => onReanalyze(analysis.url)}
                      className="flex items-center px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-700 hover:bg-primary-50 rounded-md transition-micro"
                    >
                      <Icon name="RefreshCw" size={12} className="mr-1" />
                      Reanalyze
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentAnalysisHistory;