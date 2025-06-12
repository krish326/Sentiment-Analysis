import React from 'react';
import Icon from 'components/AppIcon';

const SimilarReviewsPanel = ({ currentReview, similarCount }) => {
  // Mock similar reviews data
  const similarReviews = [
    {
      id: 4,
      snippet: "Great quality product, shipping was fast and customer service was helpful when I had questions...",
      sentiment: 'Positive',
      score: 0.82,
      similarity: 0.89,
      reviewer: "Alex K.",
      date: "2024-01-12"
    },
    {
      id: 5,
      snippet: "The build quality is impressive and feels premium. Worth the price for the quality you get...",
      sentiment: 'Positive',
      score: 0.75,
      similarity: 0.76,
      reviewer: "Maria S.",
      date: "2024-01-10"
    },
    {
      id: 6,
      snippet: "Decent product overall. Quality is good but the price could be better. Shipping was standard...",
      sentiment: 'Neutral',
      score: 0.15,
      similarity: 0.68,
      reviewer: "David L.",
      date: "2024-01-08"
    }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-success bg-success-50';
      case 'negative':
        return 'text-error bg-error-50';
      case 'neutral':
        return 'text-secondary bg-secondary-50';
      default:
        return 'text-secondary bg-secondary-50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short'
    });
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Similar Reviews Count */}
      <div className="card p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Similar Reviews</h3>
        </div>
        <div className="text-2xl font-bold text-text-primary mb-1">
          {similarCount}
        </div>
        <div className="text-sm text-text-secondary">
          reviews with similar sentiment patterns
        </div>
      </div>

      {/* Similar Reviews List */}
      <div className="card p-4">
        <h4 className="font-medium text-text-primary mb-4">Most Similar Reviews</h4>
        <div className="space-y-4">
          {similarReviews.map((review) => (
            <div key={review.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">
                    {review.reviewer}
                  </span>
                  <span className="text-xs text-text-muted">
                    {formatDate(review.date)}
                  </span>
                </div>
                <div className="text-xs text-text-secondary">
                  {(review.similarity * 100).toFixed(0)}% match
                </div>
              </div>
              
              <p className="text-sm text-text-secondary mb-3 line-clamp-3">
                {review.snippet}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(review.sentiment)}`}>
                  {review.sentiment}
                </span>
                <div className="text-xs text-text-secondary">
                  {Math.abs(review.score * 100).toFixed(0)}% strength
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 px-4 py-2 text-sm text-primary hover:text-primary-700 hover:bg-primary-50 rounded-md transition-micro">
          View All Similar Reviews
        </button>
      </div>

      {/* Sentiment Distribution */}
      <div className="card p-4">
        <h4 className="font-medium text-text-primary mb-4">Sentiment Distribution</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-text-secondary">Positive</span>
            </div>
            <span className="text-sm font-medium text-text-primary">68%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-sm text-text-secondary">Neutral</span>
            </div>
            <span className="text-sm font-medium text-text-primary">22%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm text-text-secondary">Negative</span>
            </div>
            <span className="text-sm font-medium text-text-primary">10%</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Info" size={14} />
            <span>Based on {currentReview.productContext.totalReviews.toLocaleString('en-IN')} total reviews</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-4">
        <h4 className="font-medium text-text-primary mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
            <Icon name="Filter" size={16} className="mr-2" />
            Filter Similar Reviews
          </button>
          <button className="w-full flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
            <Icon name="Download" size={16} className="mr-2" />
            Export Analysis
          </button>
          <button className="w-full flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
            <Icon name="BarChart3" size={16} className="mr-2" />
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarReviewsPanel;