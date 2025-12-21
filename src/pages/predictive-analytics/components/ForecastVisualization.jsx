import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

import Button from '../../../components/ui/Button';

const ForecastVisualization = () => {
  const [selectedModel, setSelectedModel] = useState('ensemble');
  const [timeHorizon, setTimeHorizon] = useState('7d');
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);

  const forecastData = [
    {
      date: '2025-01-16',
      timestamp: '16 Jan',
      riskProbability: 15,
      confidenceUpper: 25,
      confidenceLower: 8,
      historicalEvents: 2
    },
    {
      date: '2025-01-17',
      timestamp: '17 Jan',
      riskProbability: 22,
      confidenceUpper: 35,
      confidenceLower: 12,
      historicalEvents: 1
    },
    {
      date: '2025-01-18',
      timestamp: '18 Jan',
      riskProbability: 35,
      confidenceUpper: 48,
      confidenceLower: 20,
      historicalEvents: 3
    },
    {
      date: '2025-01-19',
      timestamp: '19 Jan',
      riskProbability: 42,
      confidenceUpper: 58,
      confidenceLower: 28,
      historicalEvents: 0
    },
    {
      date: '2025-01-20',
      timestamp: '20 Jan',
      riskProbability: 38,
      confidenceUpper: 52,
      confidenceLower: 25,
      historicalEvents: 2
    },
    {
      date: '2025-01-21',
      timestamp: '21 Jan',
      riskProbability: 28,
      confidenceUpper: 40,
      confidenceLower: 18,
      historicalEvents: 1
    },
    {
      date: '2025-01-22',
      timestamp: '22 Jan',
      riskProbability: 31,
      confidenceUpper: 44,
      confidenceLower: 20,
      historicalEvents: 0
    }
  ];

  const models = [
    { id: 'ensemble', name: 'Ensemble Model', accuracy: 94.2 },
    { id: 'neural', name: 'Neural Network', accuracy: 91.8 },
    { id: 'random-forest', name: 'Random Forest', accuracy: 89.5 },
    { id: 'svm', name: 'Support Vector Machine', accuracy: 87.3 }
  ];

  const timeHorizons = [
    { id: '24h', label: '24 Hours', days: 1 },
    { id: '7d', label: '7 Days', days: 7 },
    { id: '14d', label: '14 Days', days: 14 },
    { id: '30d', label: '30 Days', days: 30 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-2">
          <p className="font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Rockfall Risk Forecast</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered probability predictions with confidence intervals
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {models?.map(model => (
              <option key={model?.id} value={model?.id}>
                {model?.name} ({model?.accuracy}%)
              </option>
            ))}
          </select>
          
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeHorizons?.map(horizon => (
              <option key={horizon?.id} value={horizon?.id}>
                {horizon?.label}
              </option>
            ))}
          </select>
          
          <Button
            variant={showConfidenceInterval ? "default" : "outline"}
            size="sm"
            onClick={() => setShowConfidenceInterval(!showConfidenceInterval)}
            iconName="TrendingUp"
            iconPosition="left"
          >
            Confidence Bands
          </Button>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {showConfidenceInterval ? (
            <AreaChart data={forecastData}>
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
              
              <Area
                type="monotone"
                dataKey="confidenceUpper"
                stackId="1"
                stroke="none"
                fill="var(--color-primary)"
                fillOpacity={0.1}
                name="Upper Confidence"
              />
              <Area
                type="monotone"
                dataKey="confidenceLower"
                stackId="1"
                stroke="none"
                fill="var(--color-background)"
                fillOpacity={1}
                name="Lower Confidence"
              />
              
              <Line
                type="monotone"
                dataKey="riskProbability"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name="Risk Probability"
              />
            </AreaChart>
          ) : (
            <LineChart data={forecastData}>
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
                dataKey="riskProbability"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name="Risk Probability"
              />
              <Line
                type="monotone"
                dataKey="historicalEvents"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                name="Historical Events"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {forecastData?.[forecastData?.length - 1]?.riskProbability}%
          </div>
          <div className="text-sm text-muted-foreground">Current Risk Level</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent mb-1">
            {Math.max(...forecastData?.map(d => d?.riskProbability))}%
          </div>
          <div className="text-sm text-muted-foreground">Peak Forecast</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {models?.find(m => m?.id === selectedModel)?.accuracy}%
          </div>
          <div className="text-sm text-muted-foreground">Model Accuracy</div>
        </div>
      </div>
    </div>
  );
};

export default ForecastVisualization;