import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const AnalysisProgressIndicator = ({ 
  isLoading = false, 
  progress = 0, 
  phase = 'idle',
  onCancel 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const phases = {
    idle: { label: 'Ready', icon: 'Circle', color: 'text-secondary' },
    scraping: { label: 'Scraping Reviews', icon: 'Globe', color: 'text-primary' },
    processing: { label: 'Analyzing Sentiment', icon: 'Brain', color: 'text-accent' },
    visualizing: { label: 'Generating Insights', icon: 'BarChart3', color: 'text-success' },
    complete: { label: 'Analysis Complete', icon: 'CheckCircle', color: 'text-success' },
    error: { label: 'Analysis Failed', icon: 'AlertCircle', color: 'text-error' }
  };

  const steps = [
    { label: 'Fetching product data', duration: 2000 },
    { label: 'Extracting reviews', duration: 3000 },
    { label: 'Processing sentiment', duration: 4000 },
    { label: 'Generating visualizations', duration: 2000 },
    { label: 'Finalizing results', duration: 1000 }
  ];

  useEffect(() => {
    if (isLoading && phase === 'scraping') {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading, phase]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  if (!isLoading && phase === 'idle') {
    return null;
  }

  const currentPhase = phases[phase] || phases.idle;

  return (
    <div className="w-full">
      {/* Main Content Loading State */}
      {isLoading && (
        <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`${currentPhase.color} mr-3`}>
                <Icon 
                  name={currentPhase.icon} 
                  size={24} 
                  className={phase === 'processing' ? 'animate-spin' : 'animate-pulse-slow'} 
                />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  {currentPhase.label}
                </h3>
                <p className="text-sm text-text-secondary">
                  {phase === 'scraping' ? steps[currentStep]?.label : 'Please wait while we process your request'}
                </p>
              </div>
            </div>
            {onCancel && (
              <button
                onClick={onCancel}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
                aria-label="Cancel analysis"
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-text-secondary mb-2">
              <span>Progress</span>
              <span>{Math.round(animatedProgress)}%</span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          {phase === 'scraping' && (
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex flex-col items-center text-xs ${
                    index <= currentStep ? 'text-primary' : 'text-text-muted'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mb-1 ${
                    index < currentStep ? 'bg-primary' : 
                    index === currentStep ? 'bg-primary animate-pulse' : 'bg-secondary-200'
                  }`} />
                  <span className="text-center max-w-16">
                    {step.label.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Header Indicator (when analysis is complete but ongoing operations) */}
      {!isLoading && phase !== 'idle' && (
        <div className="flex items-center px-4 py-2 bg-primary-50 border border-primary-100 rounded-md">
          <Icon 
            name={currentPhase.icon} 
            size={16} 
            className={`${currentPhase.color} mr-2`} 
          />
          <span className="text-sm font-medium text-text-primary">
            {currentPhase.label}
          </span>
        </div>
      )}

      {/* Error State */}
      {phase === 'error' && (
        <div className="bg-error-50 border border-error-100 rounded-lg p-4">
          <div className="flex items-center">
            <Icon name="AlertCircle" size={20} className="text-error mr-3" />
            <div>
              <h4 className="text-sm font-medium text-error-700">
                Analysis Failed
              </h4>
              <p className="text-sm text-error-600 mt-1">
                Unable to complete the analysis. Please try again or check your product URL.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisProgressIndicator;