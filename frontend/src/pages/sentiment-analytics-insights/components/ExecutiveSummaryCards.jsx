import React from 'react';
import Icon from 'components/AppIcon';

const ExecutiveSummaryCards = ({ summary }) => {
  const cards = [
    {
      title: 'Total Reviews',
      value: summary.totalReviews.toLocaleString(),
      icon: 'MessageSquare',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      change: null
    },
    {
      title: 'Average Rating',
      value: summary.averageRating.toFixed(1),
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      change: null
    },
    {
      title: 'Sentiment Score',
      value: `${summary.sentimentScore}%`,
      icon: 'Heart',
      color: 'text-success',
      bgColor: 'bg-success-50',
      change: {
        direction: summary.trendDirection,
        percentage: summary.trendPercentage
      }
    },
    {
      title: 'vs Competitors',
      value: summary.competitorComparison === 'above' ? 'Above Average' : 'Below Average',
      icon: 'TrendingUp',
      color: summary.competitorComparison === 'above' ? 'text-success' : 'text-error',
      bgColor: summary.competitorComparison === 'above' ? 'bg-success-50' : 'bg-error-50',
      change: null
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
            {card.change && (
              <div className={`flex items-center text-sm ${
                card.change.direction === 'up' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={card.change.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                  className="mr-1" 
                />
                {card.change.percentage}%
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {card.value}
          </div>
          <div className="text-sm text-text-secondary">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExecutiveSummaryCards;