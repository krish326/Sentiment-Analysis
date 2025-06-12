import React from 'react';
import Icon from 'components/AppIcon';

const ReviewNavigation = ({ currentIndex, totalReviews, onPrevious, onNext }) => {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          className="flex items-center px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
          aria-label="Previous review"
        >
          <Icon name="ChevronLeft" size={20} className="mr-2" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">
            Review {currentIndex + 1} of {totalReviews}
          </div>
          
          {/* Progress Dots */}
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(totalReviews, 5) }, (_, index) => {
              let dotIndex;
              if (totalReviews <= 5) {
                dotIndex = index;
              } else {
                // Show current review in center with 2 dots on each side
                const start = Math.max(0, currentIndex - 2);
                const end = Math.min(totalReviews - 1, start + 4);
                const adjustedStart = Math.max(0, end - 4);
                dotIndex = adjustedStart + index;
              }
              
              return (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-micro ${
                    dotIndex === currentIndex ? 'bg-primary' : 'bg-secondary-200'
                  }`}
                />
              );
            })}
          </div>
        </div>
        
        <button
          onClick={onNext}
          className="flex items-center px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
          aria-label="Next review"
        >
          <span className="hidden sm:inline">Next</span>
          <Icon name="ChevronRight" size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ReviewNavigation;