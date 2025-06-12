import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

// Components
import ProductOverviewCard from './components/ProductOverviewCard';
import AIInsightsSummary from './components/AIInsightsSummary';
import SentimentDistributionChart from './components/SentimentDistributionChart';
import ReviewAnalysisCard from './components/ReviewAnalysisCard';
import FilterPanel from './components/FilterPanel';
import { useNavigate, useLocation } from 'react-router-dom'; // Add useLocation here

const AnalysisResultsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Add this line
  const realData = location.state?.realData; // Add this line to get the data
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('cards');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for the analysis results
  const productData = {
    id: "B08N5WRWNW",
    name: "Echo Dot (4th Gen) | Smart speaker with Alexa | Charcoal",
    brand: "Amazon",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop",
    price: "₹4,499",
    originalPrice: "₹4,999",
    discount: "10%",
    rating: 4.2,
    totalReviews: 1247,
    url: "https://www.amazon.in/dp/B08N5WRWNW"
  };

  const analysisMetrics = {
    totalReviews: 1247,
    sentimentBreakdown: {
      positive: 68,
      neutral: 22,
      negative: 10
    },
    confidenceScore: 87,
    aspectScores: {
      quality: 4.1,
      value: 3.8,
      delivery: 4.3,
      features: 4.0
    }
  };

  const aiSummary = {
    overallSentiment: "Positive",
    confidenceLevel: "High",
    keyInsights: [
      "Users consistently praise the improved sound quality compared to previous generations",
      "Setup process is frequently mentioned as simple and intuitive",
      "Voice recognition accuracy has significantly improved",
      "Some users report connectivity issues with certain WiFi networks"
    ],
    pros: [
      "Excellent sound quality for the price point",
      "Compact design fits well in any room",
      "Quick and responsive Alexa integration",
      "Easy setup and configuration process",
      "Good value for money"
    ],
    cons: [
      "Occasional WiFi connectivity issues",
      "Limited bass response for music playback",
      "Some users experienced delivery delays",
      "Voice recognition struggles with accents"
    ],
    recommendation: `Based on the analysis of 1,247 reviews, the Echo Dot (4th Gen) receives overwhelmingly positive feedback with 68% positive sentiment. Users particularly appreciate the sound quality improvements and ease of use. While there are minor connectivity concerns, the overall user satisfaction is high, making it a recommended purchase for smart home enthusiasts.`
  };

  const reviewsData = realData || [
    {
      id: 1,
      // ... keep the mock data here as a fallback ...
    },
  ];

  const sentimentChartData = [
    { name: 'Positive', value: 68, color: '#059669' },
    { name: 'Neutral', value: 22, color: '#D97706' },
    { name: 'Negative', value: 10, color: '#DC2626' }
  ];

  const ratingDistribution = [
    { rating: '5 Star', count: 523, percentage: 42 },
    { rating: '4 Star', count: 324, percentage: 26 },
    { rating: '3 Star', count: 187, percentage: 15 },
    { rating: '2 Star', count: 125, percentage: 10 },
    { rating: '1 Star', count: 88, percentage: 7 }
  ];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleExport = () => {
    console.log('Exporting analysis results...');
    // Mock export functionality
  };

  const handleNewAnalysis = () => {
    navigate('/product-url-input-analysis-setup');
  };

  const filteredReviews = reviewsData.filter(review => {
    if (selectedFilters.sentiment !== 'all' && review.overallSentiment.toLowerCase() !== selectedFilters.sentiment) {
      return false;
    }
    if (selectedFilters.rating !== 'all' && review.rating !== parseInt(selectedFilters.rating)) {
      return false;
    }
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpfulVotes - a.helpfulVotes;
      case 'recent':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
            Analysis Results
          </h1>
          <p className="text-text-secondary">
            Comprehensive review analysis for {productData.name}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleNewAnalysis}
            className="flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg font-medium hover:bg-secondary-200 transition-micro"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            New Analysis
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-micro"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export Results
          </button>
        </div>
      </div>

      {/* Product Overview */}
      <ProductOverviewCard 
        product={productData} 
        metrics={analysisMetrics} 
      />

      {/* AI Insights Summary */}
      <AIInsightsSummary summary={aiSummary} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SentimentDistributionChart data={sentimentChartData} />
        
        <div className="card p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Rating Distribution
          </h3>
          <div className="space-y-3">
            {ratingDistribution.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-sm font-medium text-text-secondary w-16">
                  {item.rating}
                </span>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-secondary-100 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-text-secondary w-12 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center px-4 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary-200 transition-micro"
          >
            <Icon name="Filter" size={16} className="mr-2" />
            Filters
            {(selectedFilters.sentiment !== 'all' || selectedFilters.rating !== 'all') && (
              <span className="ml-2 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-secondary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-micro"
          >
            <option value="recent">Most Recent</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 rounded-md transition-micro ${
              viewMode === 'cards' ?'bg-primary-50 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
            }`}
          >
            <Icon name="LayoutGrid" size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-micro ${
              viewMode === 'list' ?'bg-primary-50 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
            }`}
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Individual Review Analysis
          </h2>
          <span className="text-sm text-text-secondary">
            {sortedReviews.length} of {reviewsData.length} reviews
          </span>
        </div>

        <div className={`grid gap-6 ${
          viewMode === 'cards' ?'grid-cols-1' :'grid-cols-1'
        }`}>
          {sortedReviews.map((review) => (
            <ReviewAnalysisCard 
              key={review.id} 
              review={review} 
              viewMode={viewMode}
              onViewDetails={() => navigate('/individual-review-analysis-detail', { 
                state: { reviewId: review.id } 
              })}
            />
          ))}
        </div>

        {sortedReviews.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No reviews found
            </h3>
            <p className="text-text-secondary">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {sortedReviews.length > 0 && sortedReviews.length < reviewsData.length && (
        <div className="text-center py-6">
          <button
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary-200 transition-micro disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} className="mr-2" />
                Load More Reviews
              </>
            )}
          </button>
        </div>
      )}

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={selectedFilters}
        onFilterChange={handleFilterChange}
        reviewsData={reviewsData}
      />

      {/* Quick Actions FAB (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={() => navigate('/sentiment-analytics-insights')}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 transition-micro flex items-center justify-center"
        >
          <Icon name="TrendingUp" size={24} />
        </button>
      </div>
    </div>
  );
};

export default AnalysisResultsDashboard;