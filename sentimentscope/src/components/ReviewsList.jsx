import React from 'react';
import Icon from './AppIcon';

const SentimentBadge = ({ sentiment }) => {
    const sentimentStyles = {
        positive: 'bg-green-100 text-green-800',
        negative: 'bg-red-100 text-red-800',
        neutral: 'bg-gray-100 text-gray-800',
        'very positive': 'bg-green-100 text-green-800',
        'very negative': 'bg-red-100 text-red-800',
    };

    // Ensure sentiment is a string and handle potential null/undefined values
    const sentimentKey = (sentiment || 'neutral').toLowerCase();
    const style = sentimentStyles[sentimentKey] || sentimentStyles.neutral;

    return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${style}`}>{sentiment}</span>;
};

function ReviewsList({ reviews, totalReviews }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <Icon name="MessageSquare" size={24} className="text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
                </div>
                <span className="text-sm font-medium text-gray-500">{totalReviews || 0} reviews analyzed</span>
            </div>

            {/* This container will scroll if content overflows */}
            <div className="flex-grow overflow-y-auto pr-2 -mr-4" style={{maxHeight: '500px'}}>
                {reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.reviewText}</p>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-semibold text-gray-500">Sentiment:</span>
                                    <SentimentBadge sentiment={review.overallSentiment} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <Icon name="Inbox" size={40} className="mb-4 text-gray-300" />
                        <p className="font-semibold">No Reviews Yet</p>
                        <p className="text-sm">Individual reviews will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewsList;
