import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';


const AspectRadarChart = ({ data }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success-50';
    if (score >= 60) return 'bg-warning-50';
    return 'bg-error-50';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Radar Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
          Aspect-Based Sentiment Analysis
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis 
                dataKey="aspect" 
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#64748B' }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.1}
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Aspect Details */}
      <div className="card p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
          Detailed Aspect Scores
        </h3>
        <div className="space-y-4">
          {data.map((aspect, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  aspect.score >= 80 ? 'bg-success' :
                  aspect.score >= 60 ? 'bg-warning' : 'bg-error'
                }`} />
                <span className="font-medium text-text-primary">{aspect.aspect}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-secondary-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      aspect.score >= 80 ? 'bg-success' :
                      aspect.score >= 60 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${aspect.score}%` }}
                  />
                </div>
                <span className={`font-bold text-lg ${getScoreColor(aspect.score)}`}>
                  {aspect.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-semibold text-text-primary mb-4">Performance Summary</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-success-50 rounded-lg">
              <div className="text-lg font-bold text-success">
                {data.filter(item => item.score >= 80).length}
              </div>
              <div className="text-xs text-success-700">Excellent</div>
            </div>
            <div className="text-center p-3 bg-warning-50 rounded-lg">
              <div className="text-lg font-bold text-warning">
                {data.filter(item => item.score >= 60 && item.score < 80).length}
              </div>
              <div className="text-xs text-warning-700">Good</div>
            </div>
            <div className="text-center p-3 bg-error-50 rounded-lg">
              <div className="text-lg font-bold text-error">
                {data.filter(item => item.score < 60).length}
              </div>
              <div className="text-xs text-error-700">Needs Work</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectRadarChart;