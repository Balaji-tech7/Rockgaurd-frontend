import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';

const ComparativeAnalysis = () => {
  const [comparisonType, setComparisonType] = useState('temporal');
  const [selectedZones, setSelectedZones] = useState(['zone-a', 'zone-b']);
  const [timeRange, setTimeRange] = useState('3m');

  const temporalData = [
    {
      date: '2024-11-16',
      timestamp: 'Nov 16',
      currentPeriod: 25,
      previousPeriod: 18,
      seasonalAverage: 22
    },
    {
      date: '2024-12-16',
      timestamp: 'Dec 16',
      currentPeriod: 32,
      previousPeriod: 24,
      seasonalAverage: 28
    },
    {
      date: '2025-01-16',
      timestamp: 'Jan 16',
      currentPeriod: 38,
      previousPeriod: 29,
      seasonalAverage: 31
    }
  ];

  const zonalData = [
    {
      date: '2025-01-12',
      timestamp: '12 Jan',
      zoneA: 28,
      zoneB: 35,
      zoneC: 22,
      zoneD: 41
    },
    {
      date: '2025-01-13',
      timestamp: '13 Jan',
      zoneA: 32,
      zoneB: 38,
      zoneC: 25,
      zoneD: 44
    },
    {
      date: '2025-01-14',
      timestamp: '14 Jan',
      zoneA: 35,
      zoneB: 42,
      zoneC: 28,
      zoneD: 48
    },
    {
      date: '2025-01-15',
      timestamp: '15 Jan',
      zoneA: 38,
      zoneB: 45,
      zoneC: 31,
      zoneD: 52
    },
    {
      date: '2025-01-16',
      timestamp: '16 Jan',
      zoneA: 41,
      zoneB: 48,
      zoneC: 34,
      zoneD: 55
    }
  ];

  const correlationData = [
    { rainfall: 0, riskIncrease: 5, temperature: 25 },
    { rainfall: 2, riskIncrease: 12, temperature: 22 },
    { rainfall: 5, riskIncrease: 25, temperature: 18 },
    { rainfall: 8, riskIncrease: 38, temperature: 15 },
    { rainfall: 12, riskIncrease: 52, temperature: 12 },
    { rainfall: 15, riskIncrease: 68, temperature: 10 },
    { rainfall: 20, riskIncrease: 85, temperature: 8 },
    { rainfall: 25, riskIncrease: 95, temperature: 6 }
  ];

  const comparisonTypes = [
    { value: 'temporal', label: 'Time Period Comparison' },
    { value: 'zonal', label: 'Geological Zone Comparison' },
    { value: 'seasonal', label: 'Seasonal Variation Analysis' },
    { value: 'correlation', label: 'Environmental Correlation' }
  ];

  const zoneOptions = [
    { value: 'zone-a', label: 'Zone A - North Slope' },
    { value: 'zone-b', label: 'Zone B - East Wall' },
    { value: 'zone-c', label: 'Zone C - South Bench' },
    { value: 'zone-d', label: 'Zone D - West Pit' }
  ];

  const timeRangeOptions = [
    { value: '1m', label: 'Last Month' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-2">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${comparisonType === 'correlation' && entry?.dataKey === 'rainfall' ? 'mm' : '%'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (comparisonType) {
      case 'temporal':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temporalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="timestamp" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Risk Probability (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="currentPeriod"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name="Current Period"
              />
              <Line
                type="monotone"
                dataKey="previousPeriod"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
                name="Previous Period"
              />
              <Line
                type="monotone"
                dataKey="seasonalAverage"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                name="Seasonal Average"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'zonal':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={zonalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="timestamp" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Risk Probability (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="zoneA"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 3 }}
                name="Zone A"
              />
              <Line
                type="monotone"
                dataKey="zoneB"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
                name="Zone B"
              />
              <Line
                type="monotone"
                dataKey="zoneC"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                name="Zone C"
              />
              <Line
                type="monotone"
                dataKey="zoneD"
                stroke="var(--color-error)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-error)', strokeWidth: 2, r: 3 }}
                name="Zone D"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'correlation':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="rainfall"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Rainfall (mm)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                dataKey="riskIncrease"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Risk Increase (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                dataKey="riskIncrease"
                fill="var(--color-primary)"
                name="Risk vs Rainfall"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select a comparison type to view analysis</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Comparative Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Compare predictions across time periods, zones, and environmental factors
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <Select
            options={comparisonTypes}
            value={comparisonType}
            onChange={setComparisonType}
            placeholder="Select comparison type"
            className="min-w-48"
          />
          
          {comparisonType === 'zonal' && (
            <Select
              options={zoneOptions}
              value={selectedZones}
              onChange={setSelectedZones}
              multiple
              placeholder="Select zones"
              className="min-w-48"
            />
          )}
          
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Select time range"
            className="min-w-32"
          />
        </div>
      </div>

      <div className="h-80 w-full">
        {renderChart()}
      </div>

      {/* Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        {comparisonType === 'temporal' && (
          <>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">+18%</div>
              <div className="text-sm text-muted-foreground">Risk Increase vs Previous Period</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">+12%</div>
              <div className="text-sm text-muted-foreground">Above Seasonal Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">0.87</div>
              <div className="text-sm text-muted-foreground">Correlation Coefficient</div>
            </div>
          </>
        )}
        
        {comparisonType === 'zonal' && (
          <>
            <div className="text-center">
              <div className="text-2xl font-bold text-error mb-1">Zone D</div>
              <div className="text-sm text-muted-foreground">Highest Risk Zone</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">Zone C</div>
              <div className="text-sm text-muted-foreground">Lowest Risk Zone</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">23%</div>
              <div className="text-sm text-muted-foreground">Risk Variance</div>
            </div>
          </>
        )}
        
        {comparisonType === 'correlation' && (
          <>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">0.94</div>
              <div className="text-sm text-muted-foreground">Rainfall Correlation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">-0.78</div>
              <div className="text-sm text-muted-foreground">Temperature Correlation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">15mm</div>
              <div className="text-sm text-muted-foreground">Critical Rainfall Threshold</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComparativeAnalysis;