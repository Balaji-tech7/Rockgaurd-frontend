import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import RiskVisualization3D from './components/RiskVisualization3D';
import HistoricalTrendAnalysis from './components/HistoricalTrendAnalysis';
import DataSourceTabs from './components/DataSourceTabs';
import RiskFilterControls from './components/RiskFilterControls';
import ActionPanel from './components/ActionPanel';

const SiteRiskAnalysis = () => {
  const location = useLocation();
  const [selectedSite, setSelectedSite] = useState('Site Alpha');
  const [selectedRiskZone, setSelectedRiskZone] = useState(null);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [alertCount] = useState(12);

    // ===== ML Prediction State (ADDED) =====
  const [predictionResult, setPredictionResult] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);


  const siteOptions = [
    { value: 'site-alpha', label: 'Site Alpha' },
    { value: 'site-beta', label: 'Site Beta' },
    { value: 'site-gamma', label: 'Site Gamma' },
    { value: 'site-delta', label: 'Site Delta' }
  ];

  const mockRiskSummary = {
    totalZones: 15,
    criticalZones: 2,
    highRiskZones: 4,
    mediumRiskZones: 6,
    lowRiskZones: 3,
    overallRiskScore: 0.67,
    predictionAccuracy: 0.89,
    activeSensors: 28,
    lastModelUpdate: new Date(Date.now() - 3600000)
  };

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedSite, filters]);

  const handleSiteChange = (siteValue) => {
    const site = siteOptions?.find(s => s?.value === siteValue);
    setSelectedSite(site?.label || 'Site Alpha');
    setSelectedRiskZone(null);
  };

  const handleRiskZoneSelect = (zone) => {
    setSelectedRiskZone(zone);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDataUpdate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const handleActionTaken = (actionType, actionData) => {
    console.log(`Action taken: ${actionType}`, actionData);
    // Handle different action types
    switch (actionType) {
      case 'report-generated':
        // Show success message or handle report generation
        break;
      case 'alerts-configured':
        // Update alert configuration
        break;
      case 'maintenance-scheduled':
        // Add to maintenance schedule
        break;
      case 'emergency-initiated':
        // Handle emergency protocol
        break;
      default:
        break;
    }
  };

  const refreshAllData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 3000);
  };
  // ===== Rockfall ML Prediction (ADDED) =====
  const runRockfallPrediction = async () => {
    setPredictionLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rainfall: 60,        // simulated input
          slope: 45,
          soil_moisture: 55,
          vibration: 0.6,
          rock_type: 1         // 0 = hard rock, 1 = soft rock
        })
      });

      const result = await response.json();
      setPredictionResult(result);
    } catch (error) {
      console.error("Rockfall prediction failed:", error);
    } finally {
      setPredictionLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentSite={selectedSite}
        onSiteChange={handleSiteChange}
        alertCount={alertCount}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Site Risk Analysis
              </h1>
              <p className="text-muted-foreground">
                Comprehensive rockfall prediction and geological risk assessment for {selectedSite}
              </p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Activity" size={16} />
                  <span>{mockRiskSummary?.activeSensors} sensors active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Target" size={16} />
                  <span>{Math.round(mockRiskSummary?.predictionAccuracy * 100)}% accuracy</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Select
                options={siteOptions}
                value={siteOptions?.find(s => s?.label === selectedSite)?.value || 'site-alpha'}
                onChange={handleSiteChange}
                className="w-48"
              />
              <Button
                variant="outline"
                onClick={refreshAllData}
                disabled={isLoading}
              >
                <Icon name="RefreshCw" size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button>
                <Icon name="Download" size={16} className="mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Risk Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Total Zones</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{mockRiskSummary?.totalZones}</div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span className="text-sm font-medium text-muted-foreground">Critical</span>
              </div>
              <div className="text-2xl font-bold text-error">{mockRiskSummary?.criticalZones}</div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-muted-foreground">High Risk</span>
              </div>
              <div className="text-2xl font-bold text-warning">{mockRiskSummary?.highRiskZones}</div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Medium</span>
              </div>
              <div className="text-2xl font-bold text-accent">{mockRiskSummary?.mediumRiskZones}</div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-muted-foreground">Low Risk</span>
              </div>
              <div className="text-2xl font-bold text-success">{mockRiskSummary?.lowRiskZones}</div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(mockRiskSummary?.overallRiskScore * 100)}%
              </div>
            </div>
          </div>

 
{/* ===== AI Rockfall Prediction Panel (ADDED) ===== */}
<div className="bg-card border border-border rounded-lg p-6 mb-8">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-foreground">
      AI Rockfall Risk Prediction
    </h2>

    <Button onClick={runRockfallPrediction} disabled={predictionLoading}>
      {predictionLoading ? "Predicting..." : "Run Prediction"}
    </Button>
  </div>
  ...
</div>


  {predictionResult ? (
    <div className="flex items-center space-x-6">
      <div>
        <p className="text-sm text-muted-foreground">Risk Level</p>
        <p className="text-2xl font-bold">
          {predictionResult.risk_level}
        </p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Confidence</p>
        <p className="text-2xl font-bold">
          {predictionResult.confidence}%
        </p>
      </div>
    </div>
  ) : (
    <p className="text-muted-foreground">
      Click <strong>Run Prediction</strong> to analyze rockfall risk using AI.
    </p>
  )}
</div>


          {/* Filter Controls */}
          <div className="mb-8">
            <RiskFilterControls
              onFiltersChange={handleFiltersChange}
              currentFilters={filters}
            />
          </div>

          {/* Main Analysis Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* 3D Visualization - Takes 2 columns */}
            <div className="xl:col-span-2">
              <RiskVisualization3D
                selectedSite={selectedSite}
                riskData={mockRiskSummary}
                onRiskZoneSelect={handleRiskZoneSelect}
              />
            </div>
            
            {/* Action Panel */}
            <div>
              <ActionPanel
                selectedRiskZone={selectedRiskZone}
                onActionTaken={handleActionTaken}
              />
            </div>
          </div>

          {/* Historical Trends */}
          <div className="mb-8">
            <HistoricalTrendAnalysis selectedSite={selectedSite} />
          </div>

          {/* Data Sources */}
          <div>
            <DataSourceTabs
              selectedSite={selectedSite}
              onDataUpdate={handleDataUpdate}
            />
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-card rounded-lg border border-border p-8 flex flex-col items-center space-y-4">
                <Icon name="Loader2" size={32} className="animate-spin text-primary" />
                <div className="text-lg font-medium text-foreground">Processing Risk Analysis</div>
                <div className="text-sm text-muted-foreground">Analyzing geological data and sensor readings...</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SiteRiskAnalysis;