import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';

const HistoricalTrendAnalysis = ({ selectedSite }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [dataType, setDataType] = useState('risk-probability');
  const [selectedZones, setSelectedZones] = useState(['zone-1', 'zone-2']);

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const dataTypeOptions = [
    { value: 'risk-probability', label: 'Risk Probability' },
    { value: 'confidence-levels', label: 'Confidence Levels' },
    { value: 'environmental-factors', label: 'Environmental Factors' },
    { value: 'prediction-accuracy', label: 'Prediction Accuracy' }
  ];

  const zoneOptions = [
    { value: 'zone-1', label: 'North Slope Section A' },
    { value: 'zone-2', label: 'East Wall Section B' },
    { value: 'zone-3', label: 'South Bench Level 3' },
    { value: 'zone-4', label: 'West Slope Section C' }
  ];

  // Mock historical data
  const generateMockData = () => {
    const now = new Date();
    const data = [];
    const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    const interval = timeRange === '24h' ? 'hour' : 'day';

    for (let i = points - 1; i >= 0; i--) {
      const date = new Date(now);
      if (interval === 'hour') {
        date?.setHours(date?.getHours() - i);
      } else {
        date?.setDate(date?.getDate() - i);
      }

      const dataPoint = {
        time: interval === 'hour' ? date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        timestamp: date?.getTime()
      };

      if (dataType === 'risk-probability') {
        dataPoint['North Slope Section A'] = Math.max(0.1, Math.min(0.95, 0.7 + Math.sin(i * 0.1) * 0.2 + Math.random() * 0.1));
        dataPoint['East Wall Section B'] = Math.max(0.1, Math.min(0.95, 0.4 + Math.cos(i * 0.15) * 0.15 + Math.random() * 0.1));
        dataPoint['South Bench Level 3'] = Math.max(0.1, Math.min(0.95, 0.2 + Math.sin(i * 0.08) * 0.1 + Math.random() * 0.05));
        dataPoint['West Slope Section C'] = Math.max(0.1, Math.min(0.95, 0.8 + Math.cos(i * 0.12) * 0.1 + Math.random() * 0.1));
      } else if (dataType === 'confidence-levels') {
        dataPoint['North Slope Section A'] = Math.max(0.6, Math.min(0.98, 0.85 + Math.random() * 0.1));
        dataPoint['East Wall Section B'] = Math.max(0.6, Math.min(0.98, 0.78 + Math.random() * 0.1));
        dataPoint['South Bench Level 3'] = Math.max(0.6, Math.min(0.98, 0.88 + Math.random() * 0.08));
        dataPoint['West Slope Section C'] = Math.max(0.6, Math.min(0.98, 0.92 + Math.random() * 0.06));
      } else if (dataType === 'environmental-factors') {
        dataPoint['Rainfall (mm)'] = Math.max(0, Math.random() * 50);
        dataPoint['Temperature (°C)'] = 15 + Math.sin(i * 0.1) * 10 + Math.random() * 5;
        dataPoint['Vibration (mm/s)'] = Math.random() * 10;
        dataPoint['Wind Speed (km/h)'] = Math.random() * 30;
      } else if (dataType === 'prediction-accuracy') {
        dataPoint['Model Accuracy'] = Math.max(0.7, Math.min(0.98, 0.85 + Math.random() * 0.1));
        dataPoint['False Positives'] = Math.max(0, Math.min(0.2, Math.random() * 0.15));
        dataPoint['False Negatives'] = Math.max(0, Math.min(0.1, Math.random() * 0.08));
      }

      data?.push(dataPoint);
    }

    return data;
  };

  const chartData = generateMockData();

  const getChartLines = () => {
    if (dataType === 'risk-probability') {
      return zoneOptions?.filter(zone => selectedZones?.includes(zone?.value))?.map((zone, index) => (
          <Line
            key={zone?.value}
            type="monotone"
            dataKey={zone?.label}
            stroke={['#DC2626', '#EA580C', '#D97706', '#059669']?.[index % 4]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ));
    } else if (dataType === 'confidence-levels') {
      return zoneOptions?.filter(zone => selectedZones?.includes(zone?.value))?.map((zone, index) => (
          <Line
            key={zone?.value}
            type="monotone"
            dataKey={zone?.label}
            stroke={['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']?.[index % 4]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ));
    } else if (dataType === 'environmental-factors') {
      return [
        <Line key="rainfall" type="monotone" dataKey="Rainfall (mm)" stroke="#3B82F6" strokeWidth={2} />,
        <Line key="temperature" type="monotone" dataKey="Temperature (°C)" stroke="#EF4444" strokeWidth={2} />,
        <Line key="vibration" type="monotone" dataKey="Vibration (mm/s)" stroke="#8B5CF6" strokeWidth={2} />,
        <Line key="wind" type="monotone" dataKey="Wind Speed (km/h)" stroke="#10B981" strokeWidth={2} />
      ];
    } else {
      return [
        <Line key="accuracy" type="monotone" dataKey="Model Accuracy" stroke="#10B981" strokeWidth={2} />,
        <Line key="false-pos" type="monotone" dataKey="False Positives" stroke="#EF4444" strokeWidth={2} />,
        <Line key="false-neg" type="monotone" dataKey="False Negatives" stroke="#F59E0B" strokeWidth={2} />
      ];
    }
  };

  const formatTooltipValue = (value, name) => {
    if (dataType === 'risk-probability' || dataType === 'confidence-levels') {
      return [`${Math.round(value * 100)}%`, name];
    } else if (dataType === 'prediction-accuracy') {
      if (name === 'Model Accuracy') {
        return [`${Math.round(value * 100)}%`, name];
      } else {
        return [`${Math.round(value * 100)}%`, name];
      }
    }
    return [value?.toFixed(1), name];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Historical Trend Analysis
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Track risk patterns and prediction accuracy over time
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Select time range"
            className="w-full sm:w-40"
          />
          <Select
            options={dataTypeOptions}
            value={dataType}
            onChange={setDataType}
            placeholder="Select data type"
            className="w-full sm:w-48"
          />
          {(dataType === 'risk-probability' || dataType === 'confidence-levels') && (
            <Select
              options={zoneOptions}
              value={selectedZones}
              onChange={setSelectedZones}
              multiple
              placeholder="Select zones"
              className="w-full sm:w-48"
            />
          )}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="time" 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => {
                if (dataType === 'risk-probability' || dataType === 'confidence-levels' || dataType === 'prediction-accuracy') {
                  return `${Math.round(value * 100)}%`;
                }
                return value?.toFixed(1);
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={formatTooltipValue}
            />
            <Legend />
            {getChartLines()}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Avg Risk</span>
          </div>
          <div className="text-2xl font-bold text-foreground">67%</div>
          <div className="text-xs text-success">+5% from last period</div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-foreground">89%</div>
          <div className="text-xs text-success">+2% from last period</div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Alerts</span>
          </div>
          <div className="text-2xl font-bold text-foreground">23</div>
          <div className="text-xs text-error">+8 from last period</div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Stability</span>
          </div>
          <div className="text-2xl font-bold text-foreground">94%</div>
          <div className="text-xs text-success">+1% from last period</div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalTrendAnalysis;