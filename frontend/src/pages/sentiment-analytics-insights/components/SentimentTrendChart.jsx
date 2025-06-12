import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const SentimentTrendChart = ({ data, chartType, onChartTypeChange }) => {
  const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const processedData = data.map(item => ({
    ...item,
    date: formatDate(item.date)
  }));

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 lg:mb-0">
          Sentiment Trends Over Time
        </h3>
        <div className="flex items-center space-x-2">
          {chartTypes.map(type => (
            <button
              key={type.value}
              onClick={() => onChartTypeChange(type.value)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                chartType === type.value
                  ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              <Icon name={type.icon} size={16} className="mr-2" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Positive %"
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                name="Negative %"
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                name="Neutral %"
              />
            </LineChart>
          ) : (
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              <Legend />
              <Bar dataKey="positive" fill="#10B981" name="Positive %" />
              <Bar dataKey="negative" fill="#EF4444" name="Negative %" />
              <Bar dataKey="neutral" fill="#F59E0B" name="Neutral %" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {Math.round(processedData.reduce((acc, item) => acc + item.positive, 0) / processedData.length)}%
          </div>
          <div className="text-sm text-text-secondary">Avg Positive</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-error mb-1">
            {Math.round(processedData.reduce((acc, item) => acc + item.negative, 0) / processedData.length)}%
          </div>
          <div className="text-sm text-text-secondary">Avg Negative</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning mb-1">
            {Math.round(processedData.reduce((acc, item) => acc + item.neutral, 0) / processedData.length)}%
          </div>
          <div className="text-sm text-text-secondary">Avg Neutral</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {processedData.reduce((acc, item) => acc + item.total, 0).toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary">Total Reviews</div>
        </div>
      </div>
    </div>
  );
};

export default SentimentTrendChart;