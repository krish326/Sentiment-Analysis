import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import ProductOverviewCard from './components/ProductOverviewCard';
import AIInsightsSummary from './components/AIInsightsSummary';
import SentimentDistributionChart from './components/SentimentDistributionChart';
import ReviewAnalysisCard from './components/ReviewAnalysisCard';
import FilterPanel from './components/FilterPanel';

const AnalysisResultsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const realData = location.state?.realData;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ sentiment: 'all', rating: 'all' });
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('cards');
  const [isLoading, setIsLoading] = useState(false);

  // =================================================================
  // FINAL FIX: This section now correctly processes the REAL data from the backend
  // =================================================================

  // 1. Get the review list from the correct key: 'reviewAnalyses'
  const reviewsList = realData?.reviewAnalyses || [];

  // 2. Create the data for the components dynamically from the backend response
  const reviewsData = reviewsList.map((review, index) => ({
    ...review,
    id: index,
    rating: 0,
    helpfulVotes: 0,
    date: new Date().toISOString(),
    author: 'N/A',
  }));

  // 3. Get the AI summary directly from the backend data
  const aiSummary = {
    recommendation: realData?.summary || "No summary available.",
    // You can add more processing here if needed
  };

  // 4. Create the 'analysisMetrics' object dynamically
  const analysisMetrics = {
    totalReviews: reviewsData.length,
    sentimentBreakdown: {
      positive: reviewsData.filter(r => r.overallSentiment === 'Positive' || r.overallSentiment === 'Very Positive').length,
      neutral: reviewsData.filter(r => r.overallSentiment === 'Neutral').length,
      negative: reviewsData.filter(r => r.overallSentiment === 'Negative' || r.overallSentiment === 'Very Negative').length,
    },
    // Add other metrics as needed
  };

  // 5. Create the chart data dynamically
  const sentimentChartData = [
    { name: 'Positive', value: analysisMetrics.sentimentBreakdown.positive, color: '#059669' },
    { name: 'Neutral', value: analysisMetrics.sentimentBreakdown.neutral, color: '#D97706' },
    { name: 'Negative', value: analysisMetrics.sentimentBreakdown.negative, color: '#DC2626' }
  ];

  const productData = {
    name: "Product Analysis",
    totalReviews: analysisMetrics.totalReviews,
    // ... other static data
  };

  // =================================================================

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleNewAnalysis = () => {
    navigate('/product-url-input-analysis-setup');
  };

  if (!realData) {
    return (
        <div className="text-center py-20">
          <Icon name="AlertTriangle" size={48} className="text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">No Data Received</h3>
          <p>There was an issue receiving the analysis data.</p>
          <button onClick={handleNewAnalysis}>Start New Analysis</button>
        </div>
    );
  }

  // The rest of your filtering/sorting logic and JSX can remain the same
  // as it now operates on the correctly structured 'reviewsData'
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
          </div>
        </div>

        <ProductOverviewCard
            product={productData}
            metrics={analysisMetrics}
        />

        <AIInsightsSummary summary={aiSummary} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SentimentDistributionChart data={sentimentChartData} />
          {/* You can add another chart here or other data display */}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Individual Review Analysis
            </h2>
            <span className="text-sm text-text-secondary">
              {sortedReviews.length} of {reviewsData.length} reviews
            </span>
          </div>

          <div className={`grid gap-6 ${viewMode === 'cards' ? 'grid-cols-1' : 'grid-cols-1'}`}>
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
              </div>
          )}
        </div>
      </div>
  );
};

export default AnalysisResultsDashboard;