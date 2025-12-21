import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskMapPanel = ({ selectedSite, onZoneClick }) => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock risk zones data
  const riskZones = [
    { id: 1, name: 'North Slope A', risk: 'high', x: 25, y: 30, severity: 85 },
    { id: 2, name: 'East Wall B', risk: 'medium', x: 65, y: 45, severity: 45 },
    { id: 3, name: 'South Pit C', risk: 'low', x: 40, y: 70, severity: 15 },
    { id: 4, name: 'West Bench D', risk: 'high', x: 15, y: 55, severity: 92 },
    { id: 5, name: 'Central Area E', risk: 'medium', x: 50, y: 50, severity: 38 }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const handleZoneClick = (zone) => {
    onZoneClick(zone);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Risk Map - {selectedSite}</h2>
          <p className="text-sm text-muted-foreground">Real-time rockfall risk visualization</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-muted-foreground">
              {connectionStatus === 'connected' ? 'Live' : 'Disconnected'}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Updated: {lastUpdate?.toLocaleTimeString()}
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      </div>
      {/* Interactive Risk Map */}
      <div className="relative bg-slate-100 rounded-lg h-96 overflow-hidden">
        {/* Background terrain */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-stone-200"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Risk zones */}
        {riskZones?.map((zone) => (
          <div
            key={zone?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${zone?.x}%`, top: `${zone?.y}%` }}
            onClick={() => handleZoneClick(zone)}
          >
            <div className={`w-8 h-8 rounded-full ${getRiskColor(zone?.risk)} opacity-80 group-hover:opacity-100 transition-all duration-200 group-hover:scale-110 flex items-center justify-center`}>
              <Icon name="AlertTriangle" size={16} className="text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                <div className="font-medium">{zone?.name}</div>
                <div>Risk: {zone?.severity}%</div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        ))}

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="outline" size="icon" className="bg-white/90">
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/90">
            <Icon name="ZoomOut" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/90">
            <Icon name="Maximize" size={16} />
          </Button>
        </div>
      </div>
      {/* Risk Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-foreground">High Risk (&gt;70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-foreground">Medium Risk (30-70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-foreground">Low Risk (&lt;30%)</span>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
          View Full Analysis
        </Button>
      </div>
    </div>
  );
};

export default RiskMapPanel;