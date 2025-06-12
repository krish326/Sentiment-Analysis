import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SentimentTimeline = ({ reviewText, keyPhrases }) => {
  const [hoveredPhrase, setHoveredPhrase] = useState(null);

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-success text-white';
      case 'negative':
        return 'bg-error text-white';
      case 'neutral':
        return 'bg-secondary text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const getSentimentBorderColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'border-success';
      case 'negative':
        return 'border-error';
      case 'neutral':
        return 'border-secondary';
      default:
        return 'border-secondary';
    }
  };

  const renderHighlightedText = () => {
    let lastIndex = 0;
    const elements = [];
    
    // Sort phrases by position
    const sortedPhrases = [...keyPhrases].sort((a, b) => a.position - b.position);
    
    sortedPhrases.forEach((phrase, index) => {
      // Add text before the phrase
      if (phrase.position > lastIndex) {
        elements.push(
          <span key={`text-${index}`}>
            {reviewText.slice(lastIndex, phrase.position)}
          </span>
        );
      }
      
      // Add highlighted phrase
      elements.push(
        <span
          key={`phrase-${index}`}
          className={`px-1 py-0.5 rounded cursor-pointer transition-micro ${getSentimentColor(phrase.sentiment)}`}
          onMouseEnter={() => setHoveredPhrase(index)}
          onMouseLeave={() => setHoveredPhrase(null)}
          title={`${phrase.sentiment} sentiment`}
        >
          {phrase.phrase}
        </span>
      );
      
      lastIndex = phrase.position + phrase.phrase.length;
    });
    
    // Add remaining text
    if (lastIndex < reviewText.length) {
      elements.push(
        <span key="text-end">
          {reviewText.slice(lastIndex)}
        </span>
      );
    }
    
    return elements;
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Sentiment Timeline & Key Phrases
      </h3>
      
      {/* Highlighted Review Text */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Review Text with Sentiment Highlights
        </h4>
        <div className="p-4 bg-secondary-50 rounded-lg leading-relaxed text-text-primary">
          {renderHighlightedText()}
        </div>
      </div>
      
      {/* Sentiment Flow Visualization */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Sentiment Flow Throughout Review
        </h4>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {keyPhrases.map((phrase, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-4 h-8 rounded-full border-2 cursor-pointer transition-micro ${
                getSentimentBorderColor(phrase.sentiment)
              } ${
                hoveredPhrase === index ? 'scale-110 shadow-md' : ''
              }`}
              style={{
                backgroundColor: phrase.sentiment === 'positive' ? '#059669' :
                               phrase.sentiment === 'negative' ? '#DC2626' : '#64748B',
                opacity: hoveredPhrase === index ? 1 : 0.7
              }}
              onMouseEnter={() => setHoveredPhrase(index)}
              onMouseLeave={() => setHoveredPhrase(null)}
              title={phrase.phrase}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-text-muted mt-2">
          <span>Start of Review</span>
          <span>End of Review</span>
        </div>
      </div>
      
      {/* Key Phrases List */}
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Extracted Key Phrases
        </h4>
        <div className="space-y-2">
          {keyPhrases.map((phrase, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border transition-micro ${
                hoveredPhrase === index 
                  ? `border-primary bg-primary-50` 
                  : 'border-border bg-surface hover:bg-secondary-50'
              }`}
              onMouseEnter={() => setHoveredPhrase(index)}
              onMouseLeave={() => setHoveredPhrase(null)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  phrase.sentiment === 'positive' ? 'bg-success' :
                  phrase.sentiment === 'negative' ? 'bg-error' : 'bg-secondary'
                }`} />
                <span className="text-sm text-text-primary font-medium">
                  "{phrase.phrase}"
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  phrase.sentiment === 'positive' ? 'bg-success-100 text-success-700' :
                  phrase.sentiment === 'negative'? 'bg-error-100 text-error-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  {phrase.sentiment}
                </span>
                <Icon 
                  name={phrase.sentiment === 'positive' ? 'TrendingUp' : 
                        phrase.sentiment === 'negative' ? 'TrendingDown' : 'Minus'} 
                  size={14} 
                  className={
                    phrase.sentiment === 'positive' ? 'text-success' :
                    phrase.sentiment === 'negative' ? 'text-error' : 'text-secondary'
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-secondary-50 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Eye" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-text-secondary">
            <strong>Interactive Timeline:</strong> Hover over phrases or timeline markers to see how sentiment changes throughout the review. This helps identify specific triggers for positive or negative opinions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentTimeline;