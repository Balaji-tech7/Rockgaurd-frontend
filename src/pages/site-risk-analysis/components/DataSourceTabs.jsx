import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DataSourceTabs = ({ selectedSite, onDataUpdate }) => {
  const [activeTab, setActiveTab] = useState('dem-analysis');

  const tabs = [
    {
      id: 'dem-analysis',
      label: 'DEM Analysis',
      icon: 'Mountain',
      description: 'Digital Elevation Model processing and slope analysis'
    },
    {
      id: 'drone-imagery',
      label: 'Drone Imagery',
      icon: 'Plane',
      description: 'Aerial photography and visual inspection data'
    },
    {
      id: 'sensor-readings',
      label: 'Sensor Data',
      icon: 'Activity',
      description: 'Real-time geotechnical sensor measurements'
    },
    {
      id: 'environmental',
      label: 'Environmental',
      icon: 'Cloud',
      description: 'Weather conditions and environmental factors'
    }
  ];

  const mockDEMData = {
    lastProcessed: new Date(Date.now() - 1800000),
    resolution: '1m x 1m',
    coverage: '95.2%',
    slopeAngles: {
      min: 15,
      max: 78,
      average: 42
    },
    elevationRange: {
      min: 1245,
      max: 1687,
      unit: 'meters'
    },
    riskZones: 12,
    processingTime: '14 minutes'
  };

  const mockDroneData = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 3600000),
      location: 'North Slope Section A',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      anomalies: 3,
      resolution: '4K',
      weather: 'Clear'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 7200000),
      location: 'East Wall Section B',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      anomalies: 1,
      resolution: '4K',
      weather: 'Partly Cloudy'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 10800000),
      location: 'West Slope Section C',
      imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop',
      anomalies: 5,
      resolution: '4K',
      weather: 'Clear'
    }
  ];

  const mockSensorData = [
    {
      id: 'sensor-001',
      name: 'Displacement Sensor NS-01',
      location: 'North Slope Section A',
      type: 'Displacement',
      value: 2.3,
      unit: 'mm',
      status: 'critical',
      lastReading: new Date(Date.now() - 300000),
      trend: 'increasing'
    },
    {
      id: 'sensor-002',
      name: 'Strain Gauge EW-02',
      location: 'East Wall Section B',
      type: 'Strain',
      value: 145.7,
      unit: 'με',
      status: 'normal',
      lastReading: new Date(Date.now() - 600000),
      trend: 'stable'
    },
    {
      id: 'sensor-003',
      name: 'Pore Pressure PP-03',
      location: 'South Bench Level 3',
      type: 'Pressure',
      value: 87.2,
      unit: 'kPa',
      status: 'warning',
      lastReading: new Date(Date.now() - 900000),
      trend: 'decreasing'
    },
    {
      id: 'sensor-004',
      name: 'Tiltmeter TM-04',
      location: 'West Slope Section C',
      type: 'Tilt',
      value: 0.8,
      unit: 'degrees',
      status: 'critical',
      lastReading: new Date(Date.now() - 180000),
      trend: 'increasing'
    }
  ];

  const mockEnvironmentalData = {
    current: {
      temperature: 18.5,
      humidity: 67,
      rainfall: 0,
      windSpeed: 12.3,
      windDirection: 'NW',
      pressure: 1013.2,
      visibility: 15
    },
    forecast: [
      { time: '12:00', temp: 22, rain: 0, wind: 15 },
      { time: '15:00', temp: 25, rain: 2, wind: 18 },
      { time: '18:00', temp: 20, rain: 8, wind: 22 },
      { time: '21:00', temp: 16, rain: 12, wind: 25 }
    ],
    alerts: [
      {
        type: 'rainfall',
        severity: 'medium',
        message: 'Heavy rainfall expected in next 6 hours',
        impact: 'Increased rockfall risk'
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      'critical': 'text-error',
      'warning': 'text-warning',
      'normal': 'text-success'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const getStatusBgColor = (status) => {
    const colors = {
      'critical': 'bg-error/10',
      'warning': 'bg-warning/10',
      'normal': 'bg-success/10'
    };
    return colors?.[status] || 'bg-muted';
  };

  const getTrendIcon = (trend) => {
    const icons = {
      'increasing': 'TrendingUp',
      'decreasing': 'TrendingDown',
      'stable': 'Minus'
    };
    return icons?.[trend] || 'Minus';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dem-analysis':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Last Processed</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {mockDEMData?.lastProcessed?.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Grid3X3" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Resolution</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {mockDEMData?.resolution}
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Coverage</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {mockDEMData?.coverage}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Slope Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Min Angle:</span>
                    <span className="text-sm font-medium text-foreground">{mockDEMData?.slopeAngles?.min}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Angle:</span>
                    <span className="text-sm font-medium text-foreground">{mockDEMData?.slopeAngles?.max}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average:</span>
                    <span className="text-sm font-medium text-foreground">{mockDEMData?.slopeAngles?.average}°</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Elevation Range</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Minimum:</span>
                    <span className="text-sm font-medium text-foreground">{mockDEMData?.elevationRange?.min}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Maximum:</span>
                    <span className="text-sm font-medium text-foreground">{mockDEMData?.elevationRange?.max}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Risk Zones:</span>
                    <span className="text-sm font-medium text-foreground">{mockDEMData?.riskZones}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'drone-imagery':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockDroneData?.map(image => (
                <div key={image?.id} className="bg-muted rounded-lg overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={image?.imageUrl}
                      alt={`Drone imagery of ${image?.location}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-foreground mb-2">{image?.location}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Captured:</span>
                        <span className="text-foreground">{image?.timestamp?.toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Anomalies:</span>
                        <span className={`font-medium ${image?.anomalies > 3 ? 'text-error' : image?.anomalies > 0 ? 'text-warning' : 'text-success'}`}>
                          {image?.anomalies}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weather:</span>
                        <span className="text-foreground">{image?.weather}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sensor-readings':
        return (
          <div className="space-y-4">
            {mockSensorData?.map(sensor => (
              <div key={sensor?.id} className={`rounded-lg border p-4 ${getStatusBgColor(sensor?.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{sensor?.name}</h4>
                    <p className="text-sm text-muted-foreground">{sensor?.location}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor?.status)} ${getStatusBgColor(sensor?.status)}`}>
                    {sensor?.status?.toUpperCase()}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Current Value</span>
                    <div className="font-medium text-foreground text-lg">
                      {sensor?.value} {sensor?.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type</span>
                    <div className="font-medium text-foreground">{sensor?.type}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Reading</span>
                    <div className="font-medium text-foreground">
                      {sensor?.lastReading?.toLocaleTimeString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Trend</span>
                    <div className="flex items-center space-x-1">
                      <Icon name={getTrendIcon(sensor?.trend)} size={16} className={getStatusColor(sensor?.status)} />
                      <span className="font-medium text-foreground capitalize">{sensor?.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'environmental':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Thermometer" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Temperature</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {mockEnvironmentalData?.current?.temperature}°C
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Droplets" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {mockEnvironmentalData?.current?.humidity}%
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Wind" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Wind Speed</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {mockEnvironmentalData?.current?.windSpeed} km/h
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Gauge" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Pressure</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {mockEnvironmentalData?.current?.pressure} hPa
                </div>
              </div>
            </div>
            {mockEnvironmentalData?.alerts?.length > 0 && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="font-medium text-foreground">Environmental Alerts</span>
                </div>
                {mockEnvironmentalData?.alerts?.map((alert, index) => (
                  <div key={index} className="mt-2">
                    <div className="text-sm font-medium text-foreground">{alert?.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">Impact: {alert?.impact}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">4-Hour Forecast</h4>
              <div className="grid grid-cols-4 gap-4">
                {mockEnvironmentalData?.forecast?.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-foreground">{item?.time}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item?.temp}°C
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item?.rain}mm
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item?.wind} km/h
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Data Sources
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Multi-source data analysis for comprehensive risk assessment
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDataUpdate?.()}
        >
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Refresh Data
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map(tab => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-smooth ${
              activeTab === tab?.id
                ? 'text-primary bg-primary/10 border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DataSourceTabs;