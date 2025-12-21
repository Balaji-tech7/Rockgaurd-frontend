import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SensorCard from './components/SensorCard';
import SensorMap from './components/SensorMap';
import SensorChart from './components/SensorChart';
import DataQualityPanel from './components/DataQualityPanel';
import FilterControls from './components/FilterControls';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SensorDataMonitoring = () => {
  const [currentSite, setCurrentSite] = useState('Site Alpha');
  const [selectedSensors, setSelectedSensors] = useState([1, 2]);
  const [viewMode, setViewMode] = useState('grid');
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [filters, setFilters] = useState({
    status: 'all',
    sensorType: 'all',
    location: 'all',
    threshold: 'all',
    search: '',
    signalMin: '',
    signalMax: '',
    batteryMin: '',
    batteryMax: '',
    criticalOnly: false,
    hideMaintenance: false,
    trendingOnly: false
  });

  // Mock sensor data
  const sensors = [
    {
      id: 1,
      name: "Displacement Sensor DS-001",
      type: "Displacement",
      location: "North Slope - Zone A",
      icon: "Move",
      currentValue: 12.5,
      unit: "mm",
      threshold: 15.0,
      trend: "up",
      status: "online",
      signalStrength: 85,
      batteryLevel: 78,
      lastUpdated: "2 min ago"
    },
    {
      id: 2,
      name: "Strain Gauge SG-002",
      type: "Strain",
      location: "East Wall - Zone B",
      icon: "Zap",
      currentValue: 245.8,
      unit: "με",
      threshold: 300.0,
      trend: "stable",
      status: "online",
      signalStrength: 92,
      batteryLevel: 65,
      lastUpdated: "1 min ago"
    },
    {
      id: 3,
      name: "Pore Pressure PP-003",
      type: "Pressure",
      location: "South Bench - Zone C",
      icon: "Droplets",
      currentValue: 85.2,
      unit: "kPa",
      threshold: 100.0,
      trend: "down",
      status: "maintenance",
      signalStrength: 45,
      batteryLevel: 23,
      lastUpdated: "15 min ago"
    },
    {
      id: 4,
      name: "Rain Gauge RG-004",
      type: "Environmental",
      location: "Weather Station",
      icon: "CloudRain",
      currentValue: 2.3,
      unit: "mm/h",
      threshold: 5.0,
      trend: "stable",
      status: "online",
      signalStrength: 98,
      batteryLevel: 89,
      lastUpdated: "30 sec ago"
    },
    {
      id: 5,
      name: "Temperature Sensor TS-005",
      type: "Environmental",
      location: "Equipment Bay",
      icon: "Thermometer",
      currentValue: 28.7,
      unit: "°C",
      threshold: 35.0,
      trend: "up",
      status: "online",
      signalStrength: 76,
      batteryLevel: 54,
      lastUpdated: "3 min ago"
    },
    {
      id: 6,
      name: "Vibration Monitor VM-006",
      type: "Vibration",
      location: "Crusher Station",
      icon: "Activity",
      currentValue: 18.9,
      unit: "mm/s",
      threshold: 25.0,
      trend: "stable",
      status: "offline",
      signalStrength: 0,
      batteryLevel: 12,
      lastUpdated: "2 hours ago"
    }
  ];

  // Mock data quality metrics
  const qualityMetrics = [
    {
      id: 1,
      name: "Data Completeness",
      score: 94,
      description: "Percentage of expected data received"
    },
    {
      id: 2,
      name: "Signal Quality",
      score: 87,
      description: "Average signal strength across sensors"
    },
    {
      id: 3,
      name: "Sensor Uptime",
      score: 91,
      description: "Percentage of sensors online"
    },
    {
      id: 4,
      name: "Data Accuracy",
      score: 96,
      description: "Validation against expected ranges"
    }
  ];

  // Mock data quality alerts
  const dataQualityAlerts = [
    {
      id: 1,
      title: "Low Battery Warning",
      description: "Pore Pressure sensor PP-003 battery level below 25%",
      severity: "high",
      sensorName: "PP-003",
      timestamp: "15 minutes ago",
      resolved: false,
      recommendation: "Schedule battery replacement within 48 hours to prevent data loss"
    },
    {
      id: 2,
      title: "Communication Failure",
      description: "Vibration Monitor VM-006 has not transmitted data for 2 hours",
      severity: "critical",
      sensorName: "VM-006",
      timestamp: "2 hours ago",
      resolved: false,
      recommendation: "Check network connectivity and sensor power supply immediately"
    },
    {
      id: 3,
      title: "Anomalous Reading Detected",
      description: "Displacement sensor showing unusual spike in readings",
      severity: "medium",
      sensorName: "DS-001",
      timestamp: "45 minutes ago",
      resolved: true,
      recommendation: "Verified as equipment vibration, no action required"
    }
  ];

  const sensorTypes = [...new Set(sensors.map(s => s.type))];
  const locations = [...new Set(sensors.map(s => s.location))];

  // Filter sensors based on current filters
  const filteredSensors = sensors?.filter(sensor => {
    if (filters?.status !== 'all' && sensor?.status !== filters?.status) return false;
    if (filters?.sensorType !== 'all' && sensor?.type !== filters?.sensorType) return false;
    if (filters?.location !== 'all' && sensor?.location !== filters?.location) return false;
    if (filters?.threshold === 'exceeded' && sensor?.currentValue <= sensor?.threshold) return false;
    if (filters?.threshold === 'normal' && sensor?.currentValue > sensor?.threshold) return false;
    if (filters?.search && !sensor?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    if (filters?.signalMin && sensor?.signalStrength < parseInt(filters?.signalMin)) return false;
    if (filters?.signalMax && sensor?.signalStrength > parseInt(filters?.signalMax)) return false;
    if (filters?.batteryMin && sensor?.batteryLevel < parseInt(filters?.batteryMin)) return false;
    if (filters?.batteryMax && sensor?.batteryLevel > parseInt(filters?.batteryMax)) return false;
    if (filters?.hideMaintenance && sensor?.status === 'maintenance') return false;
    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      sensorType: 'all',
      location: 'all',
      threshold: 'all',
      search: '',
      signalMin: '',
      signalMax: '',
      batteryMin: '',
      batteryMax: '',
      criticalOnly: false,
      hideMaintenance: false,
      trendingOnly: false
    });
  };

  const handleSensorToggle = (sensorId) => {
    setSelectedSensors(prev => 
      prev?.includes(sensorId) 
        ? prev?.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  const handleSensorSelect = (sensor) => {
    if (!selectedSensors?.includes(sensor?.id)) {
      setSelectedSensors(prev => [...prev, sensor?.id]);
    }
  };

  const handleRefreshData = () => {
    setLastRefresh(new Date());
    // In a real app, this would trigger data fetching
  };

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const alertCount = dataQualityAlerts?.filter(alert => !alert?.resolved)?.length;
  const onlineSensors = sensors?.filter(s => s?.status === 'online')?.length;
  const totalSensors = sensors?.length;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sensor Data Monitoring - RockGuard AI</title>
        <meta name="description" content="Real-time monitoring of geotechnical and environmental sensors across mining operations" />
      </Helmet>
      <Header 
        currentSite={currentSite}
        onSiteChange={setCurrentSite}
        alertCount={alertCount}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Sensor Data Monitoring
              </h1>
              <p className="text-muted-foreground">
                Real-time oversight of geotechnical and environmental sensor networks
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last updated</p>
                <p className="font-medium text-foreground">
                  {lastRefresh?.toLocaleTimeString()}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleRefreshData}
                iconName="RefreshCw"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Radio" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sensors</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{totalSensors}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Online</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{onlineSensors}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{alertCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Quality</p>
                  <p className="text-2xl font-heading font-bold text-foreground">92%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="mb-8">
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              sensorTypes={sensorTypes}
              locations={locations}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Sensor Cards */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Live Sensor Readings ({filteredSensors?.length})
                </h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    iconName="Grid3X3"
                  />
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    iconName="List"
                  />
                </div>
              </div>

              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredSensors?.map(sensor => (
                  <SensorCard key={sensor?.id} sensor={sensor} />
                ))}
              </div>

              {filteredSensors?.length === 0 && (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No sensors match your filters</p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Sensor Map */}
            <div>
              <SensorMap 
                sensors={filteredSensors} 
                onSensorSelect={handleSensorSelect}
              />
            </div>
          </div>

          {/* Historical Data Chart */}
          <div className="mb-8">
            <SensorChart
              sensors={sensors}
              selectedSensors={selectedSensors}
              onSensorToggle={handleSensorToggle}
            />
          </div>

          {/* Data Quality Panel */}
          <DataQualityPanel
            qualityMetrics={qualityMetrics}
            alerts={dataQualityAlerts}
          />
        </div>
      </main>
    </div>
  );
};

export default SensorDataMonitoring;