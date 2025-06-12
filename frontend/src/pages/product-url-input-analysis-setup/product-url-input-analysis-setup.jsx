import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import AnalysisProgressIndicator from 'components/ui/AnalysisProgressIndicator';
import RecentAnalysisHistory from './components/RecentAnalysisHistory';

const ProductUrlInputAnalysisSetup = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState(null);
  const [productPreview, setProductPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState('idle');
  const navigate = useNavigate();

  const mockRecentAnalyses = [
    {
      id: 1,
      productName: "iPhone 15 Pro Max",
      platform: "amazon",
      url: "https://www.amazon.in/dp/B0CHX1W1XY",
      analyzedAt: new Date(Date.now() - 86400000),
      totalReviews: 1247,
      averageRating: 4.3,
      sentiment: "positive",
      thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      productName: "Samsung Galaxy S24 Ultra",
      platform: "flipkart",
      url: "https://www.flipkart.com/samsung-galaxy-s24-ultra/p/itm123456",
      analyzedAt: new Date(Date.now() - 172800000),
      totalReviews: 892,
      averageRating: 4.1,
      sentiment: "positive",
      thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      productName: "MacBook Air M2",
      platform: "amazon",
      url: "https://www.amazon.in/dp/B0B3C57RQZ",
      analyzedAt: new Date(Date.now() - 259200000),
      totalReviews: 2156,
      averageRating: 4.5,
      sentiment: "positive",
      thumbnail: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop"
    }
  ];

  const platformPatterns = {
    amazon: /amazon\.(in|com)/i,
    flipkart: /flipkart\.com/i
  };

  const urlExamples = [
    "https://www.amazon.in/dp/B0CHX1W1XY",
    "https://www.flipkart.com/product-name/p/itm123456",
    "https://www.amazon.com/product-name/dp/B0123456789"
  ];

  useEffect(() => {
    if (url) {
      detectPlatform(url);
      if (isValidUrl(url)) {
        generateProductPreview(url);
      } else {
        setProductPreview(null);
      }
    } else {
      setDetectedPlatform(null);
      setProductPreview(null);
      setError('');
    }
  }, [url]);

  const detectPlatform = (inputUrl) => {
    for (const [platform, pattern] of Object.entries(platformPatterns)) {
      if (pattern.test(inputUrl)) {
        setDetectedPlatform(platform);
        return;
      }
    }
    setDetectedPlatform(null);
  };

  const isValidUrl = (inputUrl) => {
    try {
      const urlObj = new URL(inputUrl);
      return Object.values(platformPatterns).some(pattern => pattern.test(urlObj.hostname));
    } catch {
      return false;
    }
  };

  const generateProductPreview = (inputUrl) => {
    if (detectedPlatform) {
      const mockPreviews = {
        amazon: {
          title: "iPhone 15 Pro Max (256GB) - Natural Titanium",
          price: "₹1,34,900",
          rating: 4.3,
          reviewCount: 1247,
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
          availability: "In Stock"
        },
        flipkart: {
          title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB)",
          price: "₹1,29,999",
          rating: 4.1,
          reviewCount: 892,
          image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
          availability: "In Stock"
        }
      };
      setProductPreview(mockPreviews[detectedPlatform]);
    }
  };

  const validateUrl = () => {
    if (!url.trim()) {
      setError('Please enter a product URL');
      return false;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid Amazon or Flipkart product URL');
      return false;
    }

    setError('');
    return true;
  };

  const simulateAnalysis = async () => {
    setAnalysisPhase('scraping');
    setProgress(0);

    // Simulate progress
    const progressSteps = [
      { phase: 'scraping', progress: 25, delay: 1000 },
      { phase: 'processing', progress: 50, delay: 1500 },
      { phase: 'processing', progress: 75, delay: 1000 },
      { phase: 'visualizing', progress: 90, delay: 800 },
      { phase: 'complete', progress: 100, delay: 500 }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setAnalysisPhase(step.phase);
      setProgress(step.progress);
    }

    // Navigate to results
    setTimeout(() => {
      navigate('/analysis-results-dashboard');
    }, 1000);
  };

  // --- REPLACE THE OLD handleSubmit FUNCTION WITH THIS ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrl()) return;

    setIsLoading(true);
    setError('');
    setAnalysisPhase('scraping');
    setProgress(10);

    const apiUrl = `/api/scrape?url=${encodeURIComponent(url)}`;

    try {
      console.log(`Sending request to: ${apiUrl}`);
      setProgress(30);

      const response = await fetch(apiUrl);

      setProgress(70);

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const analysisData = await response.json();
      console.log("Received data from backend:", analysisData);
      setProgress(100);
      setAnalysisPhase('complete');

      // Navigate to the results page and pass the fetched data along
      navigate('/analysis-results-dashboard', { state: { realData: analysisData } });

    } catch (err) {
      console.error("API call failed:", err);
      setError(`Failed to analyze the product: ${err.message}. Please check the URL and try again.`);
      setAnalysisPhase('error');
    } finally {
      // We set isLoading to false on the results page after navigating
    }
  };

  const handleReanalyze = (analysisUrl) => {
    setUrl(analysisUrl);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
  };

  const getPlatformBadge = () => {
    if (!detectedPlatform) return null;

    const badges = {
      amazon: { label: 'Amazon', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: 'ShoppingBag' },
      flipkart: { label: 'Flipkart', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: 'Store' }
    };

    const badge = badges[detectedPlatform];
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badge.color}`}>
        <Icon name={badge.icon} size={14} className="mr-1.5" />
        {badge.label} Detected
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <Icon name="BarChart3" size={32} color="white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
            Analyze Product Reviews
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Get AI-powered insights from Amazon and Flipkart product reviews. Understand customer sentiment, identify key themes, and make informed decisions.
          </p>
        </div>

        {/* Analysis Progress */}
        {isLoading && (
          <div className="mb-8">
            <AnalysisProgressIndicator
              isLoading={isLoading}
              progress={progress}
              phase={analysisPhase}
              onCancel={() => {
                setIsLoading(false);
                setAnalysisPhase('idle');
                setProgress(0);
              }}
            />
          </div>
        )}

        {/* Main Input Form */}
        {!isLoading && (
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 lg:p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* URL Input */}
              <div>
                <label htmlFor="productUrl" className="block text-sm font-medium text-text-primary mb-3">
                  Product URL
                </label>
                <div className="relative">
                  <input
                    id="productUrl"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste Amazon or Flipkart product URL here..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-micro text-text-primary placeholder-text-muted"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-3">
                    <Icon name="Link" size={20} className="text-text-muted" />
                  </div>
                </div>

                {/* Platform Detection Badge */}
                {detectedPlatform && (
                  <div className="mt-3">
                    {getPlatformBadge()}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-3 flex items-center text-sm text-error">
                    <Icon name="AlertCircle" size={16} className="mr-2" />
                    {error}
                  </div>
                )}

                {/* URL Examples */}
                <div className="mt-4">
                  <p className="text-sm text-text-secondary mb-2">Supported URL formats:</p>
                  <div className="space-y-1">
                    {urlExamples.map((example, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setUrl(example)}
                        className="block text-sm text-primary hover:text-primary-700 transition-micro"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Preview */}
              {productPreview && (
                <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={productPreview.image}
                      alt={productPreview.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-text-primary mb-1 truncate">
                        {productPreview.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <span className="font-semibold text-text-primary">{productPreview.price}</span>
                        <div className="flex items-center">
                          <Icon name="Star" size={14} className="text-accent mr-1" />
                          <span>{productPreview.rating}</span>
                          <span className="ml-1">({productPreview.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <span className="inline-block mt-1 text-xs text-success font-medium">
                        {productPreview.availability}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="w-full flex items-center justify-center px-6 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-micro focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Analyzing Reviews...
                  </>
                ) : (
                  <>
                    <Icon name="Play" size={20} className="mr-2" />
                    Start Analysis
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Recent Analysis History */}
        {!isLoading && (
          <RecentAnalysisHistory
            analyses={mockRecentAnalyses}
            onReanalyze={handleReanalyze}
          />
        )}

        {/* Help Section */}
        {!isLoading && (
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">How it works</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start">
                    <Icon name="Check" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    Paste a valid Amazon or Flipkart product URL
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    Our AI analyzes customer reviews and ratings
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    Get detailed sentiment analysis and insights
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    Export results and share with your team
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductUrlInputAnalysisSetup;