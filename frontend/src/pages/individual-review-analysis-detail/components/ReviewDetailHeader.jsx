import React from 'react';
import Icon from 'components/AppIcon';

const ReviewDetailHeader = ({ currentIndex, totalReviews, onClose, onShare }) => {
  return (
    <div className="sticky top-16 bg-surface border-b border-border z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
            aria-label="Close review detail"
          >
            <Icon name="X" size={20} />
          </button>
          <div className="text-sm font-medium text-text-primary">
            Review {currentIndex} of {totalReviews}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onShare}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
            aria-label="Share review"
          >
            <Icon name="Share2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailHeader;