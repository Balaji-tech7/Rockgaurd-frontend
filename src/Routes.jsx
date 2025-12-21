import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import SiteRiskAnalysis from './pages/site-risk-analysis';
import MainDashboard from './pages/main-dashboard';
import SensorDataMonitoring from './pages/sensor-data-monitoring';
import PredictiveAnalytics from './pages/predictive-analytics';
import DataImportManagement from './pages/data-import-management';
import AlertManagement from './pages/alert-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AlertManagement />} />
        <Route path="/site-risk-analysis" element={<SiteRiskAnalysis />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/sensor-data-monitoring" element={<SensorDataMonitoring />} />
        <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
        <Route path="/data-import-management" element={<DataImportManagement />} />
        <Route path="/alert-management" element={<AlertManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
