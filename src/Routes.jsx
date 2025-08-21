import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import GlobalHealthcareInnovationCommandCenter from './pages/global-healthcare-innovation-command-center';
import PredictiveHealthcareTransformationAnalytics from './pages/predictive-healthcare-transformation-analytics';
import RealTimeHealthInnovationMonitoring from './pages/real-time-health-innovation-monitoring';
import HealthcareTechnologyMarketAnalytics from './pages/healthcare-technology-market-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<GlobalHealthcareInnovationCommandCenter />} />
        <Route path="/global-healthcare-innovation-command-center" element={<GlobalHealthcareInnovationCommandCenter />} />
        <Route path="/predictive-healthcare-transformation-analytics" element={<PredictiveHealthcareTransformationAnalytics />} />
        <Route path="/real-time-health-innovation-monitoring" element={<RealTimeHealthInnovationMonitoring />} />
        <Route path="/healthcare-technology-market-analytics" element={<HealthcareTechnologyMarketAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
