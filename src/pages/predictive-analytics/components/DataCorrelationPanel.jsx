import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataCorrelationPanel = () => {
  const [selectedCorrelation, setSelectedCorrelation] = useState('rainfall-risk');
  const [viewType, setViewType] = useState('scatter');

  const correlationData = {
    'rainfall-risk': [
      { x: 0, y: 15, label: 'No Rain', size: 20 },
      { x: 2, y: 18, label: 'Light Rain', size: 25 },
      { x: 5, y: 28, label: 'Moderate Rain', size: 30 },
      { x: 10, y: 45, label: 'Heavy Rain', size: 35 },
      { x: 15, y: 62, label: 'Very Heavy', size: 40 },
      { x: 20, y: 78, label: 'Extreme Rain', size: 45 },
      { x: 25, y: 88, label: 'Torrential', size: 50 }
    ],
    'temperature-stability': [
      { x: -5, y: 85, label: 'Freezing', size: 30 },
      { x: 0, y: 78, label: 'Very Cold', size: 25 },
      { x: 10, y: 65, label: 'Cold', size: 20 },
      { x: 20, y: 45, label: 'Moderate', size: 15 },
      { x: 30, y: 38, label: 'Warm', size: 20 },
      { x: 40, y: 52, label: 'Hot', size: 25 },
      { x: 45, y: 68, label: 'Extreme Heat', size: 35 }
    ],
    'vibration-displacement': [
      { x: 0.1, y: 2, label: 'Minimal', size: 15 },
      { x: 0.3, y: 5, label: 'Low', size: 20 },
      { x: 0.6, y: 12, label: 'Moderate', size: 25 },
      { x: 1.2, y: 28, label: 'High', size: 30 },
      { x: 2.0, y: 45, label: 'Very High', size: 35 },
      { x: 3.5, y: 72, label: 'Critical', size: 40 }
    ],
    'moisture-pressure': [
      { x: 20, y: 15, label: 'Dry', size: 20 },
      { x: 35, y: 22, label: 'Low Moisture', size: 25 },
      { x: 50, y: 35, label: 'Moderate', size: 30 },
      { x: 65, y: 48, label: 'High Moisture', size: 35 },
      { x: 80, y: 65, label: 'Saturated', size: 40 },
      { x: 95, y: 85, label: 'Waterlogged', size: 45 }
    ]
  };

  const correlationMetrics = {
    'rainfall-risk': {
      coefficient: 0.94,
      strength: 'Very Strong',
      direction: 'Positive',
      significance: 'p < 0.001',
      xLabel: 'Rainfall (mm/24h)',
      yLabel: 'Risk Probability (%)',
      description: 'Strong positive correlation between rainfall intensity and rockfall risk probability'
    },
    'temperature-stability': {
      coefficient: -0.68,
      strength: 'Moderate',
      direction: 'Negative',
      significance: 'p < 0.01',
      xLabel: 'Temperature (°C)',
      yLabel: 'Slope Stability Index',
      description: 'Moderate negative correlation between temperature extremes and slope stability'
    },
    'vibration-displacement': {
      coefficient: 0.89,
      strength: 'Strong',
      direction: 'Positive',
      significance: 'p < 0.001',
      xLabel: 'Vibration Level (g)',
      yLabel: 'Ground Displacement (mm)',
      description: 'Strong positive correlation between vibration intensity and ground displacement'
    },
    'moisture-pressure': {
      coefficient: 0.82,
      strength: 'Strong',
      direction: 'Positive',
      significance: 'p < 0.001',
      xLabel: 'Soil Moisture (%)',
      yLabel: 'Pore Pressure (kPa)',
      description: 'Strong positive correlation between soil moisture content and pore pressure buildup'
    }
  };

  const correlationOptions = [
    { id: 'rainfall-risk', label: 'Rainfall vs Risk', icon: 'CloudRain' },
    { id: 'temperature-stability', label: 'Temperature vs Stability', icon: 'Thermometer' },
    { id: 'vibration-displacement', label: 'Vibration vs Displacement', icon: 'Activity' },
    { id: 'moisture-pressure', label: 'Moisture vs Pressure', icon: 'Droplets' }
  ];

  const currentData = correlationData?.[selectedCorrelation];
  const currentMetrics = correlationMetrics?.[selectedCorrelation];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-2">
          <p className="font-medium text-foreground mb-2">{data?.label}</p>
          <p className="text-sm text-muted-foreground">
            {currentMetrics?.xLabel}: {data?.x}
          </p>
          <p className="text-sm text-muted-foreground">
            {currentMetrics?.yLabel}: {data?.y}
          </p>
        </div>
      );
    }
    return null;
  };

  const getCorrelationColor = (coefficient) => {
    const abs = Math.abs(coefficient);
    if (abs >= 0.8) return 'var(--color-success)';
    if (abs >= 0.6) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="space-y-6">
      {/* Correlation Selection */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Environmental Data Correlations</h3>
            <p className="text-sm text-muted-foreground">
              Analyze relationships between environmental factors and prediction accuracy
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
            {correlationOptions?.map(option => (
              <Button
                key={option?.id}
                variant={selectedCorrelation === option?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCorrelation(option?.id)}
                iconName={option?.icon}
                iconPosition="left"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="x"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: currentMetrics?.xLabel, position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                dataKey="y"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: currentMetrics?.yLabel, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                dataKey="y"
                fill="var(--color-primary)"
                fillOpacity={0.7}
                name={currentMetrics?.yLabel}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Correlation Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div 
              className="text-2xl font-bold mb-1"
              style={{ color: getCorrelationColor(currentMetrics?.coefficient) }}
            >
              {currentMetrics?.coefficient}
            </div>
            <div className="text-sm text-muted-foreground">Correlation Coefficient</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">{currentMetrics?.strength}</div>
            <div className="text-sm text-muted-foreground">Correlation Strength</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">{currentMetrics?.direction}</div>
            <div className="text-sm text-muted-foreground">Direction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">{currentMetrics?.significance}</div>
            <div className="text-sm text-muted-foreground">Statistical Significance</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-foreground">{currentMetrics?.description}</p>
        </div>
      </div>
      {/* Factor Impact Analysis */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Environmental Factor Impact</h3>
          <p className="text-sm text-muted-foreground">
            Relative influence of different environmental factors on prediction accuracy
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="CloudRain" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">Rainfall Intensity</div>
                <div className="text-sm text-muted-foreground">Primary risk factor</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-background rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <span className="text-sm font-medium text-foreground w-12">94%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={20} className="text-secondary-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">Ground Vibration</div>
                <div className="text-sm text-muted-foreground">Seismic activity impact</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-background rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
              <span className="text-sm font-medium text-foreground w-12">89%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Droplets" size={20} className="text-accent-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">Soil Moisture</div>
                <div className="text-sm text-muted-foreground">Saturation levels</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-background rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
              <span className="text-sm font-medium text-foreground w-12">82%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                <Icon name="Thermometer" size={20} className="text-warning-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">Temperature Variation</div>
                <div className="text-sm text-muted-foreground">Thermal stress effects</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-background rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <span className="text-sm font-medium text-foreground w-12">68%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                <Icon name="Wind" size={20} className="text-success-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">Wind Speed</div>
                <div className="text-sm text-muted-foreground">Atmospheric pressure</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-background rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-sm font-medium text-foreground w-12">45%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCorrelationPanel;