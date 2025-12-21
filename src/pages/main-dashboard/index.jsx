import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import RiskMapPanel from './components/RiskMapPanel';
import KPICards from './components/KPICards';
import RecentAlertsPanel from './components/RecentAlertsPanel';
import EnvironmentalPanel from './components/EnvironmentalPanel';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MainDashboard = () => {
  const [selectedSite, setSelectedSite] = useState('Site Alpha');
  const [alertCount, setAlertCount] = useState(7);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);

  // Mock sites data
  const sites = [
    { value: 'site-alpha', label: 'Site Alpha' },
    { value: 'site-beta', label: 'Site Beta' },
    { value: 'site-gamma', label: 'Site Gamma' },
    { value: 'site-delta', label: 'Site Delta' }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSiteChange = (siteValue) => {
    const site = sites?.find(s => s?.value === siteValue);
    if (site) {
      setSelectedSite(site?.label);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastRefresh(new Date());
    setIsRefreshing(false);
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    // In a real app, this would navigate to detailed analysis
    console.log('Zone clicked:', zone);
  };

  const handleCriticalAlert = () => {
    // Mock critical alert banner
    return alertCount > 5;
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
          
          {/* Critical Alert Banner */}
          {handleCriticalAlert() && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Icon name="AlertTriangle" size={16} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-900">Critical Safety Alert</h3>
                    <p className="text-xs text-red-700">
                      {alertCount} active alerts require immediate attention. Review and take action now.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                    View Alerts
                  </Button>
                  <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                    Emergency Protocol
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Mining Safety Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Real-time rockfall risk monitoring and predictive analytics for {selectedSite}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Last updated: {lastRefresh?.toLocaleTimeString()}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                loading={isRefreshing}
                iconName="RotateCcw" 
                iconPosition="left"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="mb-8">
            <KPICards selectedSite={selectedSite} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Risk Map - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <RiskMapPanel 
                selectedSite={selectedSite} 
                onZoneClick={handleZoneClick}
              />
            </div>
            
            {/* Environmental Panel */}
            <div className="xl:col-span-1">
              <EnvironmentalPanel selectedSite={selectedSite} />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Recent Alerts */}
            <div>
              <RecentAlertsPanel />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActionsPanel />
            </div>
          </div>

          {/* Connection Status Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>AI Engine: Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Sensors: 24/24 Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Weather API: Limited</span>
                </div>
              </div>
              <div className="text-xs">
                RockGuard AI v2.1.0 | © {new Date()?.getFullYear()} Mining Safety Solutions
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;