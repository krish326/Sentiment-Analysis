import React from 'react';
import Icon from 'components/AppIcon';

const KeyInsights = ({ emotions, keyPhrases, productContext }) => {
  const getEmotionIcon = (emotion) => {
    const emotionIcons = {
      satisfaction: 'Smile',
      appreciation: 'Heart',
      concern: 'AlertTriangle',
      disappointment: 'Frown',
      frustration: 'Zap',
      regret: 'X',
      acceptance: 'Check',
      pragmatism: 'Target'
    };
    return emotionIcons[emotion] || 'Circle';
  };

  const getEmotionColor = (emotion) => {
    const positiveEmotions = ['satisfaction', 'appreciation'];
    const negativeEmotions = ['disappointment', 'frustration', 'regret'];
    const neutralEmotions = ['concern', 'acceptance', 'pragmatism'];
    
    if (positiveEmotions.includes(emotion)) {
      return 'text-success bg-success-50 border-success-200';
    } else if (negativeEmotions.includes(emotion)) {
      return 'text-error bg-error-50 border-error-200';
    } else {
      return 'text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getContextualInsight = () => {
    const { averageSentiment, totalReviews, similarReviews } = productContext;
    const avgPercentage = (averageSentiment * 100).toFixed(0);
    
    if (averageSentiment > 0.7) {
      return {
        type: 'positive',
        message: `This review aligns with the generally positive sentiment (${avgPercentage}%) from ${totalReviews.toLocaleString('en-IN')} total reviews.`,
        icon: 'TrendingUp'
      };
    } else if (averageSentiment < 0.3) {
      return {
        type: 'negative',
        message: `This review reflects the overall negative sentiment (${avgPercentage}%) seen across ${totalReviews.toLocaleString('en-IN')} reviews.`,
        icon: 'TrendingDown'
      };
    } else {
      return {
        type: 'neutral',
        message: `This review contributes to the mixed sentiment (${avgPercentage}%) observed in ${totalReviews.toLocaleString('en-IN')} total reviews.`,
        icon: 'BarChart3'
      };
    }
  };

  const contextualInsight = getContextualInsight();

  const getMostInfluentialPhrase = () => {
    const positivePhrase = keyPhrases.find(p => p.sentiment === 'positive');
    const negativePhrase = keyPhrases.find(p => p.sentiment === 'negative');
    
    if (positivePhrase && negativePhrase) {
      return {
        phrase: positivePhrase.phrase,
        impact: 'This positive phrase likely influenced the overall sentiment despite negative aspects mentioned.',
        type: 'balanced'
      };
    } else if (positivePhrase) {
      return {
        phrase: positivePhrase.phrase,
        impact: 'This phrase strongly contributed to the positive sentiment of the review.',
        type: 'positive'
      };
    } else if (negativePhrase) {
      return {
        phrase: negativePhrase.phrase,
        impact: 'This phrase was a key driver of the negative sentiment expressed.',
        type: 'negative'
      };
    }
    return null;
  };

  const influentialPhrase = getMostInfluentialPhrase();

  return (
    <div className="card p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        AI-Generated Key Insights
      </h3>
      
      {/* Emotional Analysis */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Detected Emotions
        </h4>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion, index) => (
            <div
              key={index}
              className={`flex items-center px-3 py-2 rounded-lg border ${getEmotionColor(emotion)}`}
            >
              <Icon name={getEmotionIcon(emotion)} size={16} className="mr-2" />
              <span className="text-sm font-medium capitalize">{emotion}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contextual Analysis */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Product Context Analysis
        </h4>
        <div className={`p-4 rounded-lg border ${
          contextualInsight.type === 'positive' ? 'bg-success-50 border-success-200' :
          contextualInsight.type === 'negative'? 'bg-error-50 border-error-200' : 'bg-secondary-50 border-secondary-200'
        }`}>
          <div className="flex items-start space-x-3">
            <Icon 
              name={contextualInsight.icon} 
              size={20} 
              className={
                contextualInsight.type === 'positive' ? 'text-success' :
                contextualInsight.type === 'negative'? 'text-error' : 'text-secondary'
              }
            />
            <div>
              <p className="text-sm text-text-primary mb-2">
                {contextualInsight.message}
              </p>
              <div className="text-xs text-text-secondary">
                {productContext.similarReviews} similar reviews found in the dataset
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Most Influential Phrase */}
      {influentialPhrase && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Most Influential Phrase
          </h4>
          <div className={`p-4 rounded-lg border ${
            influentialPhrase.type === 'positive' ? 'bg-success-50 border-success-200' :
            influentialPhrase.type === 'negative'? 'bg-error-50 border-error-200' : 'bg-accent-50 border-accent-200'
          }`}>
            <div className="flex items-start space-x-3">
              <Icon 
                name="Quote" 
                size={20} 
                className={
                  influentialPhrase.type === 'positive' ? 'text-success' :
                  influentialPhrase.type === 'negative'? 'text-error' : 'text-accent'
                }
              />
              <div>
                <p className="text-sm font-medium text-text-primary mb-2">
                  "{influentialPhrase.phrase}"
                </p>
                <p className="text-xs text-text-secondary">
                  {influentialPhrase.impact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Actionable Insights */}
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Actionable Insights
        </h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-text-primary">
              <strong>For Shoppers:</strong> This review provides specific insights about product quality and value that can help inform your purchase decision.
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-accent-50 rounded-lg">
            <Icon name="Target" size={16} className="text-accent mt-0.5" />
            <div className="text-sm text-text-primary">
              <strong>For Sellers:</strong> Pay attention to the specific aspects mentioned - they represent key areas that influence customer satisfaction.
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg">
            <Icon name="BarChart3" size={16} className="text-secondary mt-0.5" />
            <div className="text-sm text-text-primary">
              <strong>For Analysts:</strong> This review's sentiment pattern can be compared with similar products to identify market trends and opportunities.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyInsights;