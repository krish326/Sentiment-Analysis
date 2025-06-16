import React from 'react';
import Icon from './AppIcon';

function SummaryCard({ summary, overallSentiment }) {
  const sentimentColor =
      overallSentiment === 'Positive' ? 'bg-green-100 text-green-800' :
          overallSentiment === 'Negative' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800';

  // This improved function handles different list formats (*, -, •)
  const formatSummary = (text) => {
    if (!text) return <p>No summary available.</p>;

    // Split the text into paragraphs by newline
    const paragraphs = text.split('\n').filter(line => line.trim() !== '');

    return paragraphs.map((line, index) => {
      // Style "Pros:" and "Cons:" as bold headings
      if (line.toLowerCase().startsWith('pros:') || line.toLowerCase().startsWith('cons:')) {
        return <p key={index} className="font-semibold text-gray-800 mt-4 mb-2">{line}</p>;
      }

      // Check if the line is a list item
      if (line.match(/^(\s*[\*•-]\s*)/)) {
        return (
            <div key={index} className="flex items-start mb-1">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <p className="flex-1">{line.replace(/^(\s*[\*•-]\s*)/, '')}</p>
            </div>
        );
      }

      // Render any other lines as regular paragraphs
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Analysis Summary</h2>
          </div>
          {overallSentiment && (
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${sentimentColor}`}>
            {overallSentiment}
          </span>
          )}
        </div>
        <div className="text-gray-600 space-y-2 leading-relaxed">
          {formatSummary(summary)}
        </div>
      </div>
  );
}

export default SummaryCard;
