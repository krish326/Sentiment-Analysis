import React from 'react';
import Icon from 'components/AppIcon';

const ReviewTextCard = ({ review, onFlag, onBookmark, onAddNote, isBookmarked }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-text-primary">{review.reviewerInfo.name}</h3>
              {review.reviewerInfo.verified && (
                <div className="flex items-center text-success text-xs">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Verified
                </div>
              )}
            </div>
            <div className="text-sm text-text-secondary">
              {formatDate(review.reviewerInfo.reviewDate)} • {review.reviewerInfo.helpfulVotes} found helpful
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onFlag}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
            aria-label="Flag review"
          >
            <Icon name="Flag" size={16} />
          </button>
          <button
            onClick={onBookmark}
            className={`p-2 rounded-md transition-micro ${
              isBookmarked 
                ? 'text-accent bg-accent-50 hover:bg-accent-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
            }`}
            aria-label="Bookmark review"
          >
            <Icon name="Bookmark" size={16} />
          </button>
          <button
            onClick={onAddNote}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
            aria-label="Add note"
          >
            <Icon name="StickyNote" size={16} />
          </button>
        </div>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <p className="text-text-primary leading-relaxed whitespace-pre-line">
          {review.reviewText}
        </p>
      </div>
    </div>
  );
};

export default ReviewTextCard;