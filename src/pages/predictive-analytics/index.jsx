import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ForecastVisualization from './components/ForecastVisualization';
import ModelPerformancePanel from './components/ModelPerformancePanel';
import ComparativeAnalysis from './components/ComparativeAnalysis';
import DataCorrelationPanel from './components/DataCorrelationPanel';
import PredictionConfiguration from './components/PredictionConfiguration';
import ExportReports from './components/ExportReports';

const PredictiveAnalytics = () => {
  const [activeTab, setActiveTab] = useState('forecast');
  const [currentSite, setCurrentSite] = useState('Site Alpha');
  const [alertCount] = useState(7);

  const tabs = [
    { id: 'forecast', label: 'Risk Forecast', icon: 'TrendingUp' },
    { id: 'performance', label: 'Model Performance', icon: 'BarChart3' },
    { id: 'comparison', label: 'Comparative Analysis', icon: 'GitCompare' },
    { id: 'correlation', label: 'Data Correlation', icon: 'Activity' },
    { id: 'configuration', label: 'Configuration', icon: 'Settings' },
    { id: 'reports', label: 'Export Reports', icon: 'FileText' }
  ];

  const handleSiteChange = (newSite) => {
    setCurrentSite(newSite);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'forecast':
        return <ForecastVisualization />;
      case 'performance':
        return <ModelPerformancePanel />;
      case 'comparison':
        return <ComparativeAnalysis />;
      case 'correlation':
        return <DataCorrelationPanel />;
      case 'configuration':
        return <PredictionConfiguration />;
      case 'reports':
        return <ExportReports />;
      default:
        return <ForecastVisualization />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentSite={currentSite}
        onSiteChange={handleSiteChange}
        alertCount={alertCount}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Predictive Analytics
                </h1>
                <p className="text-muted-foreground">
                  AI-powered rockfall forecasts and model performance analysis for {currentSite}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <div className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">AI Models Active</span>
                </div>
                
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderActiveTabContent()}
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Brain" size={24} className="text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">4</div>
              <div className="text-sm text-muted-foreground">Active AI Models</div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Target" size={24} className="text-success-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">94.2%</div>
              <div className="text-sm text-muted-foreground">Overall Accuracy</div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Database" size={24} className="text-secondary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">2.4M</div>
              <div className="text-sm text-muted-foreground">Data Points Processed</div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} className="text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">15min</div>
              <div className="text-sm text-muted-foreground">Update Frequency</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PredictiveAnalytics;