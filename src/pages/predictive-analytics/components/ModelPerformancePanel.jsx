import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelPerformancePanel = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [timeRange, setTimeRange] = useState('30d');

  const performanceMetrics = [
    {
      model: 'Ensemble',
      accuracy: 94.2,
      precision: 91.8,
      recall: 96.5,
      f1Score: 94.1,
      falsePositives: 12,
      falseNegatives: 8,
      truePositives: 156,
      trueNegatives: 324
    },
    {
      model: 'Neural Network',
      accuracy: 91.8,
      precision: 89.2,
      recall: 94.1,
      f1Score: 91.6,
      falsePositives: 18,
      falseNegatives: 11,
      truePositives: 149,
      trueNegatives: 322
    },
    {
      model: 'Random Forest',
      accuracy: 89.5,
      precision: 87.3,
      recall: 91.8,
      f1Score: 89.5,
      falsePositives: 22,
      falseNegatives: 15,
      truePositives: 143,
      trueNegatives: 320
    },
    {
      model: 'SVM',
      accuracy: 87.3,
      precision: 84.6,
      recall: 89.2,
      f1Score: 86.8,
      falsePositives: 28,
      falseNegatives: 19,
      truePositives: 137,
      trueNegatives: 316
    }
  ];

  const environmentalPerformance = [
    { condition: 'Dry Weather', accuracy: 96.2, predictions: 145 },
    { condition: 'Light Rain', accuracy: 92.8, predictions: 89 },
    { condition: 'Heavy Rain', accuracy: 88.5, predictions: 67 },
    { condition: 'High Wind', accuracy: 90.1, predictions: 43 },
    { condition: 'Temperature Extreme', accuracy: 85.7, predictions: 28 }
  ];

  const confusionMatrix = [
    { name: 'True Positives', value: 156, color: 'var(--color-success)' },
    { name: 'True Negatives', value: 324, color: 'var(--color-primary)' },
    { name: 'False Positives', value: 12, color: 'var(--color-warning)' },
    { name: 'False Negatives', value: 8, color: 'var(--color-error)' }
  ];

  const metrics = [
    { id: 'accuracy', label: 'Accuracy', icon: 'Target' },
    { id: 'precision', label: 'Precision', icon: 'Crosshair' },
    { id: 'recall', label: 'Recall', icon: 'Search' },
    { id: 'f1Score', label: 'F1 Score', icon: 'BarChart3' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${selectedMetric === 'accuracy' || selectedMetric === 'precision' || selectedMetric === 'recall' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Model Comparison Chart */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Model Performance Comparison</h3>
            <p className="text-sm text-muted-foreground">
              Comparative analysis across different AI models
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            {metrics?.map(metric => (
              <Button
                key={metric?.id}
                variant={selectedMetric === metric?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric(metric?.id)}
                iconName={metric?.icon}
                iconPosition="left"
              >
                {metric?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="model" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: `${metrics?.find(m => m?.id === selectedMetric)?.label} (%)`, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={selectedMetric} 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                name={metrics?.find(m => m?.id === selectedMetric)?.label}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Environmental Conditions Performance */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Performance by Environmental Conditions</h3>
          <p className="text-sm text-muted-foreground">
            Model accuracy across different weather and environmental factors
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={environmentalPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                type="number" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Accuracy (%)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="category"
                dataKey="condition" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="accuracy" 
                fill="var(--color-secondary)"
                radius={[0, 4, 4, 0]}
                name="Accuracy"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Prediction Distribution</h3>
            <p className="text-sm text-muted-foreground">
              Breakdown of prediction accuracy types
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={confusionMatrix}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {confusionMatrix?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} predictions`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {confusionMatrix?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-foreground">{item?.name}</span>
                <span className="text-sm font-medium text-foreground ml-auto">{item?.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Key Performance Indicators</h3>
            <p className="text-sm text-muted-foreground">
              Critical metrics for model evaluation
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-success-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Overall Accuracy</div>
                  <div className="text-sm text-muted-foreground">Last 30 days</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-success">94.2%</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Precision Rate</div>
                  <div className="text-sm text-muted-foreground">True positive accuracy</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">91.8%</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Search" size={20} className="text-secondary-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Recall Rate</div>
                  <div className="text-sm text-muted-foreground">Event detection rate</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-secondary">96.5%</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={20} className="text-accent-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">F1 Score</div>
                  <div className="text-sm text-muted-foreground">Harmonic mean</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-accent">94.1%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformancePanel;