import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import ReviewDetailHeader from './components/ReviewDetailHeader';
import ReviewTextCard from './components/ReviewTextCard';
import SentimentVisualization from './components/SentimentVisualization';
import AspectBasedAnalysis from './components/AspectBasedAnalysis';
import SentimentTimeline from './components/SentimentTimeline';
import KeyInsights from './components/KeyInsights';
import ReviewNavigation from './components/ReviewNavigation';
import SimilarReviewsPanel from './components/SimilarReviewsPanel';

const IndividualReviewAnalysisDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);

  // Mock review data
  const reviewsData = [
    {
      id: 1,
      reviewText: `I've been using this product for about 3 months now and I'm genuinely impressed with the quality. The build feels premium and sturdy, which was my main concern when ordering online. The shipping was incredibly fast - arrived within 2 days of ordering.

The customer service team was also very responsive when I had a question about warranty coverage. However, I do think the price point is a bit high compared to similar products in the market. The value for money could be better, but the quality does justify most of the cost.

Overall, I'm satisfied with this purchase and would recommend it to others who prioritize quality over price.`,
      overallSentiment: {
        label: 'Positive',
        score: 0.78,
        confidence: 0.85
      },
      aspectSentiments: [
        { aspect: 'Quality', sentiment: 'Positive', score: 0.92, confidence: 0.88 },
        { aspect: 'Shipping', sentiment: 'Positive', score: 0.95, confidence: 0.92 },
        { aspect: 'Customer Service', sentiment: 'Positive', score: 0.82, confidence: 0.79 },
        { aspect: 'Value for Money', sentiment: 'Negative', score: -0.45, confidence: 0.73 },
        { aspect: 'Build Quality', sentiment: 'Positive', score: 0.89, confidence: 0.86 }
      ],
      keyPhrases: [
        { phrase: 'genuinely impressed with the quality', sentiment: 'positive', position: 45 },
        { phrase: 'build feels premium and sturdy', sentiment: 'positive', position: 120 },
        { phrase: 'shipping was incredibly fast', sentiment: 'positive', position: 200 },
        { phrase: 'price point is a bit high', sentiment: 'negative', position: 380 },
        { phrase: 'quality does justify most of the cost', sentiment: 'neutral', position: 450 }
      ],
      emotions: ['satisfaction', 'appreciation', 'concern'],
      reviewerInfo: {
        name: 'Sarah M.',
        verified: true,
        helpfulVotes: 23,
        reviewDate: '2024-01-15'
      },
      productContext: {
        averageSentiment: 0.65,
        totalReviews: 1247,
        similarReviews: 89
      }
    },
    {
      id: 2,
      reviewText: `Unfortunately, this product didn\'t meet my expectations at all. The quality feels cheap and flimsy, nothing like what was advertised. I've had it for just 2 weeks and it's already showing signs of wear.

The customer support was unhelpful when I reached out about a replacement. They kept giving me the runaround and never provided a clear solution. The shipping took forever - almost 10 days when they promised 3-5 days.

For the price I paid, I expected much better. I would not recommend this product to anyone. Save your money and look elsewhere.`,
      overallSentiment: {
        label: 'Negative',
        score: -0.82,
        confidence: 0.91
      },
      aspectSentiments: [
        { aspect: 'Quality', sentiment: 'Negative', score: -0.89, confidence: 0.93 },
        { aspect: 'Shipping', sentiment: 'Negative', score: -0.76, confidence: 0.84 },
        { aspect: 'Customer Service', sentiment: 'Negative', score: -0.85, confidence: 0.88 },
        { aspect: 'Value for Money', sentiment: 'Negative', score: -0.78, confidence: 0.82 },
        { aspect: 'Build Quality', sentiment: 'Negative', score: -0.91, confidence: 0.89 }
      ],
      keyPhrases: [
        { phrase: "didn't meet my expectations", sentiment: 'negative', position: 25 },
        { phrase: 'quality feels cheap and flimsy', sentiment: 'negative', position: 85 },
        { phrase: 'customer support was unhelpful', sentiment: 'negative', position: 180 },
        { phrase: 'shipping took forever', sentiment: 'negative', position: 280 },
        { phrase: 'would not recommend', sentiment: 'negative', position: 420 }
      ],
      emotions: ['disappointment', 'frustration', 'regret'],
      reviewerInfo: {
        name: 'Mike R.',
        verified: true,
        helpfulVotes: 15,
        reviewDate: '2024-01-20'
      },
      productContext: {
        averageSentiment: 0.65,
        totalReviews: 1247,
        similarReviews: 34
      }
    },
    {
      id: 3,
      reviewText: `This product is decent for the price range. It's not the best quality I've seen, but it gets the job done. The shipping was standard - nothing to complain about there.

The customer service was okay when I had a minor issue. They resolved it eventually, though it took a few back-and-forth emails. The build quality is average - not premium but not terrible either.

Overall, it's an okay purchase if you're looking for something budget-friendly. Don't expect premium quality, but it serves its purpose well enough.`,
      overallSentiment: {
        label: 'Neutral',
        score: 0.12,
        confidence: 0.67
      },
      aspectSentiments: [
        { aspect: 'Quality', sentiment: 'Neutral', score: 0.05, confidence: 0.62 },
        { aspect: 'Shipping', sentiment: 'Neutral', score: 0.15, confidence: 0.58 },
        { aspect: 'Customer Service', sentiment: 'Neutral', score: 0.08, confidence: 0.64 },
        { aspect: 'Value for Money', sentiment: 'Positive', score: 0.45, confidence: 0.71 },
        { aspect: 'Build Quality', sentiment: 'Neutral', score: 0.02, confidence: 0.59 }
      ],
      keyPhrases: [
        { phrase: 'decent for the price range', sentiment: 'neutral', position: 20 },
        { phrase: 'gets the job done', sentiment: 'neutral', position: 95 },
        { phrase: 'shipping was standard', sentiment: 'neutral', position: 130 },
        { phrase: 'build quality is average', sentiment: 'neutral', position: 280 },
        { phrase: 'serves its purpose well enough', sentiment: 'neutral', position: 420 }
      ],
      emotions: ['acceptance', 'pragmatism'],
      reviewerInfo: {
        name: 'Jennifer L.',
        verified: true,
        helpfulVotes: 8,
        reviewDate: '2024-01-18'
      },
      productContext: {
        averageSentiment: 0.65,
        totalReviews: 1247,
        similarReviews: 156
      }
    }
  ];

  const currentReview = reviewsData[currentReviewIndex];

  const handlePreviousReview = () => {
    setCurrentReviewIndex(prev => prev > 0 ? prev - 1 : reviewsData.length - 1);
  };

  const handleNextReview = () => {
    setCurrentReviewIndex(prev => prev < reviewsData.length - 1 ? prev + 1 : 0);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleAddNote = () => {
    setShowNotesModal(true);
  };

  const handleSaveNote = () => {
    setShowNotesModal(false);
    // In real app, save note to backend
  };

  const handleFlag = () => {
    // In real app, flag review for moderation
    console.log('Review flagged for review');
  };

  const handleShare = () => {
    // In real app, generate shareable link
    console.log('Sharing review analysis');
  };

  const handleClose = () => {
    navigate('/analysis-results-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <ReviewDetailHeader
          currentIndex={currentReviewIndex + 1}
          totalReviews={reviewsData.length}
          onClose={handleClose}
          onShare={handleShare}
        />
      </div>

      <div className="lg:flex lg:gap-6">
        {/* Main Content */}
        <div className="lg:flex-1 lg:max-w-4xl">
          <div className="space-y-6">
            {/* Desktop Header */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleClose}
                    className="flex items-center px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
                  >
                    <Icon name="ArrowLeft" size={20} className="mr-2" />
                    Back to Results
                  </button>
                  <div className="text-sm text-text-secondary">
                    Review {currentReviewIndex + 1} of {reviewsData.length}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBookmark}
                    className={`p-2 rounded-md transition-micro ${
                      isBookmarked 
                        ? 'text-accent bg-accent-50 hover:bg-accent-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                    }`}
                  >
                    <Icon name="Bookmark" size={20} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
                  >
                    <Icon name="Share2" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Review Text Card */}
            <ReviewTextCard 
              review={currentReview}
              onFlag={handleFlag}
              onBookmark={handleBookmark}
              onAddNote={handleAddNote}
              isBookmarked={isBookmarked}
            />

            {/* Overall Sentiment Visualization */}
            <SentimentVisualization sentiment={currentReview.overallSentiment} />

            {/* Aspect-Based Analysis */}
            <AspectBasedAnalysis aspects={currentReview.aspectSentiments} />

            {/* Sentiment Timeline */}
            <SentimentTimeline 
              reviewText={currentReview.reviewText}
              keyPhrases={currentReview.keyPhrases}
            />

            {/* Key Insights */}
            <KeyInsights 
              emotions={currentReview.emotions}
              keyPhrases={currentReview.keyPhrases}
              productContext={currentReview.productContext}
            />

            {/* Navigation */}
            <ReviewNavigation
              currentIndex={currentReviewIndex}
              totalReviews={reviewsData.length}
              onPrevious={handlePreviousReview}
              onNext={handleNextReview}
            />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-80">
          <SimilarReviewsPanel 
            currentReview={currentReview}
            similarCount={currentReview.productContext.similarReviews}
          />
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Add Note
                </h3>
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="p-1 text-text-secondary hover:text-text-primary rounded-md transition-micro"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Add your notes about this review..."
                className="w-full h-32 p-3 border border-border rounded-md resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-micro"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-micro"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualReviewAnalysisDetail;