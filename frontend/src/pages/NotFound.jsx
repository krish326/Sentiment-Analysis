import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/product-url-input-analysis-setup');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Search" size={48} className="text-primary" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
            404
          </h1>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back to analyzing reviews!
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-micro focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Go to Home
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center px-6 py-3 bg-secondary-100 text-secondary-700 rounded-lg font-medium hover:bg-secondary-200 transition-micro focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            Need help? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;