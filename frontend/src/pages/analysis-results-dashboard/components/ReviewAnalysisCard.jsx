import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ReviewAnalysisCard = ({ review, viewMode, onViewDetails }) => {
  const navigate = useNavigate();

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-warning';
    }
  };

  const getSentimentBgColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'bg-success-50 border-success-200';
      case 'negative': return 'bg-error-50 border-error-200';
      default: return 'bg-warning-50 border-warning-200';
    }
  };

  const getScoreColor = (score) => {
    if (score > 0.5) return 'text-success';
    if (score < -0.5) return 'text-error';
    return 'text-warning';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleViewDetails = () => {
    navigate('/individual-review-analysis-detail', { 
      state: { reviewId: review.id, review: review } 
    });
  };

  return (
    <div className="card p-6 hover:shadow-md transition-smooth">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-text-primary">
              {review.reviewer}
            </h3>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span>{formatDate(review.date)}</span>
              {review.verified && (
                <span className="flex items-center text-success">
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={`${
                  i < review.rating
                    ? 'text-warning fill-current' :'text-secondary-300'
                }`}
              />
            ))}
            <span className="ml-1 text-sm font-medium text-text-primary">
              {review.rating}
            </span>
          </div>

          {/* Overall Sentiment */}
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentBgColor(review.overallSentiment)} ${getSentimentColor(review.overallSentiment)}`}>
            {review.overallSentiment}
          </span>
        </div>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <p className="text-text-secondary leading-relaxed">
          {review.reviewText}
        </p>
      </div>

      {/* Aspect Sentiments */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">
          Aspect Analysis
        </h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(review.aspectSentiments).map(([aspect, data]) => (
            <div 
              key={aspect}
              className="flex items-center px-3 py-1 bg-secondary-50 rounded-full text-xs"
            >
              <span className="text-text-secondary capitalize mr-2">
                {aspect}:
              </span>
              <span className={`font-medium ${getSentimentColor(data.sentiment)}`}>
                {data.sentiment}
              </span>
              <span className={`ml-1 ${getScoreColor(data.score)}`}>
                ({data.score > 0 ? '+' : ''}{data.score.toFixed(2)})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <span className="flex items-center">
            <Icon name="ThumbsUp" size={14} className="mr-1" />
            {review.helpfulVotes} helpful
          </span>
          <span className="flex items-center">
            <Icon name="TrendingUp" size={14} className="mr-1" />
            {Math.abs(review.sentimentScore * 100).toFixed(0)}% confidence
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleViewDetails}
            className="flex items-center px-3 py-1.5 text-sm text-primary hover:text-primary-700 hover:bg-primary-50 rounded-md transition-micro"
          >
            <Icon name="Eye" size={14} className="mr-1" />
            View Details
          </button>
          <button className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
            <Icon name="MoreHorizontal" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalysisCard;