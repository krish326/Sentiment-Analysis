import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import Icon from 'components/AppIcon';

const CompetitiveAnalysisChart = ({ data }) => {
  const getSentimentColor = (sentiment) => {
    if (sentiment >= 75) return '#10B981';
    if (sentiment >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getPositionIcon = (index) => {
    switch (index) {
      case 0: return 'Trophy';
      case 1: return 'Medal';
      case 2: return 'Award';
      default: return 'Circle';
    }
  };

  const sortedData = [...data].sort((a, b) => b.sentiment - a.sentiment);

  return (
    <div className="space-y-8">
      {/* Competitive Sentiment Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
          Competitive Sentiment Analysis
        </h3>
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="product" 
                stroke="#64748B"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                formatter={(value, name) => [`${value}%`, 'Sentiment Score']}
              />
              <Bar 
                dataKey="sentiment" 
                fill="#2563EB"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitive Ranking */}
      <div className="card p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
          Competitive Ranking
        </h3>
        <div className="space-y-4">
          {sortedData.map((product, index) => (
            <div 
              key={product.product} 
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                product.product === 'Your Product' ?'border-primary bg-primary-50' :'border-border bg-surface'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  index === 0 ? 'bg-warning text-white' :
                  index === 1 ? 'bg-secondary-300 text-white' :
                  index === 2 ? 'bg-warning-200 text-warning-800' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <Icon name={getPositionIcon(index)} size={16} />
                </div>
                <div>
                  <div className={`font-semibold ${
                    product.product === 'Your Product' ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {product.product}
                    {product.product === 'Your Product' && (
                      <span className="ml-2 px-2 py-1 text-xs bg-primary text-white rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {product.reviews.toLocaleString()} reviews • {product.rating}★ rating
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: getSentimentColor(product.sentiment) }}
                >
                  {product.sentiment}%
                </div>
                <div className="text-sm text-text-secondary">Sentiment</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment vs Reviews Scatter Plot */}
      <div className="card p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
          Sentiment vs Review Volume
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                type="number" 
                dataKey="reviews" 
                name="Reviews"
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                type="number" 
                dataKey="sentiment" 
                name="Sentiment"
                stroke="#64748B"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                formatter={(value, name) => [
                  name === 'reviews' ? value.toLocaleString() : `${value}%`,
                  name === 'reviews' ? 'Reviews' : 'Sentiment'
                ]}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    return payload[0].payload.product;
                  }
                  return '';
                }}
              />
              <Scatter 
                data={data} 
                fill="#2563EB"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-text-secondary">
          <p>
            <strong>Insight:</strong> Higher review volumes don't always correlate with better sentiment. 
            Focus on quality improvements to maintain positive sentiment as you scale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAnalysisChart;