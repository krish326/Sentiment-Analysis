import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from 'components/AppIcon';

const SentimentDistributionChart = ({ data }) => {
  const COLORS = {
    'Positive': '#059669',
    'Neutral': '#D97706', 
    'Negative': '#DC2626'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-surface border border-border rounded-lg shadow-md p-3">
          <p className="text-sm font-medium text-text-primary">
            {data.name}: {data.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-text-secondary">
              {entry.value} ({entry.payload.value}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Sentiment Distribution
        </h3>
        <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro">
          <Icon name="MoreHorizontal" size={16} />
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.name]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div 
              className="text-2xl font-bold mb-1"
              style={{ color: COLORS[item.name] }}
            >
              {item.value}%
            </div>
            <div className="text-xs text-text-secondary uppercase tracking-wide">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentDistributionChart;