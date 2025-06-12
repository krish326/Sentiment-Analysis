import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductOverviewCard = ({ product, metrics }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-warning';
    }
  };

  const getSentimentBgColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'bg-success-50';
      case 'negative': return 'bg-error-50';
      default: return 'bg-warning-50';
    }
  };

  return (
    <div className="card p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden bg-secondary-50">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-heading font-bold text-text-primary mb-2">
                {product.name}
              </h2>
              <p className="text-text-secondary mb-3">
                Brand: {product.brand}
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-warning fill-current' :'text-secondary-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {product.rating}
                  </span>
                  <span className="text-sm text-text-secondary ml-1">
                    ({product.totalReviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-text-primary">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-text-muted line-through">
                      {product.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-success-50 text-success-700 text-sm font-medium rounded">
                      {product.discount} off
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
                <Icon name="ExternalLink" size={20} />
              </button>
              <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
                <Icon name="Share2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {metrics.totalReviews.toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary">Total Reviews</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {metrics.sentimentBreakdown.positive}%
          </div>
          <div className="text-sm text-text-secondary">Positive</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-warning mb-1">
            {metrics.sentimentBreakdown.neutral}%
          </div>
          <div className="text-sm text-text-secondary">Neutral</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {metrics.confidenceScore}%
          </div>
          <div className="text-sm text-text-secondary">Confidence</div>
        </div>
      </div>

      {/* Aspect Scores */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Aspect Ratings
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(metrics.aspectScores).map(([aspect, score]) => (
            <div key={aspect} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <span className="text-sm font-medium text-text-primary capitalize">
                {aspect}
              </span>
              <div className="flex items-center">
                <span className="text-sm font-bold text-text-primary mr-1">
                  {score}
                </span>
                <Icon name="Star" size={14} className="text-warning fill-current" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOverviewCard;