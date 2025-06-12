import React from 'react';
import Icon from 'components/AppIcon';

const SentimentVisualization = ({ sentiment }) => {
  const getSentimentColor = (label) => {
    switch (label.toLowerCase()) {
      case 'positive':
        return 'text-success bg-success-50 border-success-100';
      case 'negative':
        return 'text-error bg-error-50 border-error-100';
      case 'neutral':
        return 'text-secondary bg-secondary-50 border-secondary-100';
      default:
        return 'text-secondary bg-secondary-50 border-secondary-100';
    }
  };

  const getSentimentIcon = (label) => {
    switch (label.toLowerCase()) {
      case 'positive':
        return 'ThumbsUp';
      case 'negative':
        return 'ThumbsDown';
      case 'neutral':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getScorePercentage = (score) => {
    return Math.abs(score * 100).toFixed(0);
  };

  const getConfidencePercentage = (confidence) => {
    return (confidence * 100).toFixed(0);
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Overall Sentiment Analysis
      </h3>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center px-4 py-2 rounded-lg border ${getSentimentColor(sentiment.label)}`}>
            <Icon name={getSentimentIcon(sentiment.label)} size={20} className="mr-2" />
            <span className="font-medium">{sentiment.label}</span>
          </div>
          
          <div className="text-2xl font-bold text-text-primary">
            {getScorePercentage(sentiment.score)}%
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-text-secondary mb-1">Confidence</div>
          <div className="text-lg font-semibold text-text-primary">
            {getConfidencePercentage(sentiment.confidence)}%
          </div>
        </div>
      </div>
      
      {/* Sentiment Score Visualization */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>Sentiment Strength</span>
            <span>{getScorePercentage(sentiment.score)}%</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                sentiment.label.toLowerCase() === 'positive' ? 'bg-success' :
                sentiment.label.toLowerCase() === 'negative' ? 'bg-error' : 'bg-secondary'
              }`}
              style={{ width: `${getScorePercentage(sentiment.score)}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>Analysis Confidence</span>
            <span>{getConfidencePercentage(sentiment.confidence)}%</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${getConfidencePercentage(sentiment.confidence)}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-secondary-50 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-text-secondary">
            <strong>Analysis Explanation:</strong> This sentiment score is calculated using advanced NLP algorithms that analyze the emotional tone, context, and linguistic patterns in the review text.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentVisualization;