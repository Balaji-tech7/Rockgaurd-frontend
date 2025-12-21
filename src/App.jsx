import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

// Layout Component
const Layout = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900">🚀 RockGuard AI</h1>
            </div>
            <nav className="flex space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/analytics" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/analytics') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Analytics
              </Link>
              <Link 
                to="/sensors" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/sensors') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Sensors
              </Link>
              <Link 
                to="/alerts" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/alerts') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Alerts
              </Link>
              <Link 
                to="/risk-analysis" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/risk-analysis') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Risk Analysis
              </Link>
              <Link 
                to="/data-management" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/data-management') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Data Import
              </Link>
              <Link 
                to="/settings" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/settings') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Settings
              </Link>
              <Link 
                to="/reports" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/reports') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Reports
              </Link>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

// Dashboard Component with Real-time Data
const Dashboard = () => {
  const [realTimeData, setRealTimeData] = useState({
    activeSensors: 24,
    riskLevel: 'Medium',
    activeAlerts: 5,
    predictions: 12,
    siteStatus: 'Operational',
    lastUpdate: new Date(),
    modelAccuracy: 94.7,
    monitoredZones: 4,
    sensorsPerZone: 6,
    networkCoverage: 98.2
  });

  const [showRainfallPrediction, setShowRainfallPrediction] = useState(false);
  const [rainfallHours, setRainfallHours] = useState(6);
  const [rainfallPredictionData, setRainfallPredictionData] = useState(null);

  const [chartData, setChartData] = useState([
    { time: '00:00', seismic: 2.1, displacement: 0.3, temperature: 15 },
    { time: '04:00', seismic: 2.3, displacement: 0.4, temperature: 16 },
    { time: '08:00', seismic: 2.8, displacement: 0.6, temperature: 18 },
    { time: '12:00', seismic: 3.1, displacement: 0.8, temperature: 22 },
    { time: '16:00', seismic: 2.9, displacement: 0.7, temperature: 20 },
    { time: '20:00', seismic: 2.4, displacement: 0.5, temperature: 17 }
  ]);

  // Site X Environmental Conditions
  const [environmentalData, setEnvironmentalData] = useState({
    rainfall: { current: 2.3, unit: 'mm/hr', trend: 'increasing' },
    windSpeed: { current: 12.7, unit: 'km/h', trend: 'stable' },
    temperature: { current: 18.2, unit: '°C', trend: 'stable' },
    pressure: { current: 1013.2, unit: 'hPa', trend: 'decreasing' },
    humidity: { current: 67, unit: '%', trend: 'increasing' },
    vibration: { current: 0.4, unit: 'mm/s', trend: 'normal' }
  });

  // Site X Risk Zones
  const [siteXRiskZones, setSiteXRiskZones] = useState([
    { id: 'zone-a', name: 'North Pit A', risk: 85, level: 'Critical', color: 'red' },
    { id: 'zone-b', name: 'South Pit B', risk: 45, level: 'Medium', color: 'yellow' },
    { id: 'zone-c', name: 'East Slope C', risk: 72, level: 'High', color: 'orange' },
    { id: 'zone-d', name: 'West Processing', risk: 23, level: 'Low', color: 'green' }
  ]);

  const generateRainfallPrediction = () => {
    const hours = Array.from({length: rainfallHours}, (_, i) => {
      const hour = new Date(Date.now() + (i + 1) * 3600000);
      return {
        time: hour.getHours() + ':00',
        rainfall: Math.max(0, 2.3 + Math.random() * 8 - 4),
        probability: Math.min(100, 45 + Math.random() * 40),
        intensity: ['Light', 'Moderate', 'Heavy'][Math.floor(Math.random() * 3)]
      };
    });
    
    setRainfallPredictionData({
      forecast: hours,
      totalExpected: hours.reduce((sum, h) => sum + h.rainfall, 0).toFixed(1),
      confidence: (85 + Math.random() * 10).toFixed(1),
      riskImpact: hours.some(h => h.rainfall > 5) ? 'High' : 'Medium'
    });
    setShowRainfallPrediction(true);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeSensors: prev.activeSensors + Math.floor(Math.random() * 3) - 1,
        activeAlerts: Math.max(0, prev.activeAlerts + Math.floor(Math.random() * 3) - 1),
        lastUpdate: new Date()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">🎯 Site X Control Center</h1>
                <p className="text-blue-100 text-lg">Integrated Sensor Monitoring & Predictive Risk Analytics</p>
                <p className="text-sm text-blue-200 mt-2">
                  ⏱️ Last updated: {realTimeData.lastUpdate.toLocaleTimeString()} 
                  <span className="mx-2">•</span>
                  🎯 Model Accuracy: {realTimeData.modelAccuracy}%
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">🚀 {realTimeData.siteStatus}</div>
                <div className="text-blue-200">Site Status</div>
                <div className="text-sm text-blue-200 mt-1">🗺️ {realTimeData.monitoredZones} zones • 📶 {realTimeData.networkCoverage}% coverage</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Active Sensors</p>
                <p className="text-2xl font-light text-gray-900">{realTimeData.activeSensors}</p>
                <p className="text-xs text-gray-400 mt-1">+2% from yesterday</p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Risk Level</p>
                <p className="text-2xl font-light text-gray-900">{realTimeData.riskLevel}</p>
                <p className="text-xs text-gray-400 mt-1">Score: 2.1/10</p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Critical Alerts</p>
                <p className="text-2xl font-light text-gray-900">{realTimeData.activeAlerts}</p>
                <p className="text-xs text-gray-400 mt-1">{Math.ceil(realTimeData.activeAlerts/2)} critical, {Math.floor(realTimeData.activeAlerts/2)} high</p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">AI Predictions</p>
                <p className="text-2xl font-light text-gray-900">{realTimeData.predictions}</p>
                <p className="text-xs text-gray-400 mt-1">Update in 15min</p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Site X Risk Map and Environmental Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Risk Map for Site X */}
          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">Risk Map - Site X</h3>
              <div className="text-xs text-gray-500">RBM Score-based</div>
            </div>
            <div className="h-64 bg-gray-100 rounded-lg relative overflow-hidden border">
              {/* Risk zones visualization */}
              {siteXRiskZones.map((zone, index) => (
                <div 
                  key={zone.id}
                  className={`absolute rounded-lg opacity-80 border-2 cursor-pointer transition-all hover:opacity-100 ${
                    zone.color === 'red' ? 'bg-red-500 border-red-600' :
                    zone.color === 'orange' ? 'bg-orange-500 border-orange-600' :
                    zone.color === 'yellow' ? 'bg-yellow-500 border-yellow-600' :
                    'bg-green-500 border-green-600'
                  }`}
                  style={{
                    left: `${15 + index * 20}%`,
                    top: `${20 + (index % 2) * 30}%`,
                    width: '18%',
                    height: '25%'
                  }}
                  title={`${zone.name}: ${zone.level} Risk (${zone.risk}%)`}
                >
                  <div className="p-2 text-white text-xs font-bold">
                    <div>{zone.name}</div>
                    <div>{zone.risk}%</div>
                  </div>
                </div>
              ))}
              
              {/* Risk legend */}
              <div className="absolute bottom-2 left-2 bg-white rounded p-2 shadow text-xs">
                <div className="font-semibold mb-1">Risk Levels:</div>
                <div className="flex items-center mb-1"><div className="w-3 h-3 bg-red-500 rounded mr-1"></div>Critical (&gt;70%)</div>
                <div className="flex items-center mb-1"><div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>High (50-70%)</div>
                <div className="flex items-center mb-1"><div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>Medium (30-50%)</div>
                <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-1"></div>Low (&lt;30%)</div>
              </div>
            </div>
          </div>

          {/* Environmental Conditions Panel */}
          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">Environmental Conditions</h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(environmentalData).map(([key, data]) => (
                <div key={key} className="border border-gray-100 rounded-sm p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className={`text-xs ${
                      data.trend === 'increasing' ? 'text-red-500' :
                      data.trend === 'decreasing' ? 'text-blue-500' :
                      'text-gray-400'
                    }`}>
                      {data.trend === 'increasing' ? '↗' : data.trend === 'decreasing' ? '↘' : '→'}
                    </span>
                  </div>
                  <div className="text-lg font-light text-gray-900">{data.current} {data.unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Toolbar */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 mb-8">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={generateRainfallPrediction}
              className="flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-sm text-sm font-medium transition-colors"
            >
              Rainfall Prediction
              <select 
                value={rainfallHours} 
                onChange={(e) => setRainfallHours(parseInt(e.target.value))}
                className="ml-2 mr-1 px-1 py-0 bg-gray-800 border border-gray-700 rounded-sm text-white text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                {[3,6,12,24].map(h => <option key={h} value={h}>{h}h</option>)}
              </select>
            </button>
            
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-sm text-sm font-medium transition-colors">
              Emergency Alert
            </button>
            
            <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-sm text-sm font-medium transition-colors">
              Refresh Models
            </button>
            
            <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-sm text-sm font-medium transition-colors">
              Schedule Survey
            </button>
          </div>
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Real-time Chart */}
          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">Real-time Monitoring</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
            <div className="h-64 bg-gray-50 border border-gray-200 rounded-sm p-4">
              <div className="h-full flex items-end justify-between space-x-1">
                {chartData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-sm mb-2"
                      style={{height: `${data.seismic * 20}px`}}
                    ></div>
                    <span className="text-xs text-gray-500">{data.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Seismic Activity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Site Overview Map */}
          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Site Overview</h3>
            <div className="h-64 bg-gray-50 border border-gray-200 rounded-sm relative overflow-hidden">
              {/* Minimal site visualization */}
              <div className="absolute inset-0 p-6">
                {/* North Pit */}
                <div className="absolute top-6 left-6 w-16 h-12 border-2 border-red-500 bg-white rounded-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-900">North</div>
                    <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>
                  </div>
                </div>
                
                {/* South Pit */}
                <div className="absolute bottom-6 left-6 w-16 h-12 border-2 border-yellow-500 bg-white rounded-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-900">South</div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto mt-1"></div>
                  </div>
                </div>
                
                {/* Processing Area */}
                <div className="absolute top-1/2 right-6 transform -translate-y-1/2 w-16 h-12 border-2 border-green-500 bg-white rounded-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-900">Processing</div>
                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
                  </div>
                </div>
                
                {/* Sensors */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-blue-500 rounded-full"></div>
              </div>
              
              <div className="absolute bottom-3 left-3 text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                    <span>Sensors</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Recent Activity</h3>
            <div className="space-y-2">
              {[
                { text: 'Sensor NP-A-01 data processed successfully', time: '2 minutes ago', type: 'success' },
                { text: 'Risk assessment completed for Zone B', time: '15 minutes ago', type: 'warning' },
                { text: 'AI predictive model updated with new data', time: '1 hour ago', type: 'info' },
                { text: 'Maintenance scheduled for sensor ES-S1-02', time: '2 hours ago', type: 'maintenance' },
                { text: 'Weekly safety report generated', time: '3 hours ago', type: 'report' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start justify-between p-2 border-l-2 border-gray-200 hover:border-blue-300 bg-gray-50">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    activity.type === 'info' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">Critical Alerts</h3>
              <Link to="/alerts" className="text-xs text-blue-600 hover:text-blue-800 font-medium">View all</Link>
            </div>
            <div className="space-y-3">
              {[
                { 
                  id: 'ALT-2025-001', 
                  severity: 'Critical', 
                  location: 'North Pit - Zone A', 
                  type: 'Rockfall Risk', 
                  probability: 92,
                  time: '8:30 AM'
                },
                { 
                  id: 'ALT-2025-002', 
                  severity: 'High', 
                  location: 'South Pit - Zone C', 
                  type: 'Slope Instability', 
                  probability: 78,
                  time: '7:15 AM'
                },
                { 
                  id: 'ALT-2025-003', 
                  severity: 'Medium', 
                  location: 'East Slope - Sector 1', 
                  type: 'Ground Movement', 
                  probability: 65,
                  time: '6:45 AM'
                }
              ].map((alert, index) => (
                <div key={index} className="border border-gray-200 rounded-sm p-3 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{alert.id}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === 'Critical' ? 'bg-red-500' :
                      alert.severity === 'High' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{alert.type} • {alert.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${
                            alert.probability >= 80 ? 'bg-red-500' :
                            alert.probability >= 60 ? 'bg-orange-500' :
                            'bg-yellow-500'
                          }`}
                          style={{width: `${alert.probability}%`}}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{alert.probability}%</span>
                    </div>
                    <span className="text-xs text-gray-400">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Rainfall Prediction Modal */}
        {showRainfallPrediction && rainfallPredictionData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Rainfall Prediction - Next {rainfallHours} Hours
                </h2>
                <button 
                  onClick={() => setShowRainfallPrediction(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                {/* Prediction Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{rainfallPredictionData.totalExpected}mm</div>
                    <div className="text-sm text-blue-600">Total Expected</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{rainfallPredictionData.confidence}%</div>
                    <div className="text-sm text-green-600">Confidence</div>
                  </div>
                  <div className={`rounded-lg p-4 text-center ${
                    rainfallPredictionData.riskImpact === 'High' ? 'bg-red-50' : 'bg-yellow-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      rainfallPredictionData.riskImpact === 'High' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {rainfallPredictionData.riskImpact}
                    </div>
                    <div className={`text-sm ${
                      rainfallPredictionData.riskImpact === 'High' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      Risk Impact
                    </div>
                  </div>
                </div>
                
                {/* Hourly Forecast */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rainfall (mm)</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Probability (%)</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Intensity</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rainfallPredictionData.forecast.map((hour, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">{hour.time}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{hour.rainfall.toFixed(1)}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{hour.probability.toFixed(0)}%</td>
                            <td className="px-4 py-2 text-sm">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                hour.intensity === 'Heavy' ? 'bg-red-100 text-red-800' :
                                hour.intensity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {hour.intensity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Risk Assessment */}
                <div className={`rounded-lg p-4 ${
                  rainfallPredictionData.riskImpact === 'High' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <h4 className={`text-lg font-semibold mb-2 ${
                    rainfallPredictionData.riskImpact === 'High' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    Risk Assessment
                  </h4>
                  <div className={`text-sm ${
                    rainfallPredictionData.riskImpact === 'High' ? 'text-red-700' : 'text-yellow-700'
                  }`}>
                    {rainfallPredictionData.riskImpact === 'High' ? (
                      <div>
                        <p className="mb-2"><strong>HIGH RISK CONDITIONS EXPECTED:</strong></p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Heavy rainfall may trigger slope instabilities in North Pit Zone A</li>
                          <li>Increased groundwater levels could affect excavation operations</li>
                          <li>Recommend activating drainage systems and monitoring protocols</li>
                          <li>Consider suspending operations in high-risk zones during peak rainfall</li>
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-2"><strong>MODERATE RISK CONDITIONS:</strong></p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Expected rainfall within normal operational parameters</li>
                          <li>Continue standard monitoring protocols</li>
                          <li>Prepare drainage systems for potential activation</li>
                          <li>Monitor real-time conditions for any changes</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <div className="text-xs text-gray-500">
                    Generated at {new Date().toLocaleString()} | Model: WeatherPredict-AI v2.1
                  </div>
                  <button 
                    onClick={() => setShowRainfallPrediction(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

// Enhanced Alert Management Component
const AlertManagement = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filters, setFilters] = useState({ severity: '', status: '', location: '' });
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showModal, setShowModal] = useState(false);

  const [alerts, setAlerts] = useState([
    {
      id: 'ALT-2025-001',
      timestamp: '2025-01-16T08:30:00',
      location: 'North Pit - Zone A',
      severity: 'Critical',
      riskType: 'Rockfall',
      status: 'Active',
      description: 'Critical rockfall risk detected in North Pit Zone A. AI analysis indicates 92% probability of rockfall within next 6 hours based on recent ground movement patterns, increased vibration levels, and adverse weather conditions. Immediate evacuation of personnel recommended. Emergency response protocols should be activated.',
      riskProbability: 92,
      affectedArea: '150m x 200m',
      sensorSource: 'Sensor Array NP-A-01',
      weather: { condition: 'Heavy Rain', temp: '12°C', wind: '25 km/h', rainfall: '45mm/24h' },
      coordinates: { lat: -33.8688, lng: 151.2093 },
      responseHistory: [
        { user: 'Sarah Johnson', action: 'Alert Generated', timestamp: '2025-01-16T08:30:00', notes: 'Automated alert generated by AI system' },
        { user: 'Mike Chen', action: 'Alert Acknowledged', timestamp: '2025-01-16T08:35:00', notes: 'Safety team notified, area access restricted' }
      ],
      recommendations: [
        'Immediate evacuation of North Pit Zone A',
        'Deploy emergency response team',
        'Monitor weather conditions closely',
        'Increase sensor monitoring frequency'
      ]
    },
    {
      id: 'ALT-2025-002',
      timestamp: '2025-01-16T07:15:00',
      location: 'South Pit - Zone C',
      severity: 'High',
      riskType: 'Slope Instability',
      status: 'Acknowledged',
      description: 'High risk slope instability detected in South Pit Zone C. Monitoring sensors show increased displacement rates and stress patterns indicating potential slope failure. Recommended actions include restricting access and increasing monitoring frequency.',
      riskProbability: 78,
      affectedArea: '300m x 150m',
      sensorSource: 'Geotechnical Array SP-C-03',
      weather: { condition: 'Overcast', temp: '15°C', wind: '12 km/h', rainfall: '5mm/24h' },
      coordinates: { lat: -33.8700, lng: 151.2080 },
      responseHistory: [
        { user: 'System', action: 'Alert Generated', timestamp: '2025-01-16T07:15:00', notes: 'Automated alert generated by AI system' },
        { user: 'Dr. Emily Rodriguez', action: 'Investigation Started', timestamp: '2025-01-16T07:30:00', notes: 'Geotechnical team deployed for detailed assessment' }
      ],
      recommendations: [
        'Restrict access to South Pit Zone C',
        'Deploy geotechnical monitoring team',
        'Increase displacement sensor frequency',
        'Prepare contingency evacuation plan'
      ]
    },
    {
      id: 'ALT-2025-003',
      timestamp: '2025-01-16T06:45:00',
      location: 'East Slope - Sector 1',
      severity: 'Medium',
      riskType: 'Ground Movement',
      status: 'Investigating',
      description: 'Medium risk ground movement detected in East Slope Sector 1. Gradual displacement patterns observed over past 48 hours with accelerating trend. Geotechnical team investigating root cause and assessing long-term stability.',
      riskProbability: 65,
      affectedArea: '100m x 100m',
      sensorSource: 'Displacement Monitor ES-S1-02',
      weather: { condition: 'Clear', temp: '18°C', wind: '8 km/h', rainfall: '0mm/24h' },
      coordinates: { lat: -33.8675, lng: 151.2110 },
      responseHistory: [
        { user: 'System', action: 'Alert Generated', timestamp: '2025-01-16T06:45:00', notes: 'Automated alert generated by AI system' },
        { user: 'James Wilson', action: 'Alert Acknowledged', timestamp: '2025-01-16T07:00:00', notes: 'Field inspection scheduled' }
      ],
      recommendations: [
        'Continue monitoring displacement patterns',
        'Schedule detailed geotechnical survey',
        'Review historical ground movement data',
        'Assess impact on nearby infrastructure'
      ]
    },
    {
      id: 'ALT-2025-004',
      timestamp: '2025-01-16T05:30:00',
      location: 'West Slope - Sector 2',
      severity: 'Low',
      riskType: 'Environmental',
      status: 'Resolved',
      description: 'Low risk environmental alert for West Slope Sector 2. Elevated dust levels detected due to increased wind activity. Dust suppression systems activated and levels returned to normal parameters.',
      riskProbability: 25,
      affectedArea: '50m x 75m',
      sensorSource: 'Environmental Monitor WS-S2-01',
      weather: { condition: 'Windy', temp: '20°C', wind: '35 km/h', rainfall: '0mm/24h' },
      coordinates: { lat: -33.8650, lng: 151.2050 },
      responseHistory: [
        { user: 'System', action: 'Alert Generated', timestamp: '2025-01-16T05:30:00', notes: 'Automated alert generated by AI system' },
        { user: 'Lisa Thompson', action: 'Dust Suppression Activated', timestamp: '2025-01-16T05:45:00', notes: 'Automatic dust suppression system engaged' },
        { user: 'Lisa Thompson', action: 'Alert Resolved', timestamp: '2025-01-16T06:15:00', notes: 'Dust levels returned to normal, alert resolved' }
      ],
      recommendations: [
        'Monitor wind conditions',
        'Maintain dust suppression systems',
        'Review environmental thresholds',
        'Schedule routine maintenance'
      ]
    }
  ]);

  // Filter and sort alerts
  const filteredAndSortedAlerts = alerts
    .filter(alert => {
      return (
        (!filters.severity || alert.severity === filters.severity) &&
        (!filters.status || alert.status === filters.status) &&
        (!filters.location || alert.location.toLowerCase().includes(filters.location.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'timestamp') {
        return sortOrder === 'desc' 
          ? new Date(b.timestamp) - new Date(a.timestamp)
          : new Date(a.timestamp) - new Date(b.timestamp);
      }
      if (sortBy === 'severity') {
        const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return sortOrder === 'desc'
          ? severityOrder[b.severity] - severityOrder[a.severity]
          : severityOrder[a.severity] - severityOrder[b.severity];
      }
      return 0;
    });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Acknowledged': return 'bg-blue-100 text-blue-800';
      case 'Investigating': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAlertAction = (alertId, action) => {
    const newEntry = {
      user: 'Current User',
      action: action,
      timestamp: new Date().toISOString(),
      notes: `Alert ${action.toLowerCase()} by user`
    };

    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            status: action === 'Acknowledge' ? 'Acknowledged' : action === 'Resolve' ? 'Resolved' : alert.status,
            responseHistory: [...alert.responseHistory, newEntry]
          }
        : alert
    ));
  };

  return (
    <Layout>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Alert Management Center</h1>
            <p className="text-red-100">Monitor, analyze, and respond to safety alerts across all mining operations</p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{alerts.filter(a => a.status === 'Active').length}</div>
                <div className="text-sm text-red-200">Active Alerts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{alerts.filter(a => a.severity === 'Critical').length}</div>
                <div className="text-sm text-red-200">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{alerts.filter(a => a.status === 'Resolved').length}</div>
                <div className="text-sm text-red-200">Resolved Today</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={filters.severity}
                onChange={(e) => setFilters({...filters, severity: e.target.value})}
              >
                <option value="">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Acknowledged">Acknowledged</option>
                <option value="Investigating">Investigating</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                className="border rounded-md px-3 py-2 text-sm w-48"
                placeholder="Filter by location..."
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <option value="timestamp-desc">Newest First</option>
                <option value="timestamp-asc">Oldest First</option>
                <option value="severity-desc">Highest Severity</option>
                <option value="severity-asc">Lowest Severity</option>
              </select>
            </div>
            <div className="ml-auto">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Alert Cards View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedAlerts.map((alert) => (
            <div key={alert.id} className={`bg-white rounded-lg shadow-lg border-l-4 ${
              alert.severity === 'Critical' ? 'border-red-500' :
              alert.severity === 'High' ? 'border-orange-500' :
              alert.severity === 'Medium' ? 'border-yellow-500' :
              'border-green-500'
            }`}>
              <div className="p-6">
                {/* Alert Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{alert.id}</h3>
                    <p className="text-sm text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>

                {/* Location and Risk Type */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="font-medium">{alert.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{alert.riskType}</span>
                  </div>
                </div>

                {/* Risk Probability */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Risk Probability</span>
                    <span className="text-sm font-bold text-gray-900">{alert.riskProbability}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        alert.riskProbability >= 80 ? 'bg-red-600' :
                        alert.riskProbability >= 60 ? 'bg-orange-500' :
                        alert.riskProbability >= 40 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{width: `${alert.riskProbability}%`}}
                    ></div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {alert.description.substring(0, 120)}...
                </p>

                {/* Status and Actions */}
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                  <div className="flex space-x-2">
                    {alert.status === 'Active' && (
                      <button 
                        onClick={() => handleAlertAction(alert.id, 'Acknowledge')}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                      >
                        Acknowledge
                      </button>
                    )}
                    {(alert.status === 'Active' || alert.status === 'Acknowledged') && (
                      <button 
                        onClick={() => handleAlertAction(alert.id, 'Resolve')}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200"
                      >
                        Resolve
                      </button>
                    )}
                    <button 
                      onClick={() => { setSelectedAlert(alert); setShowModal(true); }}
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alert Detail Modal */}
        {showModal && selectedAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Alert Details - {selectedAlert.id}</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Alert Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Alert Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Severity</label>
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedAlert.severity)}`}>
                          {selectedAlert.severity}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Risk Type</label>
                        <p className="text-sm text-gray-900">{selectedAlert.riskType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Location</label>
                        <p className="text-sm text-gray-900">{selectedAlert.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Affected Area</label>
                        <p className="text-sm text-gray-900">{selectedAlert.affectedArea}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Sensor Source</label>
                        <p className="text-sm text-gray-900">{selectedAlert.sensorSource}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Risk Probability</label>
                        <div className="flex items-center mt-1">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                selectedAlert.riskProbability >= 80 ? 'bg-red-600' :
                                selectedAlert.riskProbability >= 60 ? 'bg-orange-500' :
                                'bg-yellow-500'
                              }`}
                              style={{width: `${selectedAlert.riskProbability}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-bold">{selectedAlert.riskProbability}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weather Conditions */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Condition</label>
                          <p className="text-sm text-gray-900">{selectedAlert.weather.condition}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Temperature</label>
                          <p className="text-sm text-gray-900">{selectedAlert.weather.temp}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Wind Speed</label>
                          <p className="text-sm text-gray-900">{selectedAlert.weather.wind}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Rainfall (24h)</label>
                          <p className="text-sm text-gray-900">{selectedAlert.weather.rainfall}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4">{selectedAlert.description}</p>
                </div>

                {/* Recommendations */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                  <ul className="space-y-2">
                    {selectedAlert.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Response History */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Response History</h3>
                  <div className="space-y-3">
                    {selectedAlert.responseHistory.map((entry, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm text-gray-900">{entry.action}</span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-600">by {entry.user}</p>
                        {entry.notes && <p className="text-sm text-gray-700 mt-1">{entry.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

// Advanced Sensor Monitoring Component
const SensorMonitoring = () => {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [sensors, setSensors] = useState([
    {
      id: 'NP-A-01',
      name: 'Seismic Array North Pit A',
      location: 'North Pit Zone A',
      coordinates: { lat: -33.8688, lng: 151.2093 },
      status: 'Active',
      type: 'Seismic',
      lastReading: '2 min ago',
      batteryLevel: 85,
      signalStrength: 92,
      currentValue: 2.8,
      unit: 'mm/s',
      threshold: { min: 0, max: 5, alert: 4 },
      historicalData: [
        { time: '00:00', value: 2.1 }, { time: '04:00', value: 2.3 },
        { time: '08:00', value: 2.8 }, { time: '12:00', value: 3.1 },
        { time: '16:00', value: 2.9 }, { time: '20:00', value: 2.4 }
      ],
      alerts: 1,
      maintenanceDate: '2025-02-15',
      installDate: '2024-06-10',
      description: 'High-precision seismometer monitoring ground vibrations and potential rockfall precursors'
    },
    {
      id: 'SP-C-03',
      name: 'Geotechnical Monitor South',
      location: 'South Pit Zone C',
      coordinates: { lat: -33.8700, lng: 151.2080 },
      status: 'Active',
      type: 'Geotechnical',
      lastReading: '1 min ago',
      batteryLevel: 91,
      signalStrength: 88,
      currentValue: 12.5,
      unit: 'mm',
      threshold: { min: 0, max: 20, alert: 15 },
      historicalData: [
        { time: '00:00', value: 10.2 }, { time: '04:00', value: 11.1 },
        { time: '08:00', value: 11.8 }, { time: '12:00', value: 12.5 },
        { time: '16:00', value: 12.9 }, { time: '20:00', value: 12.1 }
      ],
      alerts: 2,
      maintenanceDate: '2025-03-20',
      installDate: '2024-05-15',
      description: 'Slope stability monitoring system measuring ground displacement and stress'
    },
    {
      id: 'ES-S1-02',
      name: 'Displacement Monitor East',
      location: 'East Slope Sector 1',
      coordinates: { lat: -33.8675, lng: 151.2110 },
      status: 'Active',
      type: 'Displacement',
      lastReading: '3 min ago',
      batteryLevel: 76,
      signalStrength: 95,
      currentValue: 0.8,
      unit: 'mm',
      threshold: { min: 0, max: 2, alert: 1.5 },
      historicalData: [
        { time: '00:00', value: 0.3 }, { time: '04:00', value: 0.4 },
        { time: '08:00', value: 0.6 }, { time: '12:00', value: 0.8 },
        { time: '16:00', value: 0.7 }, { time: '20:00', value: 0.5 }
      ],
      alerts: 0,
      maintenanceDate: '2025-01-30',
      installDate: '2024-08-22',
      description: 'Precision displacement sensor tracking incremental ground movement'
    },
    {
      id: 'WS-S2-01',
      name: 'Environmental Monitor West',
      location: 'West Slope Sector 2',
      coordinates: { lat: -33.8650, lng: 151.2050 },
      status: 'Maintenance',
      type: 'Environmental',
      lastReading: '15 min ago',
      batteryLevel: 45,
      signalStrength: 67,
      currentValue: 45,
      unit: 'μg/m³',
      threshold: { min: 0, max: 100, alert: 75 },
      historicalData: [
        { time: '00:00', value: 25 }, { time: '04:00', value: 30 },
        { time: '08:00', value: 42 }, { time: '12:00', value: 45 },
        { time: '16:00', value: 38 }, { time: '20:00', value: 33 }
      ],
      alerts: 0,
      maintenanceDate: '2025-01-18',
      installDate: '2024-04-05',
      description: 'Multi-parameter environmental sensor monitoring air quality and dust levels'
    },
    {
      id: 'CPA-01',
      name: 'Ground Monitor Central',
      location: 'Central Processing Area',
      coordinates: { lat: -33.8680, lng: 151.2085 },
      status: 'Active',
      type: 'Ground Monitor',
      lastReading: '1 min ago',
      batteryLevel: 88,
      signalStrength: 91,
      currentValue: 1.2,
      unit: 'mm',
      threshold: { min: 0, max: 3, alert: 2.5 },
      historicalData: [
        { time: '00:00', value: 0.8 }, { time: '04:00', value: 0.9 },
        { time: '08:00', value: 1.1 }, { time: '12:00', value: 1.2 },
        { time: '16:00', value: 1.4 }, { time: '20:00', value: 1.0 }
      ],
      alerts: 1,
      maintenanceDate: '2025-04-10',
      installDate: '2024-07-18',
      description: 'Ground subsidence monitoring for critical infrastructure protection'
    },
    {
      id: 'NP-B-04',
      name: 'Structural Monitor North B',
      location: 'North Pit Zone B',
      coordinates: { lat: -33.8695, lng: 151.2100 },
      status: 'Alert',
      type: 'Structural',
      lastReading: '2 min ago',
      batteryLevel: 92,
      signalStrength: 89,
      currentValue: 850,
      unit: 'μstrain',
      threshold: { min: 0, max: 1000, alert: 800 },
      historicalData: [
        { time: '00:00', value: 720 }, { time: '04:00', value: 750 },
        { time: '08:00', value: 800 }, { time: '12:00', value: 850 },
        { time: '16:00', value: 820 }, { time: '20:00', value: 790 }
      ],
      alerts: 3,
      maintenanceDate: '2025-02-28',
      installDate: '2024-09-12',
      description: 'Structural health monitoring of critical support infrastructure'
    }
  ]);

  const filteredSensors = sensors.filter(sensor => {
    return (
      (!filterType || sensor.type === filterType) &&
      (!filterStatus || sensor.status === filterStatus)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Seismic': return '🌋';
      case 'Geotechnical': return '🏔️';
      case 'Displacement': return '📐';
      case 'Environmental': return '🌬️';
      case 'Ground Monitor': return '🌍';
      case 'Structural': return '🏗️';
      default: return '📡';
    }
  };

  const getBatteryColor = (level) => {
    if (level > 70) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Layout>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Sensor Monitoring Center</h1>
            <p className="text-green-100">Real-time monitoring and analysis of all sensor networks across mining operations</p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{sensors.filter(s => s.status === 'Active').length}</div>
                <div className="text-sm text-green-200">Active Sensors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{sensors.filter(s => s.status === 'Alert').length}</div>
                <div className="text-sm text-green-200">Alerts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{sensors.reduce((acc, s) => acc + s.alerts, 0)}</div>
                <div className="text-sm text-green-200">Total Alerts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(sensors.reduce((acc, s) => acc + s.batteryLevel, 0) / sensors.length)}%</div>
                <div className="text-sm text-green-200">Avg Battery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sensor Type</label>
                <select 
                  className="border rounded-md px-3 py-2 text-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Seismic">Seismic</option>
                  <option value="Geotechnical">Geotechnical</option>
                  <option value="Displacement">Displacement</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Ground Monitor">Ground Monitor</option>
                  <option value="Structural">Structural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="border rounded-md px-3 py-2 text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Alert">Alert</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📋 Grid View
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  viewMode === 'map' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🗺️ Map View
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                📊 Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSensors.map((sensor) => (
              <div key={sensor.id} className={`bg-white rounded-lg shadow-lg border-l-4 ${
                sensor.status === 'Active' ? 'border-green-500' :
                sensor.status === 'Alert' ? 'border-red-500' :
                sensor.status === 'Maintenance' ? 'border-yellow-500' :
                'border-gray-500'
              }`}>
                <div className="p-6">
                  {/* Sensor Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getTypeIcon(sensor.type)}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{sensor.id}</h3>
                        <p className="text-sm text-gray-500">{sensor.name}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(sensor.status)}`}>
                      {sensor.status}
                    </span>
                  </div>

                  {/* Location and Type */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-2">📍</span>
                      <span className="font-medium">{sensor.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">⏱️</span>
                      <span>Last reading: {sensor.lastReading}</span>
                    </div>
                  </div>

                  {/* Current Reading */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Current Reading</span>
                      <span className="text-lg font-bold text-gray-900">{sensor.currentValue} {sensor.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          sensor.currentValue > sensor.threshold.alert ? 'bg-red-600' :
                          sensor.currentValue > sensor.threshold.max * 0.7 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{width: `${Math.min((sensor.currentValue / sensor.threshold.max) * 100, 100)}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 {sensor.unit}</span>
                      <span className="text-red-500">Alert: {sensor.threshold.alert} {sensor.unit}</span>
                    </div>
                  </div>

                  {/* Battery and Signal */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Battery</span>
                        <span className="text-sm font-medium">{sensor.batteryLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getBatteryColor(sensor.batteryLevel)}`}
                          style={{width: `${sensor.batteryLevel}%`}}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Signal</span>
                        <span className="text-sm font-medium">{sensor.signalStrength}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-600 rounded-full"
                          style={{width: `${sensor.signalStrength}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Alerts and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      {sensor.alerts > 0 ? (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          {sensor.alerts} Alert{sensor.alerts > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          No Alerts
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => { setSelectedSensor(sensor); setShowDetailModal(true); }}
                      className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Sensor Location Map</h3>
            <div className="h-96 bg-gradient-to-b from-green-100 to-yellow-100 rounded-lg relative overflow-hidden">
              {/* Interactive mine site map */}
              <div className="absolute inset-0 p-4">
                {filteredSensors.map((sensor, index) => (
                  <div 
                    key={sensor.id}
                    className={`absolute w-6 h-6 rounded-full border-2 cursor-pointer transition-transform hover:scale-125 ${
                      sensor.status === 'Active' ? 'bg-green-500 border-green-700' :
                      sensor.status === 'Alert' ? 'bg-red-500 border-red-700 animate-pulse' :
                      sensor.status === 'Maintenance' ? 'bg-yellow-500 border-yellow-700' :
                      'bg-gray-500 border-gray-700'
                    }`}
                    style={{
                      left: `${20 + (index % 4) * 20}%`,
                      top: `${20 + Math.floor(index / 4) * 25}%`
                    }}
                    onClick={() => { setSelectedSensor(sensor); setShowDetailModal(true); }}
                    title={`${sensor.id} - ${sensor.status}`}
                  >
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                      {sensor.id}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <h4 className="text-sm font-semibold mb-2">Legend</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Active</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    <span>Alert</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Maintenance</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                    <span>Offline</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sensor Detail Modal */}
        {showDetailModal && selectedSensor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getTypeIcon(selectedSensor.type)}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedSensor.id}</h2>
                    <p className="text-gray-600">{selectedSensor.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Sensor Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Sensor Information</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSensor.status)}`}>
                          {selectedSensor.status}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Type</label>
                        <p className="text-sm text-gray-900">{selectedSensor.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Location</label>
                        <p className="text-sm text-gray-900">{selectedSensor.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Install Date</label>
                        <p className="text-sm text-gray-900">{selectedSensor.installDate}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Next Maintenance</label>
                        <p className="text-sm text-gray-900">{selectedSensor.maintenanceDate}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Description</label>
                        <p className="text-sm text-gray-700">{selectedSensor.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Current Status</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">Current Reading</label>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedSensor.currentValue} {selectedSensor.unit}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              selectedSensor.currentValue > selectedSensor.threshold.alert ? 'bg-red-600' :
                              selectedSensor.currentValue > selectedSensor.threshold.max * 0.7 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{width: `${Math.min((selectedSensor.currentValue / selectedSensor.threshold.max) * 100, 100)}%`}}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Min: {selectedSensor.threshold.min}</span>
                          <span className="text-red-500">Alert: {selectedSensor.threshold.alert}</span>
                          <span>Max: {selectedSensor.threshold.max}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-700">{selectedSensor.batteryLevel}%</div>
                          <div className="text-sm text-gray-600">Battery Level</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-700">{selectedSensor.signalStrength}%</div>
                          <div className="text-sm text-gray-600">Signal Strength</div>
                        </div>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-700">{selectedSensor.alerts}</div>
                        <div className="text-sm text-gray-600">Active Alerts</div>
                      </div>
                    </div>
                  </div>

                  {/* Historical Chart */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">24-Hour Trend</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="h-48 flex items-end justify-between">
                        {selectedSensor.historicalData.map((data, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center mx-1">
                            <div 
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t mb-2"
                              style={{height: `${(data.value / selectedSensor.threshold.max) * 150}px`}}
                            ></div>
                            <span className="text-xs text-gray-500">{data.time}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                          <span className="text-sm text-gray-600">{selectedSensor.type} Readings ({selectedSensor.unit})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

// Comprehensive Predictive Analytics Component
const Analytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedModel, setSelectedModel] = useState('rockfall');
  const [showModelDetails, setShowModelDetails] = useState(false);

  const [predictionData, setPredictionData] = useState({
    riskPredictions: [
      { location: 'North Pit Zone A', risk: 'High', probability: 87, timeframe: '6 hours', factors: ['Heavy rainfall', 'Ground vibration', 'Slope angle'] },
      { location: 'South Pit Zone C', risk: 'Medium', probability: 64, timeframe: '24 hours', factors: ['Displacement trend', 'Rock quality', 'Weather conditions'] },
      { location: 'East Slope Sector 1', risk: 'Low', probability: 23, timeframe: '72 hours', factors: ['Stable conditions', 'Good drainage', 'Regular maintenance'] },
      { location: 'West Processing Area', risk: 'Critical', probability: 94, timeframe: '2 hours', factors: ['Structural stress', 'Equipment vibration', 'Foundation settlement'] }
    ],
    trendData: [
      { time: '00:00', rockfall: 15, slope: 25, ground: 12, structural: 8 },
      { time: '04:00', rockfall: 18, slope: 28, ground: 15, structural: 12 },
      { time: '08:00', rockfall: 32, slope: 45, ground: 28, structural: 22 },
      { time: '12:00', rockfall: 45, slope: 38, ground: 35, structural: 18 },
      { time: '16:00', rockfall: 28, slope: 32, ground: 22, structural: 15 },
      { time: '20:00', rockfall: 22, slope: 25, ground: 18, structural: 10 }
    ],
    modelAccuracy: {
      rockfall: { accuracy: 94.2, confidence: 89.7, predictions: 1247 },
      slope: { accuracy: 91.8, confidence: 87.3, predictions: 856 },
      ground: { accuracy: 88.5, confidence: 82.1, predictions: 2134 },
      structural: { accuracy: 96.1, confidence: 93.4, predictions: 634 }
    },
    correlationFactors: [
      { factor: 'Rainfall (24h)', correlation: 0.87, impact: 'High' },
      { factor: 'Ground vibration', correlation: 0.76, impact: 'High' },
      { factor: 'Temperature change', correlation: 0.43, impact: 'Medium' },
      { factor: 'Wind speed', correlation: 0.31, impact: 'Low' },
      { factor: 'Equipment activity', correlation: 0.68, impact: 'Medium' }
    ]
  });

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getModelIcon = (model) => {
    switch (model) {
      case 'rockfall': return '🪨';
      case 'slope': return '⛰️';
      case 'ground': return '🌍';
      case 'structural': return '🏗️';
      default: return '🤖';
    }
  };

  return (
    <Layout>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Predictive Analytics Center</h1>
            <p className="text-purple-100">AI-powered risk forecasting and predictive modeling for mining safety</p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{predictionData.riskPredictions.filter(p => p.risk === 'Critical' || p.risk === 'High').length}</div>
                <div className="text-sm text-purple-200">High Risk Predictions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(Object.values(predictionData.modelAccuracy).reduce((acc, model) => acc + model.accuracy, 0) / 4)}%</div>
                <div className="text-sm text-purple-200">Avg Model Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Object.values(predictionData.modelAccuracy).reduce((acc, model) => acc + model.predictions, 0)}</div>
                <div className="text-sm text-purple-200">Total Predictions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
              <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="6h">Next 6 Hours</option>
                <option value="24h">Next 24 Hours</option>
                <option value="7d">Next 7 Days</option>
                <option value="30d">Next 30 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model Type</label>
              <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="rockfall">Rockfall Prediction</option>
                <option value="slope">Slope Stability</option>
                <option value="ground">Ground Movement</option>
                <option value="structural">Structural Integrity</option>
              </select>
            </div>
            <div className="ml-auto">
              <button 
                onClick={() => setShowModelDetails(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                🧠 Model Details
              </button>
            </div>
          </div>
        </div>

        {/* Risk Predictions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">High Priority Risk Predictions</h3>
            <div className="space-y-4">
              {predictionData.riskPredictions.map((prediction, index) => (
                <div key={index} className={`border rounded-lg p-4 border-l-4 ${
                  prediction.risk === 'Critical' ? 'border-red-500' :
                  prediction.risk === 'High' ? 'border-orange-500' :
                  prediction.risk === 'Medium' ? 'border-yellow-500' :
                  'border-green-500'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{prediction.location}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getRiskColor(prediction.risk)}`}>
                      {prediction.risk}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Risk Probability</span>
                      <span className="text-sm font-bold">{prediction.probability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          prediction.probability >= 80 ? 'bg-red-600' :
                          prediction.probability >= 60 ? 'bg-orange-500' :
                          prediction.probability >= 40 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{width: `${prediction.probability}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Timeframe:</strong> {prediction.timeframe}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Key Factors:</strong> {prediction.factors.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Analysis Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Trend Analysis (24h)</h3>
            <div className="h-64 bg-gray-50 rounded-lg p-4">
              <div className="h-full relative">
                <div className="absolute inset-0 flex items-end justify-between">
                  {predictionData.trendData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center mx-1">
                      <div className="relative w-full flex flex-col items-center">
                        {/* Rockfall */}
                        <div 
                          className="w-full bg-red-500 rounded-t mb-1"
                          style={{height: `${data.rockfall}px`}}
                          title={`Rockfall: ${data.rockfall}%`}
                        ></div>
                        {/* Slope */}
                        <div 
                          className="w-full bg-orange-500 mb-1"
                          style={{height: `${data.slope}px`}}
                          title={`Slope: ${data.slope}%`}
                        ></div>
                        {/* Ground */}
                        <div 
                          className="w-full bg-yellow-500 mb-1"
                          style={{height: `${data.ground}px`}}
                          title={`Ground: ${data.ground}%`}
                        ></div>
                        {/* Structural */}
                        <div 
                          className="w-full bg-blue-500 rounded-b"
                          style={{height: `${data.structural}px`}}
                          title={`Structural: ${data.structural}%`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{data.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                  <span>Rockfall Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                  <span>Slope Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span>Ground Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span>Structural Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Performance and Correlation Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">AI Model Performance</h3>
            <div className="space-y-4">
              {Object.entries(predictionData.modelAccuracy).map(([model, data]) => (
                <div key={model} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{getModelIcon(model)}</span>
                      <span className="font-medium capitalize">{model} Model</span>
                    </div>
                    <span className="text-sm text-gray-500">{data.predictions} predictions</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Accuracy</div>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="h-2 bg-green-500 rounded-full"
                            style={{width: `${data.accuracy}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-bold">{data.accuracy}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Confidence</div>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="h-2 bg-blue-500 rounded-full"
                            style={{width: `${data.confidence}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-bold">{data.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Correlation Factors */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Correlation Factors</h3>
            <div className="space-y-4">
              {predictionData.correlationFactors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{factor.factor}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      factor.impact === 'High' ? 'bg-red-100 text-red-800' :
                      factor.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {factor.impact} Impact
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Correlation Strength</div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            factor.correlation >= 0.7 ? 'bg-red-500' :
                            factor.correlation >= 0.5 ? 'bg-orange-500' :
                            factor.correlation >= 0.3 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{width: `${factor.correlation * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-bold">{factor.correlation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model Details Modal */}
        {showModelDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">AI Model Details</h2>
                <button 
                  onClick={() => setShowModelDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Model Architecture</h3>
                    <div className="space-y-3 text-sm">
                      <div><strong>Algorithm:</strong> Deep Neural Network with LSTM layers</div>
                      <div><strong>Input Features:</strong> 47 sensor parameters, weather data, geological factors</div>
                      <div><strong>Training Data:</strong> 3.2M historical data points over 5 years</div>
                      <div><strong>Update Frequency:</strong> Real-time learning with 15-minute model updates</div>
                      <div><strong>Prediction Horizon:</strong> 2 hours to 30 days ahead</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                    <div className="space-y-3 text-sm">
                      <div><strong>Overall Accuracy:</strong> 92.7% (industry-leading)</div>
                      <div><strong>False Positive Rate:</strong> 4.2%</div>
                      <div><strong>False Negative Rate:</strong> 3.1%</div>
                      <div><strong>Response Time:</strong> &lt;200ms average</div>
                      <div><strong>Model Confidence:</strong> 88.1% average</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Model Updates</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Weather integration enhancement</span>
                      <span className="text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Geological stress pattern recognition</span>
                      <span className="text-gray-500">6 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sensor correlation algorithm update</span>
                      <span className="text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

// Comprehensive Site Risk Analysis Component
const RiskAnalysis = () => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [viewMode, setViewMode] = useState('heatmap'); // 'heatmap', '3d', 'timeline'
  const [riskTimeframe, setRiskTimeframe] = useState('current');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const [riskData, setRiskData] = useState({
    zones: [
      {
        id: 'north-pit-a',
        name: 'North Pit Zone A',
        riskLevel: 'Critical',
        riskScore: 92,
        coordinates: { x: 20, y: 15 },
        size: { width: 25, height: 20 },
        factors: {
          geological: 85,
          weather: 78,
          structural: 90,
          operational: 67
        },
        trends: [
          { time: '6h ago', score: 75 },
          { time: '3h ago', score: 82 },
          { time: 'now', score: 92 }
        ],
        threats: ['Rockfall', 'Slope instability', 'Heavy rainfall impact'],
        mitigations: ['Immediate evacuation', 'Install drainage', 'Rock anchors']
      },
      {
        id: 'south-pit-c',
        name: 'South Pit Zone C',
        riskLevel: 'High',
        riskScore: 76,
        coordinates: { x: 15, y: 65 },
        size: { width: 30, height: 25 },
        factors: {
          geological: 72,
          weather: 45,
          structural: 85,
          operational: 82
        },
        trends: [
          { time: '6h ago', score: 68 },
          { time: '3h ago', score: 71 },
          { time: 'now', score: 76 }
        ],
        threats: ['Ground settlement', 'Equipment overload', 'Drainage issues'],
        mitigations: ['Reduce equipment load', 'Improve drainage', 'Monitor closely']
      },
      {
        id: 'east-slope-1',
        name: 'East Slope Sector 1',
        riskLevel: 'Medium',
        riskScore: 54,
        coordinates: { x: 70, y: 30 },
        size: { width: 20, height: 25 },
        factors: {
          geological: 48,
          weather: 62,
          structural: 45,
          operational: 61
        },
        trends: [
          { time: '6h ago', score: 58 },
          { time: '3h ago', score: 56 },
          { time: 'now', score: 54 }
        ],
        threats: ['Minor displacement', 'Weather exposure'],
        mitigations: ['Regular monitoring', 'Weather protection']
      },
      {
        id: 'west-processing',
        name: 'West Processing Area',
        riskLevel: 'Low',
        riskScore: 32,
        coordinates: { x: 75, y: 70 },
        size: { width: 15, height: 15 },
        factors: {
          geological: 25,
          weather: 35,
          structural: 28,
          operational: 40
        },
        trends: [
          { time: '6h ago', score: 35 },
          { time: '3h ago', score: 33 },
          { time: 'now', score: 32 }
        ],
        threats: ['Equipment wear', 'Minor vibrations'],
        mitigations: ['Routine maintenance', 'Equipment inspection']
      }
    ],
    safetyRecommendations: [
      {
        priority: 'Critical',
        action: 'Immediate evacuation of North Pit Zone A',
        timeline: 'Within 2 hours',
        cost: '$45,000',
        impact: 'Prevents potential casualties'
      },
      {
        priority: 'High',
        action: 'Install advanced monitoring system in South Pit',
        timeline: 'Within 24 hours',
        cost: '$125,000',
        impact: 'Early warning capability'
      },
      {
        priority: 'Medium',
        action: 'Upgrade drainage infrastructure',
        timeline: 'Within 1 week',
        cost: '$280,000',
        impact: 'Reduces weather-related risks'
      },
      {
        priority: 'Low',
        action: 'Implement predictive maintenance program',
        timeline: 'Within 1 month',
        cost: '$95,000',
        impact: 'Long-term risk reduction'
      }
    ],
    riskTrends: {
      daily: [
        { time: '00:00', overall: 45, geological: 42, weather: 38, structural: 55, operational: 45 },
        { time: '06:00', overall: 52, geological: 48, weather: 45, structural: 62, operational: 52 },
        { time: '12:00', overall: 68, geological: 72, weather: 58, structural: 75, operational: 68 },
        { time: '18:00', overall: 61, geological: 65, weather: 52, structural: 68, operational: 59 },
        { time: '24:00', overall: 58, geological: 55, weather: 48, structural: 65, operational: 62 }
      ]
    }
  });

  const filteredZones = selectedZone === 'all' ? riskData.zones : riskData.zones.filter(zone => zone.id === selectedZone);

  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBorderColor = (level) => {
    switch (level) {
      case 'Critical': return 'border-red-600';
      case 'High': return 'border-orange-600';
      case 'Medium': return 'border-yellow-600';
      case 'Low': return 'border-green-600';
      default: return 'border-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Site Risk Analysis Center</h1>
            <p className="text-red-100">Comprehensive risk assessment, visualization, and mitigation planning</p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(riskData.zones.reduce((acc, zone) => acc + zone.riskScore, 0) / riskData.zones.length)}</div>
                <div className="text-sm text-red-200">Overall Risk Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{riskData.zones.filter(z => z.riskLevel === 'Critical' || z.riskLevel === 'High').length}</div>
                <div className="text-sm text-red-200">High Risk Zones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{riskData.safetyRecommendations.filter(r => r.priority === 'Critical' || r.priority === 'High').length}</div>
                <div className="text-sm text-red-200">Priority Actions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zone Filter</label>
              <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                <option value="all">All Zones</option>
                {riskData.zones.map(zone => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setViewMode('heatmap')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    viewMode === 'heatmap' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🗺️ Heat Map
                </button>
                <button 
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    viewMode === '3d' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📊 3D View
                </button>
                <button 
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    viewMode === 'timeline' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📈 Timeline
                </button>
              </div>
            </div>
            <div className="ml-auto">
              <button 
                onClick={() => setShowRecommendations(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                🛡️ Safety Recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Risk Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Visualization */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Heat Map - Mining Site Overview</h3>
            {viewMode === 'heatmap' && (
              <div className="h-96 bg-gradient-to-br from-green-200 via-yellow-200 to-red-200 rounded-lg relative overflow-hidden border-2 border-gray-300">
                {/* Site zones with risk levels */}
                {filteredZones.map((zone) => (
                  <div 
                    key={zone.id}
                    className={`absolute ${getRiskColor(zone.riskLevel)} opacity-70 border-2 ${getRiskBorderColor(zone.riskLevel)} rounded-lg cursor-pointer transition-all hover:opacity-90 hover:scale-105`}
                    style={{
                      left: `${zone.coordinates.x}%`,
                      top: `${zone.coordinates.y}%`,
                      width: `${zone.size.width}%`,
                      height: `${zone.size.height}%`
                    }}
                    title={`${zone.name}: ${zone.riskLevel} Risk (${zone.riskScore}%)`}
                  >
                    <div className="p-2 text-white text-xs font-bold">
                      <div>{zone.name}</div>
                      <div>{zone.riskScore}%</div>
                    </div>
                  </div>
                ))}
                
                {/* Risk Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                  <h4 className="text-sm font-semibold mb-2">Risk Levels</h4>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <div className="w-4 h-3 bg-red-500 rounded mr-2"></div>
                      <span>Critical (80-100%)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-4 h-3 bg-orange-500 rounded mr-2"></div>
                      <span>High (60-79%)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-4 h-3 bg-yellow-500 rounded mr-2"></div>
                      <span>Medium (40-59%)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-4 h-3 bg-green-500 rounded mr-2"></div>
                      <span>Low (0-39%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {viewMode === '3d' && (
              <div className="h-96 bg-gradient-to-b from-blue-100 via-green-100 to-brown-100 rounded-lg relative overflow-hidden border">
                <div className="absolute top-4 left-4 bg-white rounded p-2 shadow text-sm">
                  <div className="font-bold text-gray-800">Site 'X' - 3D Open Pit Mapping</div>
                  <div className="text-xs text-gray-600">DEM + Drone + Environmental Integration</div>
                </div>
                
                {/* 3D Terrain representation */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Background terrain contours */}
                  <path d="M20,300 Q200,250 380,290 Q300,200 200,180 Q100,200 20,250 Z" fill="#8FBC8F" opacity="0.3" />
                  <path d="M40,320 Q220,270 360,310 Q280,220 180,200 Q80,220 40,270 Z" fill="#9ACD32" opacity="0.4" />
                  <path d="M60,340 Q240,290 340,330 Q260,240 160,220 Q60,240 60,290 Z" fill="#ADFF2F" opacity="0.5" />
                  
                  {/* Open pit visualization */}
                  <ellipse cx="200" cy="250" rx="80" ry="40" fill="#8B4513" opacity="0.6" />
                  <ellipse cx="200" cy="250" rx="60" ry="30" fill="#A0522D" opacity="0.7" />
                  <ellipse cx="200" cy="250" rx="40" ry="20" fill="#D2691E" opacity="0.8" />
                  
                  {/* Risk zones overlays */}
                  {filteredZones.map((zone, index) => {
                    const positions = [
                      { x: 150, y: 200 }, // North Pit A
                      { x: 250, y: 300 }, // South Pit C  
                      { x: 320, y: 220 }, // East Slope
                      { x: 80, y: 280 }   // West Processing
                    ];
                    const pos = positions[index] || { x: 200, y: 250 };
                    return (
                      <g key={zone.id}>
                        <circle 
                          cx={pos.x} 
                          cy={pos.y} 
                          r="25" 
                          fill={zone.riskLevel === 'Critical' ? '#dc2626' : zone.riskLevel === 'High' ? '#ea580c' : zone.riskLevel === 'Medium' ? '#eab308' : '#16a34a'}
                          opacity="0.8"
                          className="animate-pulse"
                        />
                        <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
                          {zone.riskScore}%
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Sensor locations */}
                  <circle cx="180" cy="230" r="3" fill="#3b82f6" className="animate-ping" />
                  <circle cx="220" cy="270" r="3" fill="#3b82f6" className="animate-ping" />
                  <circle cx="160" cy="280" r="3" fill="#3b82f6" className="animate-ping" />
                  <circle cx="280" cy="240" r="3" fill="#3b82f6" className="animate-ping" />
                </svg>
                
                {/* Legend and controls */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow text-xs max-w-xs">
                  <div className="font-semibold mb-2">3D Mapping Legend:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1 animate-ping"></div>
                      <span>Sensors</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-brown-600 rounded mr-1"></div>
                      <span>Open Pit</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                      <span>Terrain</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded mr-1 animate-pulse"></div>
                      <span>Risk Zones</span>
                    </div>
                  </div>
                  <div className="mt-2 text-gray-600">
                    Data Sources: DEM, Drone Imagery, Environmental Sensors
                  </div>
                </div>
                
                {/* 3D Controls */}
                <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow">
                  <div className="text-xs font-semibold text-gray-700 mb-2">3D Controls</div>
                  <div className="space-y-1">
                    <button className="w-8 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs">↑</button>
                    <div className="flex space-x-1">
                      <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs">←</button>
                      <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs">→</button>
                    </div>
                    <button className="w-8 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs">↓</button>
                  </div>
                </div>
              </div>
            )}
            
            {viewMode === 'timeline' && (
              <div className="h-96 bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-4">Risk Trend Timeline (24 Hours)</h4>
                <div className="h-72 flex items-end justify-between">
                  {riskData.riskTrends.daily.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center mx-1">
                      <div className="relative w-full flex flex-col items-center">
                        {/* Overall Risk */}
                        <div 
                          className="w-full bg-red-500 opacity-80 rounded-t mb-1"
                          style={{height: `${data.overall * 2}px`}}
                          title={`Overall: ${data.overall}%`}
                        ></div>
                        {/* Geological */}
                        <div 
                          className="w-full bg-orange-500 opacity-80 mb-1"
                          style={{height: `${data.geological * 1.5}px`}}
                          title={`Geological: ${data.geological}%`}
                        ></div>
                        {/* Weather */}
                        <div 
                          className="w-full bg-blue-500 opacity-80 mb-1"
                          style={{height: `${data.weather * 1.5}px`}}
                          title={`Weather: ${data.weather}%`}
                        ></div>
                        {/* Structural */}
                        <div 
                          className="w-full bg-purple-500 opacity-80 rounded-b"
                          style={{height: `${data.structural * 1.5}px`}}
                          title={`Structural: ${data.structural}%`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{data.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                    <span>Overall Risk</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                    <span>Geological</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span>Weather</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                    <span>Structural</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Risk Summary Panel */}
          <div className="space-y-6">
            {/* Zone Risk Breakdown */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Zone Risk Summary</h3>
              <div className="space-y-4">
                {filteredZones.map((zone) => (
                  <div key={zone.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{zone.name}</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(zone.riskLevel)}`}>
                        {zone.riskLevel}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Risk Score</span>
                        <span className="text-xs font-bold">{zone.riskScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            zone.riskScore >= 80 ? 'bg-red-600' :
                            zone.riskScore >= 60 ? 'bg-orange-500' :
                            zone.riskScore >= 40 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{width: `${zone.riskScore}%`}}
                        ></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div>Threats: {zone.threats.join(', ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factor Analysis */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Factor Analysis</h3>
              {filteredZones.length === 1 ? (
                <div className="space-y-3">
                  {Object.entries(filteredZones[0].factors).map(([factor, value]) => (
                    <div key={factor}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm capitalize">{factor}</span>
                        <span className="text-sm font-bold">{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            value >= 80 ? 'bg-red-500' :
                            value >= 60 ? 'bg-orange-500' :
                            value >= 40 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{width: `${value}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-3xl mb-2">📊</div>
                  <p>Select a specific zone to view detailed risk factors</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Safety Recommendations Modal */}
        {showRecommendations && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Safety Recommendations & Action Plan</h2>
                <button 
                  onClick={() => setShowRecommendations(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {riskData.safetyRecommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(rec.priority)}`}>
                            {rec.priority} Priority
                          </span>
                          <span className="ml-3 font-medium">{rec.action}</span>
                        </div>
                        <span className="text-sm text-gray-500">{rec.cost}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Timeline: </span>
                          <span className="font-medium">{rec.timeline}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Impact: </span>
                          <span className="font-medium">{rec.impact}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Implementation Summary</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ${riskData.safetyRecommendations.reduce((sum, rec) => sum + parseInt(rec.cost.replace(/[$,]/g, '')), 0).toLocaleString()}
                      </div>
                      <div className="text-gray-600">Total Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {riskData.safetyRecommendations.filter(r => r.priority === 'Critical' || r.priority === 'High').length}
                      </div>
                      <div className="text-gray-600">Urgent Actions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-gray-600">Risk Reduction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

// Comprehensive Data Import Management Component
const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'processing', 'history'
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedDataType, setSelectedDataType] = useState('sensor-data');
  const [showValidation, setShowValidation] = useState(false);
  const [validationResults, setValidationResults] = useState(null);

  const [importData, setImportData] = useState({
    processingQueue: [
      {
        id: 'import-001',
        filename: 'sensor_readings_2024_Q4.csv',
        type: 'Sensor Data',
        size: '2.4 MB',
        status: 'Processing',
        progress: 75,
        uploadedAt: '2024-01-15 14:30',
        estimatedCompletion: '2 minutes',
        recordsProcessed: 15680,
        totalRecords: 20900,
        errors: 12,
        warnings: 45
      },
      {
        id: 'import-002',
        filename: 'geological_survey_north_pit.xlsx',
        type: 'Geological Data',
        size: '8.7 MB',
        status: 'Validating',
        progress: 45,
        uploadedAt: '2024-01-15 14:25',
        estimatedCompletion: '5 minutes',
        recordsProcessed: 2340,
        totalRecords: 5200,
        errors: 3,
        warnings: 28
      },
      {
        id: 'import-003',
        filename: 'weather_data_december.json',
        type: 'Weather Data',
        size: '1.2 MB',
        status: 'Queued',
        progress: 0,
        uploadedAt: '2024-01-15 14:20',
        estimatedCompletion: 'Waiting',
        recordsProcessed: 0,
        totalRecords: 2880,
        errors: 0,
        warnings: 0
      },
      {
        id: 'import-004',
        filename: 'north_pit_orthomosaic_20240115.tiff',
        type: 'Drone Imagery',
        size: '847.3 MB',
        status: 'Processing',
        progress: 22,
        uploadedAt: '2024-01-15 13:45',
        estimatedCompletion: '18 minutes',
        recordsProcessed: 1,
        totalRecords: 1,
        errors: 0,
        warnings: 2,
        specialProcessing: 'Georeferencing and mosaic stitching'
      },
      {
        id: 'import-005',
        filename: 'site_alpha_lidar_scan.las',
        type: 'Digital Elevation Models',
        size: '1.2 GB',
        status: 'Validating',
        progress: 67,
        uploadedAt: '2024-01-15 12:30',
        estimatedCompletion: '8 minutes',
        recordsProcessed: 67000000,
        totalRecords: 100000000,
        errors: 0,
        warnings: 15,
        specialProcessing: 'Point cloud processing and DEM generation'
      }
    ],
    importHistory: [
      {
        id: 'import-h-001',
        filename: 'equipment_maintenance_q4.csv',
        type: 'Maintenance Data',
        size: '3.1 MB',
        status: 'Completed',
        completedAt: '2024-01-15 13:45',
        duration: '3m 22s',
        recordsImported: 8950,
        errors: 0,
        warnings: 15,
        dataQuality: 98.5
      },
      {
        id: 'import-h-002',
        filename: 'safety_incidents_2024.xlsx',
        type: 'Incident Reports',
        size: '1.8 MB',
        status: 'Completed',
        completedAt: '2024-01-15 12:30',
        duration: '1m 45s',
        recordsImported: 1247,
        errors: 2,
        warnings: 8,
        dataQuality: 99.2
      },
      {
        id: 'import-h-003',
        filename: 'production_data_batch_12.csv',
        type: 'Production Data',
        size: '5.5 MB',
        status: 'Failed',
        completedAt: '2024-01-15 11:15',
        duration: '0m 32s',
        recordsImported: 0,
        errors: 145,
        warnings: 0,
        errorMessage: 'Invalid date format in column 3',
        dataQuality: 0
      },
      {
        id: 'import-h-004',
        filename: 'thermal_drone_survey_zone_c.geotiff',
        type: 'Drone Imagery',
        size: '623.8 MB',
        status: 'Completed',
        completedAt: '2024-01-14 16:22',
        duration: '12m 45s',
        recordsImported: 1,
        errors: 0,
        warnings: 3,
        dataQuality: 99.7,
        specialNotes: 'Thermal anomalies detected in 3 locations'
      },
      {
        id: 'import-h-005',
        filename: 'quarterly_dem_update_q4.dem',
        type: 'Digital Elevation Models',
        size: '2.1 GB',
        status: 'Completed',
        completedAt: '2024-01-13 10:15',
        duration: '28m 12s',
        recordsImported: 156000000,
        errors: 0,
        warnings: 28,
        dataQuality: 98.9,
        specialNotes: 'Elevation changes detected in North Pit area'
      }
    ],
    dataTypes: [
      { id: 'sensor-data', name: 'Sensor Data', format: 'CSV, JSON', description: 'Temperature, pressure, vibration readings' },
      { id: 'geological', name: 'Geological Data', format: 'Excel, CSV', description: 'Rock composition, stability analysis' },
      { id: 'weather', name: 'Weather Data', format: 'JSON, XML', description: 'Weather conditions, forecasts' },
      { id: 'maintenance', name: 'Maintenance Data', format: 'CSV, Excel', description: 'Equipment service records' },
      { id: 'incident', name: 'Incident Reports', format: 'Excel, PDF', description: 'Safety incidents, near misses' },
      { id: 'production', name: 'Production Data', format: 'CSV, JSON', description: 'Daily production metrics' },
      { id: 'drone-imagery', name: 'Drone Imagery', format: 'JPG, PNG, TIFF, GeoTIFF', description: 'Aerial photos, orthomosaics, thermal imaging' },
      { id: 'dem-data', name: 'Digital Elevation Models', format: 'DEM, GeoTIFF, ASCII, LAS', description: 'Topographic data, 3D terrain models, LiDAR scans' }
    ]
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Validating': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Queued': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return '✅';
      case 'Processing': return '⚙️';
      case 'Validating': return '🔍';
      case 'Queued': return '⏳';
      case 'Failed': return '❌';
      default: return '📄';
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulate file upload process
      const file = e.dataTransfer.files[0];
      simulateUpload(file);
    }
  };

  const simulateUpload = (file) => {
    const newImport = {
      id: `import-${Date.now()}`,
      filename: file.name,
      type: importData.dataTypes.find(t => t.id === selectedDataType)?.name || 'Unknown',
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      status: 'Processing',
      progress: 0,
      uploadedAt: new Date().toLocaleString(),
      estimatedCompletion: '3 minutes',
      recordsProcessed: 0,
      totalRecords: Math.floor(Math.random() * 10000) + 1000,
      errors: 0,
      warnings: 0
    };
    
    setImportData(prev => ({
      ...prev,
      processingQueue: [newImport, ...prev.processingQueue]
    }));
  };

  const simulateValidation = (importItem) => {
    let validationData = {
      filename: importItem.filename,
      totalRecords: importItem.totalRecords,
      validRecords: importItem.totalRecords - importItem.errors - Math.floor(importItem.warnings * 0.3),
      errors: [],
      warnings: [],
      suggestions: [],
      specialAnalysis: null
    };

    // Drone Imagery specific validation
    if (importItem.type === 'Drone Imagery') {
      validationData.errors = [
        { line: 'Image 12', field: 'geolocation', message: 'Missing GPS coordinates for orthomosaic alignment', severity: 'error' },
        { line: 'Image 47', field: 'camera_calibration', message: 'Camera distortion parameters incomplete', severity: 'error' }
      ];
      validationData.warnings = [
        { line: 'Image 23', field: 'overlap', message: 'Insufficient image overlap (65% vs recommended 80%)', severity: 'warning' },
        { line: 'Image 34', field: 'lighting', message: 'Inconsistent lighting conditions detected', severity: 'warning' },
        { line: 'Image 56', field: 'resolution', message: 'GSD varies significantly across images', severity: 'warning' }
      ];
      validationData.suggestions = [
        'Ensure GPS is fully calibrated before drone flights',
        'Perform camera calibration using standard calibration targets',
        'Increase flight overlap to 80% for better reconstruction',
        'Plan flights during consistent lighting conditions',
        'Use automated flight planning for consistent GSD'
      ];
      validationData.specialAnalysis = {
        imageCount: 124,
        groundSampleDistance: '2.3 cm/pixel',
        coverageArea: '156.7 hectares',
        orthomosaicResolution: '4K x 3K',
        thermalAnomalies: 3,
        vegetationIndex: 'NDVI calculated'
      };
    }
    // DEM specific validation
    else if (importItem.type === 'Digital Elevation Models') {
      validationData.errors = [
        { line: 'Point 1,234,567', field: 'elevation', message: 'Elevation value below sea level in non-coastal area', severity: 'error' },
        { line: 'Point 2,445,891', field: 'classification', message: 'Unclassified ground points in critical area', severity: 'error' }
      ];
      validationData.warnings = [
        { line: 'Grid 45,67', field: 'point_density', message: 'Low point density (<2 pts/m²) in steep terrain', severity: 'warning' },
        { line: 'Grid 78,92', field: 'data_gaps', message: 'Data gaps detected near water bodies', severity: 'warning' },
        { line: 'Surface', field: 'interpolation', message: 'High interpolation variance in rocky outcrops', severity: 'warning' }
      ];
      validationData.suggestions = [
        'Verify elevation datum and coordinate system consistency',
        'Implement manual classification for critical ground areas',
        'Increase LiDAR pulse density for steep terrain mapping',
        'Use additional ground control points near water features',
        'Apply advanced interpolation methods for complex topography'
      ];
      validationData.specialAnalysis = {
        pointCount: '156M points',
        pointDensity: '15.4 pts/m²',
        elevationRange: '1,234m - 1,789m',
        gridResolution: '0.5m x 0.5m',
        contourInterval: '1m intervals',
        slopeAnalysis: 'Max slope: 67°'
      };
    }
    // Standard sensor data validation
    else {
      validationData.errors = [
        { line: 145, field: 'timestamp', message: 'Invalid date format: "2024-13-45"', severity: 'error' },
        { line: 267, field: 'sensor_id', message: 'Missing sensor ID', severity: 'error' },
        { line: 892, field: 'temperature', message: 'Value out of range: -999°C', severity: 'error' }
      ];
      validationData.warnings = [
        { line: 89, field: 'humidity', message: 'Unusual humidity reading: 105%', severity: 'warning' },
        { line: 234, field: 'pressure', message: 'Pressure reading seems low', severity: 'warning' },
        { line: 445, field: 'battery_level', message: 'Battery critically low: 2%', severity: 'warning' }
      ];
      validationData.suggestions = [
        'Consider standardizing date formats to ISO 8601',
        'Implement sensor ID validation at source',
        'Add range validation for temperature readings',
        'Set up automated alerts for unusual sensor readings'
      ];
    }

    setValidationResults(validationData);
    setShowValidation(true);
  };

  return (
    <Layout>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Data Import Management</h1>
            <p className="text-purple-100">Streamlined data import, validation, and processing pipeline</p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{importData.processingQueue.length}</div>
                <div className="text-sm text-purple-200">Active Imports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{importData.importHistory.filter(h => h.status === 'Completed').length}</div>
                <div className="text-sm text-purple-200">Completed Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {importData.importHistory.reduce((acc, h) => h.status === 'Completed' ? acc + h.recordsImported : acc, 0).toLocaleString()}
                </div>
                <div className="text-sm text-purple-200">Records Imported</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'upload', name: 'Upload Data', icon: '📤' },
                { id: 'processing', name: 'Processing Queue', icon: '⚙️' },
                { id: 'history', name: 'Import History', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            {/* Data Type Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Select Data Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {importData.dataTypes.map((dataType) => (
                  <div 
                    key={dataType.id}
                    onClick={() => setSelectedDataType(dataType.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedDataType === dataType.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{dataType.name}</h4>
                      {selectedDataType === dataType.id && <span className="text-purple-500">✓</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{dataType.description}</p>
                    <p className="text-xs text-gray-500">Formats: {dataType.format}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload Area */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Upload Files</h3>
              <div 
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h3>
                <p className="text-gray-600 mb-4">
                  Upload {importData.dataTypes.find(t => t.id === selectedDataType)?.format} files for {importData.dataTypes.find(t => t.id === selectedDataType)?.name}
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium">
                  Choose Files
                </button>
                <p className="text-sm text-gray-500 mt-2">Maximum file size: 50MB</p>
              </div>
            </div>

            {/* Upload Guidelines */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Data Import Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">✅ Best Practices</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use standardized date formats (ISO 8601)</li>
                    <li>• Include all required columns</li>
                    <li>• Remove duplicate records</li>
                    <li>• Validate data ranges before upload</li>
                    <li>• Use UTF-8 encoding for text files</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">❌ Common Issues</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Missing or empty required fields</li>
                    <li>• Inconsistent date/time formats</li>
                    <li>• Special characters in numeric fields</li>
                    <li>• Incorrect file encoding</li>
                    <li>• Exceeding maximum file size</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing Queue Tab */}
        {activeTab === 'processing' && (
          <div className="space-y-6">
            {importData.processingQueue.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Imports</h3>
                <p className="text-gray-600">Upload some files to see them in the processing queue</p>
              </div>
            ) : (
              <div className="space-y-4">
                {importData.processingQueue.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{getStatusIcon(item.status)}</div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.filename}</h3>
                          <p className="text-sm text-gray-600">{item.type} • {item.size} • {item.uploadedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <button 
                          onClick={() => simulateValidation(item)}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    
                    {item.status !== 'Queued' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">
                            {item.recordsProcessed.toLocaleString()} / {item.totalRecords.toLocaleString()} records
                          </span>
                          <span className="text-sm font-medium">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{width: `${item.progress}%`}}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Completion:</span>
                        <span className="ml-1 font-medium">{item.estimatedCompletion}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Errors:</span>
                        <span className={`ml-1 font-medium ${item.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {item.errors}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Warnings:</span>
                        <span className={`ml-1 font-medium ${item.warnings > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {item.warnings}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Progress:</span>
                        <span className="ml-1 font-medium">{Math.round((item.recordsProcessed / item.totalRecords) * 100)}%</span>
                      </div>
                    </div>
                    
                    {/* Special Processing Info for Drone/DEM data */}
                    {item.specialProcessing && (
                      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <span className="text-blue-600 mr-2">🔄</span>
                          <span className="text-sm font-medium text-blue-800">Special Processing:</span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">{item.specialProcessing}</p>
                        {item.type === 'Drone Imagery' && (
                          <div className="text-xs text-blue-600 mt-2">
                            Processing steps: Image alignment → Georeferencing → Orthomosaic generation → Quality validation
                          </div>
                        )}
                        {item.type === 'Digital Elevation Models' && (
                          <div className="text-xs text-blue-600 mt-2">
                            Processing steps: Point cloud filtering → Ground classification → DEM interpolation → Contour generation
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Import History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Recent Import History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {importData.importHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{item.filename}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{item.type}</div>
                        <div className="text-xs text-gray-500">{item.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div>{item.recordsImported.toLocaleString()}</div>
                        {(item.errors > 0 || item.warnings > 0) && (
                          <div className="text-xs">
                            <span className={item.errors > 0 ? 'text-red-600' : ''}>{item.errors} errors</span>
                            {item.errors > 0 && item.warnings > 0 && ', '}
                            <span className={item.warnings > 0 ? 'text-yellow-600' : ''}>{item.warnings} warnings</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.status === 'Completed' && (
                          <div className={`font-medium ${
                            item.dataQuality >= 95 ? 'text-green-600' :
                            item.dataQuality >= 85 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {item.dataQuality}%
                          </div>
                        )}
                        {item.status === 'Failed' && (
                          <div className="text-red-600 font-medium">Failed</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.duration || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs">
                        {item.specialNotes ? (
                          <div className="flex items-center">
                            <span className="text-blue-600 mr-1">📊</span>
                            <span className="truncate" title={item.specialNotes}>{item.specialNotes}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.completedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Validation Results Modal */}
        {showValidation && validationResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Data Validation Results</h2>
                <button 
                  onClick={() => setShowValidation(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{validationResults.filename}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{validationResults.totalRecords.toLocaleString()}</div>
                      <div className="text-sm text-blue-600">Total Records</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{validationResults.validRecords.toLocaleString()}</div>
                      <div className="text-sm text-green-600">Valid Records</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{validationResults.errors.length}</div>
                      <div className="text-sm text-red-600">Errors Found</div>
                    </div>
                  </div>
                </div>
                
                {validationResults.errors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-red-600 mb-3">❌ Errors ({validationResults.errors.length})</h4>
                    <div className="space-y-2">
                      {validationResults.errors.map((error, index) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Line {error.line}, Field: {error.field}</span>
                            <span className="text-xs text-red-600 bg-red-200 px-2 py-1 rounded">{error.severity}</span>
                          </div>
                          <p className="text-sm text-red-700 mt-1">{error.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {validationResults.warnings.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-yellow-600 mb-3">⚠️ Warnings ({validationResults.warnings.length})</h4>
                    <div className="space-y-2">
                      {validationResults.warnings.map((warning, index) => (
                        <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Line {warning.line}, Field: {warning.field}</span>
                            <span className="text-xs text-yellow-600 bg-yellow-200 px-2 py-1 rounded">{warning.severity}</span>
                          </div>
                          <p className="text-sm text-yellow-700 mt-1">{warning.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Special Analysis for Drone/DEM data */}
                {validationResults.specialAnalysis && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-green-600 mb-3">🗺️ Geospatial Analysis Results</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(validationResults.specialAnalysis).map(([key, value]) => (
                        <div key={key} className="bg-white rounded-lg p-3 border border-green-200">
                          <div className="text-xs text-green-700 uppercase tracking-wider font-semibold">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm font-bold text-green-900 mt-1">{value}</div>
                        </div>
                      ))}
                    </div>
                    
                    {validationResults.filename.includes('thermal') && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <span className="text-red-600 mr-2">🌡️</span>
                          <span className="font-semibold text-red-800">Thermal Anomalies Detected</span>
                        </div>
                        <p className="text-sm text-red-700 mt-1">
                          {validationResults.specialAnalysis.thermalAnomalies} thermal hotspots identified requiring immediate investigation
                        </p>
                      </div>
                    )}
                    
                    {validationResults.filename.includes('lidar') && (
                      <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <span className="text-purple-600 mr-2">📊</span>
                          <span className="font-semibold text-purple-800">Topographic Changes Detected</span>
                        </div>
                        <p className="text-sm text-purple-700 mt-1">
                          Significant elevation changes detected in comparison to previous DEM - recommend immediate site inspection
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">💡 Improvement Suggestions</h4>
                  <ul className="space-y-2">
                    {validationResults.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-blue-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

// User Authentication and Settings Component
const UserSettings = () => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'security', 'notifications', 'preferences'
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const [userProfile, setUserProfile] = useState({
    personal: {
      firstName: 'John',
      lastName: 'Mitchell',
      email: 'john.mitchell@rockguard.com',
      phone: '+1 (555) 123-4567',
      department: 'Safety Engineering',
      role: 'Senior Safety Engineer',
      location: 'Site Alpha - North Operations',
      employeeId: 'EMP-2024-001',
      joinDate: '2023-03-15',
      avatar: null
    },
    security: {
      lastLogin: '2024-01-15 09:30 AM',
      loginSessions: [
        { id: 1, device: 'Windows PC - Chrome', location: 'Denver, CO', time: '2024-01-15 09:30', active: true },
        { id: 2, device: 'Mobile App - iPhone', location: 'Denver, CO', time: '2024-01-14 18:45', active: false },
        { id: 3, device: 'iPad - Safari', location: 'Denver, CO', time: '2024-01-14 14:22', active: false }
      ],
      twoFactorEnabled: false,
      apiKeys: [
        { id: 'key-001', name: 'Dashboard API', created: '2024-01-10', lastUsed: '2024-01-15', permissions: 'Read-only' },
        { id: 'key-002', name: 'Mobile App Integration', created: '2024-01-05', lastUsed: '2024-01-14', permissions: 'Full access' }
      ]
    },
    notifications: {
      email: {
        criticalAlerts: true,
        riskUpdates: true,
        systemUpdates: false,
        weeklyReports: true,
        maintenanceNotices: true
      },
      sms: {
        criticalAlerts: true,
        emergencyOnly: true
      },
      push: {
        realTimeAlerts: true,
        dataProcessing: false,
        systemStatus: true
      }
    },
    preferences: {
      theme: 'light', // 'light', 'dark', 'auto'
      language: 'en',
      timezone: 'America/Denver',
      dateFormat: 'MM/DD/YYYY',
      temperatureUnit: 'Fahrenheit',
      dashboardRefresh: 30, // seconds
      defaultView: 'dashboard'
    },
    permissions: {
      dashboard: { read: true, write: false },
      alerts: { read: true, write: true, admin: false },
      sensors: { read: true, write: true, admin: true },
      analytics: { read: true, write: false, admin: false },
      riskAnalysis: { read: true, write: true, admin: true },
      dataImport: { read: true, write: true, admin: false },
      userManagement: { read: false, write: false, admin: false }
    }
  });

  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 3000);
  };

  const handleNotificationChange = (category, setting, value) => {
    setUserProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [category]: {
          ...prev.notifications[category],
          [setting]: value
        }
      }
    }));
  };

  const handlePreferenceChange = (setting, value) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [setting]: value
      }
    }));
  };

  const revokeSession = (sessionId) => {
    setUserProfile(prev => ({
      ...prev,
      security: {
        ...prev.security,
        loginSessions: prev.security.loginSessions.filter(s => s.id !== sessionId)
      }
    }));
  };

  const generateApiKey = () => {
    const newKey = {
      id: `key-${Date.now()}`,
      name: 'New API Key',
      created: new Date().toLocaleDateString(),
      lastUsed: 'Never',
      permissions: 'Read-only'
    };
    setUserProfile(prev => ({
      ...prev,
      security: {
        ...prev.security,
        apiKeys: [...prev.security.apiKeys, newKey]
      }
    }));
  };

  return (
    <Layout>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl mr-4">
                👤
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{userProfile.personal.firstName} {userProfile.personal.lastName}</h1>
                <p className="text-indigo-100">{userProfile.personal.role} • {userProfile.personal.department}</p>
                <p className="text-indigo-200 text-sm mt-1">{userProfile.personal.location}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-sm text-indigo-200">Last login</div>
                <div className="font-medium">{userProfile.security.lastLogin}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'profile', name: 'Profile', icon: '👤' },
                { id: 'security', name: 'Security', icon: '🔒' },
                { id: 'notifications', name: 'Notifications', icon: '🔔' },
                { id: 'preferences', name: 'Preferences', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {profileUpdated && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  <span className="text-green-800">Profile updated successfully!</span>
                </div>
              </div>
            )}
            
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={userProfile.personal.firstName}
                    onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={userProfile.personal.lastName}
                    onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={userProfile.personal.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={userProfile.personal.phone}
                    onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select 
                    value={userProfile.personal.department}
                    onChange={(e) => handleProfileUpdate('department', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Safety Engineering</option>
                    <option>Operations</option>
                    <option>Maintenance</option>
                    <option>Environmental</option>
                    <option>Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={userProfile.personal.role}
                    onChange={(e) => handleProfileUpdate('role', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              {/* Employment Details */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold mb-4">Employment Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Employee ID:</span>
                    <span className="ml-2 font-medium">{userProfile.personal.employeeId}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Join Date:</span>
                    <span className="ml-2 font-medium">{userProfile.personal.joinDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 font-medium">{userProfile.personal.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Permissions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">System Permissions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Module</th>
                      <th className="text-center py-2 px-3">Read</th>
                      <th className="text-center py-2 px-3">Write</th>
                      <th className="text-center py-2 px-3">Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(userProfile.permissions).map(([module, perms]) => (
                      <tr key={module} className="border-b">
                        <td className="py-2 px-3 font-medium capitalize">{module.replace(/([A-Z])/g, ' $1')}</td>
                        <td className="text-center py-2 px-3">
                          <span className={perms.read ? 'text-green-600' : 'text-gray-400'}>
                            {perms.read ? '✓' : '✗'}
                          </span>
                        </td>
                        <td className="text-center py-2 px-3">
                          <span className={perms.write ? 'text-green-600' : 'text-gray-400'}>
                            {perms.write ? '✓' : '✗'}
                          </span>
                        </td>
                        <td className="text-center py-2 px-3">
                          <span className={perms.admin ? 'text-green-600' : 'text-gray-400'}>
                            {perms.admin ? '✓' : '✗'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password & Authentication */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Password & Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-gray-600">Last changed 45 days ago</p>
                  </div>
                  <button 
                    onClick={() => setShowChangePassword(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Change Password
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">
                      {userProfile.security.twoFactorEnabled ? 'Enabled - SMS and Authenticator App' : 'Not enabled'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShow2FASetup(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      userProfile.security.twoFactorEnabled 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {userProfile.security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
              <div className="space-y-4">
                {userProfile.security.loginSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-indigo-600">💻</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{session.device}</h4>
                        <p className="text-sm text-gray-600">{session.location} • {session.time}</p>
                        {session.active && <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Current Session</span>}
                      </div>
                    </div>
                    {!session.active && (
                      <button 
                        onClick={() => revokeSession(session.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* API Keys */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">API Keys</h3>
                <button 
                  onClick={generateApiKey}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Generate New Key
                </button>
              </div>
              <div className="space-y-4">
                {userProfile.security.apiKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{key.name}</h4>
                      <p className="text-sm text-gray-600">Created: {key.created} • Last used: {key.lastUsed}</p>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {key.permissions}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">Revoke</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">📧 Email Notifications</h3>
              <div className="space-y-4">
                {Object.entries(userProfile.notifications.email).map(([setting, enabled]) => (
                  <div key={setting} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium capitalize">{setting.replace(/([A-Z])/g, ' $1')}</h4>
                      <p className="text-sm text-gray-600">
                        {setting === 'criticalAlerts' && 'High-priority safety alerts and emergencies'}
                        {setting === 'riskUpdates' && 'Risk assessment changes and predictions'}
                        {setting === 'systemUpdates' && 'Platform updates and maintenance notices'}
                        {setting === 'weeklyReports' && 'Weekly safety and performance summaries'}
                        {setting === 'maintenanceNotices' && 'Scheduled maintenance and system downtime'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => handleNotificationChange('email', setting, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">📱 SMS Notifications</h3>
              <div className="space-y-4">
                {Object.entries(userProfile.notifications.sms).map(([setting, enabled]) => (
                  <div key={setting} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium capitalize">{setting.replace(/([A-Z])/g, ' $1')}</h4>
                      <p className="text-sm text-gray-600">
                        {setting === 'criticalAlerts' && 'Critical safety alerts sent via SMS'}
                        {setting === 'emergencyOnly' && 'Only emergency and evacuation notices'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => handleNotificationChange('sms', setting, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🔔 Push Notifications</h3>
              <div className="space-y-4">
                {Object.entries(userProfile.notifications.push).map(([setting, enabled]) => (
                  <div key={setting} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium capitalize">{setting.replace(/([A-Z])/g, ' $1')}</h4>
                      <p className="text-sm text-gray-600">
                        {setting === 'realTimeAlerts' && 'Real-time alerts and system notifications'}
                        {setting === 'dataProcessing' && 'Data import and processing status updates'}
                        {setting === 'systemStatus' && 'System health and performance notifications'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => handleNotificationChange('push', setting, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            {/* Display Preferences */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🎨 Display Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select
                    value={userProfile.preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={userProfile.preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    value={userProfile.preferences.timezone}
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="America/Denver">Mountain Time (Denver)</option>
                    <option value="America/New_York">Eastern Time (New York)</option>
                    <option value="America/Los_Angeles">Pacific Time (Los Angeles)</option>
                    <option value="America/Chicago">Central Time (Chicago)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                  <select
                    value={userProfile.preferences.dateFormat}
                    onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* System Preferences */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">⚙️ System Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperature Unit</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Fahrenheit"
                        checked={userProfile.preferences.temperatureUnit === 'Fahrenheit'}
                        onChange={(e) => handlePreferenceChange('temperatureUnit', e.target.value)}
                        className="mr-2"
                      />
                      Fahrenheit (°F)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Celsius"
                        checked={userProfile.preferences.temperatureUnit === 'Celsius'}
                        onChange={(e) => handlePreferenceChange('temperatureUnit', e.target.value)}
                        className="mr-2"
                      />
                      Celsius (°C)
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard Refresh Rate</label>
                  <select
                    value={userProfile.preferences.dashboardRefresh}
                    onChange={(e) => handlePreferenceChange('dashboardRefresh', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={15}>15 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={300}>5 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
                  <select
                    value={userProfile.preferences.defaultView}
                    onChange={(e) => handlePreferenceChange('defaultView', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="dashboard">Dashboard</option>
                    <option value="alerts">Alert Management</option>
                    <option value="sensors">Sensor Monitoring</option>
                    <option value="analytics">Predictive Analytics</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

// Reporting System Component
const Reports = () => {
  const [activeTab, setActiveTab] = useState('builder'); // 'builder', 'scheduled', 'history'
  const [reportType, setReportType] = useState('alerts'); // 'alerts','sensors','risk','summary'
  const [dateRange, setDateRange] = useState({ from: new Date(Date.now()-7*24*3600*1000).toISOString().slice(0,10), to: new Date().toISOString().slice(0,10) });
  const [filters, setFilters] = useState({ severity: 'all', zone: 'all', sensorType: 'all' });
  const [includeSections, setIncludeSections] = useState({ charts: true, tables: true, recommendations: true });
  const [generated, setGenerated] = useState(null);

  const sampleData = {
    alerts: [
      { id: 'A-1001', time: '2025-09-22 10:15', severity: 'High', type: 'Rockfall', location: 'North Pit A', status: 'Resolved' },
      { id: 'A-1002', time: '2025-09-22 12:30', severity: 'Critical', type: 'Slope Instability', location: 'South Pit C', status: 'Active' },
      { id: 'A-1003', time: '2025-09-23 08:05', severity: 'Medium', type: 'Gas Detection', location: 'East Slope 1', status: 'Acknowledged' }
    ],
    sensors: [
      { id: 'S-201', type: 'Seismic', location: 'North Pit A', uptime: '99.4%', avg: 2.1, alerts: 3 },
      { id: 'S-314', type: 'Tiltmeter', location: 'South Pit C', uptime: '98.7%', avg: 0.7, alerts: 5 },
      { id: 'S-119', type: 'Weather', location: 'West Processing', uptime: '99.9%', avg: 15.2, alerts: 0 }
    ],
    risk: [
      { zone: 'North Pit A', riskScore: 92, topFactors: ['Structural', 'Weather'] },
      { zone: 'South Pit C', riskScore: 76, topFactors: ['Structural', 'Operational'] },
      { zone: 'East Slope 1', riskScore: 54, topFactors: ['Weather'] }
    ],
    geospatial: [
      { id: 'drone-001', type: 'Thermal Imagery', date: '2025-09-22', coverage: '156.7 ha', resolution: '2.3 cm/px', anomalies: 3, status: 'Processed' },
      { id: 'drone-002', type: 'RGB Orthomosaic', date: '2025-09-21', coverage: '201.4 ha', resolution: '1.8 cm/px', anomalies: 0, status: 'Processed' },
      { id: 'lidar-001', type: 'DEM Update', date: '2025-09-20', coverage: '245.1 ha', resolution: '0.5m grid', elevationChanges: '12 zones', status: 'Analyzed' },
      { id: 'satellite-001', type: 'Landsat 9', date: '2025-09-19', coverage: '1,250 ha', resolution: '30m/px', vegetationIndex: 'NDVI: 0.67', status: 'Processed' }
    ]
  };

  const generateReport = () => {
    const ts = new Date().toLocaleString();
    const title = `${reportType.charAt(0).toUpperCase()+reportType.slice(1)} Report (${dateRange.from} to ${dateRange.to})`;
    const payload = { title, createdAt: ts, reportType, filters, includeSections, data: sampleData };
    setGenerated(payload);
  };

  const downloadCSV = () => {
    if (!generated) return;
    let rows = [];
    if (reportType === 'alerts') {
      rows = [['ID','Time','Severity','Type','Location','Status'], ...sampleData.alerts.map(a=>[a.id,a.time,a.severity,a.type,a.location,a.status])];
    } else if (reportType === 'sensors') {
      rows = [['ID','Type','Location','Uptime','Average','Alerts'], ...sampleData.sensors.map(s=>[s.id,s.type,s.location,s.uptime,s.avg,s.alerts])];
    } else if (reportType === 'risk') {
      rows = [['Zone','Risk Score','Top Factors'], ...sampleData.risk.map(r=>[r.zone,r.riskScore,r.topFactors.join('; ')])];
    } else if (reportType === 'geospatial') {
      rows = [['ID','Type','Date','Coverage','Resolution','Anomalies/Changes','Status'], ...sampleData.geospatial.map(g=>[g.id,g.type,g.date,g.coverage,g.resolution,g.anomalies||g.elevationChanges||g.vegetationIndex,g.status])];
    } else {
      rows = [['Section','Count'], ['Alerts', sampleData.alerts.length], ['Sensors', sampleData.sensors.length], ['Zones', sampleData.risk.length], ['Geospatial', sampleData.geospatial.length]];
    }
    const csv = rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}-report-${dateRange.from}_to_${dateRange.to}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <Layout>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Reporting Center</h1>
            <p className="text-emerald-100">Build, preview, export, and schedule comprehensive safety reports</p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{reportType.toUpperCase()}</div>
                <div className="text-sm text-emerald-200">Report Type</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{dateRange.from} → {dateRange.to}</div>
                <div className="text-sm text-emerald-200">Date Range</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'builder', name: 'Report Builder', icon: '🧰' },
                { id: 'scheduled', name: 'Scheduled Reports', icon: '⏱️' },
                { id: 'history', name: 'Export History', icon: '📚' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Report Options</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={reportType}
                    onChange={(e)=>setReportType(e.target.value)}
                  >
                    <option value="alerts">Alert Report</option>
                    <option value="sensors">Sensor Performance</option>
                    <option value="risk">Risk Assessment</option>
                    <option value="geospatial">Geospatial Analysis</option>
                    <option value="summary">Executive Summary</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input type="date" className="w-full border rounded-md px-3 py-2" value={dateRange.from} onChange={(e)=>setDateRange(d=>({...d, from:e.target.value}))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input type="date" className="w-full border rounded-md px-3 py-2" value={dateRange.to} onChange={(e)=>setDateRange(d=>({...d, to:e.target.value}))} />
                  </div>
                </div>
                {reportType === 'alerts' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select className="w-full border rounded-md px-3 py-2" value={filters.severity} onChange={(e)=>setFilters(f=>({...f, severity:e.target.value}))}>
                      <option value="all">All</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                )}
                {reportType === 'sensors' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sensor Type</label>
                    <select className="w-full border rounded-md px-3 py-2" value={filters.sensorType} onChange={(e)=>setFilters(f=>({...f, sensorType:e.target.value}))}>
                      <option value="all">All</option>
                      <option value="Seismic">Seismic</option>
                      <option value="Tiltmeter">Tiltmeter</option>
                      <option value="Weather">Weather</option>
                    </select>
                  </div>
                )}
                {reportType === 'geospatial' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
                    <select className="w-full border rounded-md px-3 py-2" value={filters.geoType} onChange={(e)=>setFilters(f=>({...f, geoType:e.target.value}))}>
                      <option value="all">All Sources</option>
                      <option value="drone">Drone Imagery</option>
                      <option value="lidar">LiDAR/DEM</option>
                      <option value="satellite">Satellite Data</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Include Sections</label>
                  <div className="space-y-2">
                    {Object.entries(includeSections).map(([k,v]) => (
                      <label key={k} className="flex items-center">
                        <input type="checkbox" className="mr-2" checked={v} onChange={(e)=>setIncludeSections(s=>({...s,[k]:e.target.checked}))} />
                        <span className="capitalize">{k}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button onClick={generateReport} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium">Generate</button>
                <div className="flex items-center justify-between">
                  <button onClick={downloadCSV} disabled={!generated} className={`px-4 py-2 rounded-md text-sm font-medium ${generated? 'bg-blue-600 text-white hover:bg-blue-700':'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>⬇ Download CSV</button>
                  <button onClick={printReport} disabled={!generated} className={`px-4 py-2 rounded-md text-sm font-medium ${generated? 'bg-gray-800 text-white hover:bg-black':'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>🖨 Print</button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Report Preview</h3>
                {generated && <span className="text-sm text-gray-500">Generated: {generated.createdAt}</span>}
              </div>
              {!generated ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-5xl mb-2">📄</div>
                    <div>Configure options then click Generate to preview</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 print:p-0">
                  <div>
                    <h2 className="text-2xl font-bold">{generated.title}</h2>
                    <p className="text-gray-500">Prepared by RockGuard AI • {generated.createdAt}</p>
                  </div>

                  {/* Summary Section */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="text-sm text-emerald-700">Total Alerts</div>
                      <div className="text-2xl font-bold text-emerald-800">{sampleData.alerts.length}</div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="text-sm text-emerald-700">Sensors Tracked</div>
                      <div className="text-2xl font-bold text-emerald-800">{sampleData.sensors.length}</div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="text-sm text-emerald-700">Risk Zones</div>
                      <div className="text-2xl font-bold text-emerald-800">{sampleData.risk.length}</div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="text-sm text-emerald-700">Geospatial Datasets</div>
                      <div className="text-2xl font-bold text-emerald-800">{sampleData.geospatial.length}</div>
                      <div className="text-xs text-emerald-600 mt-1">{sampleData.geospatial.reduce((acc,g)=>acc+(g.anomalies||0),0)} anomalies detected</div>
                    </div>
                  </div>

                  {includeSections.tables && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Detailed Table</h4>
                      {reportType === 'alerts' && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {sampleData.alerts.map((a)=> (
                                <tr key={a.id}>
                                  <td className="px-4 py-2 text-sm">{a.id}</td>
                                  <td className="px-4 py-2 text-sm">{a.time}</td>
                                  <td className="px-4 py-2 text-sm">{a.severity}</td>
                                  <td className="px-4 py-2 text-sm">{a.type}</td>
                                  <td className="px-4 py-2 text-sm">{a.location}</td>
                                  <td className="px-4 py-2 text-sm">{a.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {reportType === 'sensors' && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Uptime</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Average</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Alerts</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {sampleData.sensors.map((s)=> (
                                <tr key={s.id}>
                                  <td className="px-4 py-2 text-sm">{s.id}</td>
                                  <td className="px-4 py-2 text-sm">{s.type}</td>
                                  <td className="px-4 py-2 text-sm">{s.location}</td>
                                  <td className="px-4 py-2 text-sm">{s.uptime}</td>
                                  <td className="px-4 py-2 text-sm">{s.avg}</td>
                                  <td className="px-4 py-2 text-sm">{s.alerts}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {reportType === 'risk' && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Zone</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Risk Score</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Top Factors</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {sampleData.risk.map((r)=> (
                                <tr key={r.zone}>
                                  <td className="px-4 py-2 text-sm">{r.zone}</td>
                                  <td className="px-4 py-2 text-sm">{r.riskScore}%</td>
                                  <td className="px-4 py-2 text-sm">{r.topFactors.join(', ')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {reportType === 'geospatial' && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Coverage</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Resolution</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Key Findings</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {sampleData.geospatial.map((g)=> (
                                <tr key={g.id}>
                                  <td className="px-4 py-2 text-sm">{g.id}</td>
                                  <td className="px-4 py-2 text-sm">{g.type}</td>
                                  <td className="px-4 py-2 text-sm">{g.date}</td>
                                  <td className="px-4 py-2 text-sm">{g.coverage}</td>
                                  <td className="px-4 py-2 text-sm">{g.resolution}</td>
                                  <td className="px-4 py-2 text-sm">
                                    {g.anomalies && g.anomalies > 0 && <span className="text-red-600">{g.anomalies} anomalies</span>}
                                    {g.elevationChanges && <span className="text-orange-600">{g.elevationChanges}</span>}
                                    {g.vegetationIndex && <span className="text-green-600">{g.vegetationIndex}</span>}
                                    {!g.anomalies && !g.elevationChanges && !g.vegetationIndex && <span className="text-gray-500">No issues</span>}
                                  </td>
                                  <td className="px-4 py-2 text-sm">{g.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {reportType === 'summary' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <h5 className="font-semibold mb-2">Alerts Overview</h5>
                            <p className="text-sm text-gray-600">Total alerts: {sampleData.alerts.length}. Critical events present.</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h5 className="font-semibold mb-2">Sensor Health</h5>
                            <p className="text-sm text-gray-600">Average uptime above 98%. Some sensors with elevated alerts.</p>
                          </div>
                          <div className="border rounded-lg p-4 md:col-span-2">
                            <h5 className="font-semibold mb-2">Risk Summary</h5>
                            <p className="text-sm text-gray-600">High risk in North Pit A; recommended immediate mitigations.</p>
                          </div>
                          <div className="border rounded-lg p-4 md:col-span-2">
                            <h5 className="font-semibold mb-2">Geospatial Insights</h5>
                            <p className="text-sm text-gray-600">Recent drone surveys identified {sampleData.geospatial.reduce((acc,g)=>acc+(g.anomalies||0),0)} thermal anomalies. DEM analysis shows significant topographic changes in {sampleData.geospatial.find(g=>g.elevationChanges)?.elevationChanges || '0 zones'}.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {includeSections.recommendations && (
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">Recommendations</h4>
                      <ul className="list-disc pl-5 text-sm text-emerald-900 space-y-1">
                        <li>Increase monitoring frequency for high-risk zones</li>
                        <li>Schedule maintenance for sensors with repeated alerts</li>
                        <li>Conduct slope stability assessment in North Pit A</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scheduled Reports */}
        {activeTab === 'scheduled' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Scheduled Reports</h3>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium">＋ New Schedule</button>
            </div>
            <div className="space-y-3">
              {[
                { id:'sch-1', name:'Daily Alert Digest', cadence:'Daily at 06:00', recipients:['safety@company.com'], format:'CSV + PDF (print)' },
                { id:'sch-2', name:'Weekly Risk Summary', cadence:'Mondays at 08:00', recipients:['ops@company.com','lead@company.com'], format:'CSV' }
              ].map((s)=> (
                <div key={s.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-gray-600">{s.cadence} • {s.format}</div>
                    <div className="text-xs text-gray-500">Recipients: {s.recipients.join(', ')}</div>
                  </div>
                  <div className="space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">Run now</button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export History */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Export History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { time:'2025-09-23 15:40', name:'Alert Report (7d)', format:'CSV', by:'John Mitchell', status:'Completed' },
                    { time:'2025-09-22 11:05', name:'Sensor Performance (24h)', format:'CSV', by:'John Mitchell', status:'Completed' },
                    { time:'2025-09-21 09:30', name:'Risk Assessment (w)', format:'Print', by:'John Mitchell', status:'Completed' }
                  ].map((h, i)=> (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{h.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{h.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{h.format}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{h.by}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm"><span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">{h.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/sensors" element={<SensorMonitoring />} />
        <Route path="/alerts" element={<AlertManagement />} />
        <Route path="/risk-analysis" element={<RiskAnalysis />} />
        <Route path="/data-management" element={<DataManagement />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
