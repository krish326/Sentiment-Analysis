import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AspectBasedAnalysis = ({ aspects }) => {
  const [selectedAspect, setSelectedAspect] = useState(null);

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-success bg-success-50 border-success-200';
      case 'negative':
        return 'text-error bg-error-50 border-error-200';
      case 'neutral':
        return 'text-secondary bg-secondary-50 border-secondary-200';
      default:
        return 'text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      case 'neutral':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getScorePercentage = (score) => {
    return Math.abs(score * 100).toFixed(0);
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Aspect-Based Sentiment Analysis
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {aspects.map((aspect, index) => (
          <button
            key={index}
            onClick={() => setSelectedAspect(selectedAspect === index ? null : index)}
            className={`p-4 rounded-lg border-2 text-left transition-micro hover:shadow-sm ${
              selectedAspect === index 
                ? 'border-primary bg-primary-50' 
                : `border-transparent ${getSentimentColor(aspect.sentiment)}`
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-text-primary">{aspect.aspect}</span>
              <Icon name={getSentimentIcon(aspect.sentiment)} size={16} />
            </div>
            
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(aspect.sentiment)}`}>
                {aspect.sentiment}
              </span>
              <span className="text-sm font-semibold text-text-primary">
                {getScorePercentage(aspect.score)}%
              </span>
            </div>
            
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  aspect.sentiment.toLowerCase() === 'positive' ? 'bg-success' :
                  aspect.sentiment.toLowerCase() === 'negative' ? 'bg-error' : 'bg-secondary'
                }`}
                style={{ width: `${getScorePercentage(aspect.score)}%` }}
              />
            </div>
          </button>
        ))}
      </div>
      
      {/* Detailed View for Selected Aspect */}
      {selectedAspect !== null && (
        <div className="border-t border-border pt-6">
          <div className="bg-primary-50 rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-3">
              Detailed Analysis: {aspects[selectedAspect].aspect}
            </h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-text-secondary mb-1">Sentiment Score</div>
                <div className="text-lg font-bold text-text-primary">
                  {getScorePercentage(aspects[selectedAspect].score)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Confidence Level</div>
                <div className="text-lg font-bold text-text-primary">
                  {(aspects[selectedAspect].confidence * 100).toFixed(0)}%
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm text-text-secondary mb-1">
                  <span>Sentiment Strength</span>
                  <span>{getScorePercentage(aspects[selectedAspect].score)}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      aspects[selectedAspect].sentiment.toLowerCase() === 'positive' ? 'bg-success' :
                      aspects[selectedAspect].sentiment.toLowerCase() === 'negative' ? 'bg-error' : 'bg-secondary'
                    }`}
                    style={{ width: `${getScorePercentage(aspects[selectedAspect].score)}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-text-secondary mb-1">
                  <span>Analysis Confidence</span>
                  <span>{(aspects[selectedAspect].confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(aspects[selectedAspect].confidence * 100).toFixed(0)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-secondary-50 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div className="text-sm text-text-secondary">
            <strong>Tip:</strong> Click on any aspect above to see detailed sentiment breakdown and confidence metrics for that specific product attribute.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectBasedAnalysis;