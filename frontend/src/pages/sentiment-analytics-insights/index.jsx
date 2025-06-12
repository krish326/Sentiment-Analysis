import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Components
import ExecutiveSummaryCards from './components/ExecutiveSummaryCards';
import SentimentTrendChart from './components/SentimentTrendChart';
import AspectRadarChart from './components/AspectRadarChart';
import CompetitiveAnalysisChart from './components/CompetitiveAnalysisChart';
import FilterPanel from './components/FilterPanel';
import ExportPanel from './components/ExportPanel';

const SentimentAnalyticsInsights = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedFilters, setSelectedFilters] = useState({
    source: 'all',
    verified: 'all',
    rating: 'all',
    helpfulness: 'all'
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [chartType, setChartType] = useState('line');

  // Mock data for analytics
  const executiveSummary = {
    totalReviews: 2847,
    averageRating: 4.2,
    sentimentScore: 78,
    trendDirection: 'up',
    trendPercentage: 12.5,
    competitorComparison: 'above'
  };

  const sentimentTrendData = [
    { date: '2024-01-01', positive: 65, negative: 20, neutral: 15, total: 245 },
    { date: '2024-01-08', positive: 68, negative: 18, neutral: 14, total: 289 },
    { date: '2024-01-15', positive: 72, negative: 16, neutral: 12, total: 312 },
    { date: '2024-01-22', positive: 75, negative: 15, neutral: 10, total: 298 },
    { date: '2024-01-29', positive: 78, negative: 13, neutral: 9, total: 334 },
    { date: '2024-02-05', positive: 76, negative: 14, neutral: 10, total: 287 },
    { date: '2024-02-12', positive: 80, negative: 12, neutral: 8, total: 356 }
  ];

  const aspectAnalysisData = [
    { aspect: 'Quality', score: 85, fullMark: 100 },
    { aspect: 'Value', score: 78, fullMark: 100 },
    { aspect: 'Delivery', score: 92, fullMark: 100 },
    { aspect: 'Customer Service', score: 74, fullMark: 100 },
    { aspect: 'Packaging', score: 88, fullMark: 100 },
    { aspect: 'Features', score: 82, fullMark: 100 }
  ];

  const competitiveData = [
    { product: 'Your Product', sentiment: 78, reviews: 2847, rating: 4.2 },
    { product: 'Competitor A', sentiment: 72, reviews: 1923, rating: 4.0 },
    { product: 'Competitor B', sentiment: 69, reviews: 3421, rating: 3.9 },
    { product: 'Competitor C', sentiment: 81, reviews: 1567, rating: 4.3 }
  ];

  const sentimentDistribution = [
    { name: 'Positive', value: 78, count: 2221, color: '#10B981' },
    { name: 'Neutral', value: 13, count: 370, color: '#F59E0B' },
    { name: 'Negative', value: 9, count: 256, color: '#EF4444' }
  ];

  const topKeywords = [
    { keyword: 'excellent quality', sentiment: 'positive', frequency: 234, trend: 'up' },
    { keyword: 'fast delivery', sentiment: 'positive', frequency: 198, trend: 'up' },
    { keyword: 'great value', sentiment: 'positive', frequency: 167, trend: 'stable' },
    { keyword: 'poor packaging', sentiment: 'negative', frequency: 89, trend: 'down' },
    { keyword: 'delayed shipping', sentiment: 'negative', frequency: 67, trend: 'down' },
    { keyword: 'average product', sentiment: 'neutral', frequency: 45, trend: 'stable' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'aspects', label: 'Aspects', icon: 'Target' },
    { id: 'competitive', label: 'Competitive', icon: 'Users' },
    { id: 'keywords', label: 'Keywords', icon: 'Hash' }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    setIsExportPanelOpen(false);
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 70) return 'text-success';
    if (sentiment >= 40) return 'text-warning';
    return 'text-error';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Sentiment Analytics & Insights
              </h1>
              <p className="text-text-secondary">
                Transform review data into actionable business insights through advanced visualizations
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setIsFilterPanelOpen(true)}
                className="flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-micro"
              >
                <Icon name="Filter" size={16} className="mr-2" />
                Filters
              </button>
              
              <button
                onClick={() => setIsExportPanelOpen(true)}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-micro"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <ExecutiveSummaryCards summary={executiveSummary} />

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 transition-micro whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                  }`}
                >
                  <Icon name={tab.icon} size={16} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sentiment Distribution */}
              <div className="card p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Sentiment Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                        labelFormatter={() => ''}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {sentimentDistribution.map(item => (
                    <div key={item.name} className="text-center">
                      <div className="text-2xl font-bold" style={{ color: item.color }}>
                        {item.count}
                      </div>
                      <div className="text-sm text-text-secondary">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Keywords */}
              <div className="card p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Top Keywords & Phrases
                </h3>
                <div className="space-y-3">
                  {topKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          keyword.sentiment === 'positive' ? 'bg-success' :
                          keyword.sentiment === 'negative' ? 'bg-error' : 'bg-warning'
                        }`} />
                        <span className="font-medium text-text-primary">{keyword.keyword}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-text-secondary">{keyword.frequency}</span>
                        <Icon 
                          name={getTrendIcon(keyword.trend)} 
                          size={16} 
                          className={`${
                            keyword.trend === 'up' ? 'text-success' :
                            keyword.trend === 'down' ? 'text-error' : 'text-text-muted'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <SentimentTrendChart 
              data={sentimentTrendData} 
              chartType={chartType}
              onChartTypeChange={setChartType}
            />
          )}

          {/* Aspects Tab */}
          {activeTab === 'aspects' && (
            <AspectRadarChart data={aspectAnalysisData} />
          )}

          {/* Competitive Tab */}
          {activeTab === 'competitive' && (
            <CompetitiveAnalysisChart data={competitiveData} />
          )}

          {/* Keywords Tab */}
          {activeTab === 'keywords' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Keyword Analysis
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-primary-50 text-primary rounded-md">
                    Positive
                  </button>
                  <button className="px-3 py-1 text-sm bg-secondary-100 text-secondary-700 rounded-md">
                    Negative
                  </button>
                  <button className="px-3 py-1 text-sm bg-secondary-100 text-secondary-700 rounded-md">
                    Neutral
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topKeywords.map((keyword, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-micro">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{keyword.keyword}</span>
                      <Icon 
                        name={getTrendIcon(keyword.trend)} 
                        size={16} 
                        className={`${
                          keyword.trend === 'up' ? 'text-success' :
                          keyword.trend === 'down' ? 'text-error' : 'text-text-muted'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        keyword.sentiment === 'positive' ? 'bg-success-50 text-success-700' :
                        keyword.sentiment === 'negative' ? 'bg-error-50 text-error-700' : 'bg-warning-50 text-warning-700'
                      }`}>
                        {keyword.sentiment}
                      </span>
                      <span className="text-sm text-text-secondary">{keyword.frequency} mentions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/analysis-results-dashboard')}
              className="flex items-center justify-center p-4 bg-surface border border-border rounded-lg hover:shadow-md transition-micro"
            >
              <Icon name="BarChart3" size={20} className="mr-3 text-primary" />
              <span className="font-medium">View Dashboard</span>
            </button>
            
            <button
              onClick={() => navigate('/individual-review-analysis-detail')}
              className="flex items-center justify-center p-4 bg-surface border border-border rounded-lg hover:shadow-md transition-micro"
            >
              <Icon name="FileText" size={20} className="mr-3 text-primary" />
              <span className="font-medium">Review Details</span>
            </button>
            
            <button
              onClick={() => navigate('/search-filter-management')}
              className="flex items-center justify-center p-4 bg-surface border border-border rounded-lg hover:shadow-md transition-micro"
            >
              <Icon name="Search" size={20} className="mr-3 text-primary" />
              <span className="font-medium">Advanced Search</span>
            </button>
            
            <button
              onClick={() => navigate('/product-url-input-analysis-setup')}
              className="flex items-center justify-center p-4 bg-surface border border-border rounded-lg hover:shadow-md transition-micro"
            >
              <Icon name="Plus" size={20} className="mr-3 text-primary" />
              <span className="font-medium">New Analysis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Export Panel */}
      <ExportPanel
        isOpen={isExportPanelOpen}
        onClose={() => setIsExportPanelOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default SentimentAnalyticsInsights;