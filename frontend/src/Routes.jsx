import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import ContextualActionPanel from "components/ui/ContextualActionPanel";
import ResultsNavigationBreadcrumb from "components/ui/ResultsNavigationBreadcrumb";

// Page imports
import ProductUrlInputAnalysisSetup from "pages/product-url-input-analysis-setup/product-url-input-analysis-setup";
import AnalysisResultsDashboard from "pages/analysis-results-dashboard/analysis-result-dashboard";
import IndividualReviewAnalysisDetail from "pages/individual-review-analysis-detail/individual-review-analysis-detail";
import SentimentAnalyticsInsights from "pages/sentiment-analytics-insights/sentiment-analytics-management";
import SearchFilterManagement from "pages/search-filter-management/search-filter-management";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-16">
            <div className="container mx-auto px-4 lg:px-6 py-6">
              <ResultsNavigationBreadcrumb />
              <RouterRoutes>
                <Route path="/" element={<ProductUrlInputAnalysisSetup />} />
                <Route path="/product-url-input-analysis-setup" element={<ProductUrlInputAnalysisSetup />} />
                <Route path="/analysis-results-dashboard" element={<AnalysisResultsDashboard />} />
                <Route path="/individual-review-analysis-detail" element={<IndividualReviewAnalysisDetail />} />
                <Route path="/sentiment-analytics-insights" element={<SentimentAnalyticsInsights />} />
                <Route path="/search-filter-management" element={<SearchFilterManagement />} />
              </RouterRoutes>
            </div>
          </main>
          <ContextualActionPanel />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;