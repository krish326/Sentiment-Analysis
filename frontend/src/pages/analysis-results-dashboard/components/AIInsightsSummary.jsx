import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AIInsightsSummary = ({ summary }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className="card p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center mr-3">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            AI-Generated Insights
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentBgColor(summary.overallSentiment)} ${getSentimentColor(summary.overallSentiment)}`}>
            {summary.overallSentiment}
          </span>
          <span className="px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-sm font-medium">
            {summary.confidenceLevel} Confidence
          </span>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-3">
          Key Insights
        </h3>
        <div className="space-y-2">
          {summary.keyInsights.slice(0, isExpanded ? summary.keyInsights.length : 2).map((insight, index) => (
            <div key={index} className="flex items-start">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-text-secondary text-sm leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
        {summary.keyInsights.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-sm text-primary hover:text-primary-700 font-medium transition-micro"
          >
            {isExpanded ? 'Show Less' : `Show ${summary.keyInsights.length - 2} More Insights`}
          </button>
        )}
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pros */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-3 flex items-center">
            <Icon name="ThumbsUp" size={18} className="text-success mr-2" />
            Pros
          </h3>
          <div className="space-y-2">
            {summary.pros.map((pro, index) => (
              <div key={index} className="flex items-start">
                <Icon name="Check" size={14} className="text-success mt-1 mr-2 flex-shrink-0" />
                <p className="text-text-secondary text-sm leading-relaxed">
                  {pro}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-3 flex items-center">
            <Icon name="ThumbsDown" size={18} className="text-error mr-2" />
            Cons
          </h3>
          <div className="space-y-2">
            {summary.cons.map((con, index) => (
              <div key={index} className="flex items-start">
                <Icon name="X" size={14} className="text-error mt-1 mr-2 flex-shrink-0" />
                <p className="text-text-secondary text-sm leading-relaxed">
                  {con}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Target" size={18} className="text-primary mr-2" />
          AI Recommendation
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {summary.recommendation}
        </p>
      </div>
    </div>
  );
};

export default AIInsightsSummary;