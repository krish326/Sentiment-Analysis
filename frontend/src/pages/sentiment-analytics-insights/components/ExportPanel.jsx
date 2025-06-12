import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportPanel = ({ isOpen, onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    trends: true,
    aspects: true,
    competitive: true,
    keywords: true,
    rawData: false
  });

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Comprehensive report with charts and insights' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet', description: 'Raw data and calculations' },
    { value: 'powerpoint', label: 'PowerPoint', icon: 'Presentation', description: 'Presentation-ready slides' },
    { value: 'csv', label: 'CSV Data', icon: 'Database', description: 'Raw data for further analysis' }
  ];

  const sections = [
    { key: 'summary', label: 'Executive Summary', description: 'Key metrics and overview' },
    { key: 'trends', label: 'Sentiment Trends', description: 'Time-based analysis charts' },
    { key: 'aspects', label: 'Aspect Analysis', description: 'Detailed aspect breakdowns' },
    { key: 'competitive', label: 'Competitive Analysis', description: 'Competitor comparisons' },
    { key: 'keywords', label: 'Keyword Analysis', description: 'Top keywords and phrases' },
    { key: 'rawData', label: 'Raw Data', description: 'Complete dataset export' }
  ];

  const handleSectionToggle = (sectionKey) => {
    setSelectedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleExport = () => {
    const exportData = {
      format: selectedFormat,
      sections: selectedSections
    };
    onExport(exportData);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-300"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-surface shadow-lg z-400 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Export Analytics Report
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-micro"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Export Format Selection */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-text-primary mb-4">
              Choose Export Format
            </h4>
            <div className="space-y-3">
              {exportFormats.map(format => (
                <label 
                  key={format.value} 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-micro ${
                    selectedFormat === format.value 
                      ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={selectedFormat === format.value}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    selectedFormat === format.value ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'
                  }`}>
                    <Icon name={format.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{format.label}</div>
                    <div className="text-sm text-text-secondary">{format.description}</div>
                  </div>
                  {selectedFormat === format.value && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Section Selection */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-text-primary mb-4">
              Select Sections to Include
            </h4>
            <div className="space-y-3">
              {sections.map(section => (
                <label 
                  key={section.key} 
                  className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary-50 transition-micro"
                >
                  <input
                    type="checkbox"
                    checked={selectedSections[section.key]}
                    onChange={() => handleSectionToggle(section.key)}
                    className="mr-3 text-primary focus:ring-primary-500 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{section.label}</div>
                    <div className="text-sm text-text-secondary">{section.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Preview */}
          <div className="mb-8 p-4 bg-secondary-50 rounded-lg">
            <h4 className="text-sm font-medium text-text-primary mb-2">
              Export Preview
            </h4>
            <div className="text-sm text-text-secondary">
              <div className="flex items-center justify-between mb-1">
                <span>Format:</span>
                <span className="font-medium">{exportFormats.find(f => f.value === selectedFormat)?.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sections:</span>
                <span className="font-medium">
                  {Object.values(selectedSections).filter(Boolean).length} of {sections.length}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-micro"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={Object.values(selectedSections).every(v => !v)}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-micro disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Download" size={16} className="mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportPanel;