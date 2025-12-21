import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PredictionConfiguration = () => {
  const [modelSettings, setModelSettings] = useState({
    selectedModel: 'ensemble',
    sensitivity: 75,
    confidenceThreshold: 85,
    predictionHorizon: '7d',
    updateFrequency: '1h'
  });

  const [environmentalWeights, setEnvironmentalWeights] = useState({
    rainfall: 85,
    temperature: 60,
    vibration: 80,
    moisture: 70,
    wind: 45
  });

  const [alertThresholds, setAlertThresholds] = useState({
    lowRisk: 25,
    mediumRisk: 50,
    highRisk: 75,
    criticalRisk: 90
  });

  const [enabledFeatures, setEnabledFeatures] = useState({
    realTimeUpdates: true,
    historicalValidation: true,
    multiModelEnsemble: true,
    weatherIntegration: true,
    seismicMonitoring: false,
    droneImagery: true
  });

  const modelOptions = [
    { value: 'ensemble', label: 'Ensemble Model (Recommended)' },
    { value: 'neural', label: 'Neural Network' },
    { value: 'random-forest', label: 'Random Forest' },
    { value: 'svm', label: 'Support Vector Machine' },
    { value: 'custom', label: 'Custom Configuration' }
  ];

  const horizonOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '14d', label: '14 Days' },
    { value: '30d', label: '30 Days' }
  ];

  const frequencyOptions = [
    { value: '15m', label: 'Every 15 minutes' },
    { value: '30m', label: 'Every 30 minutes' },
    { value: '1h', label: 'Every hour' },
    { value: '6h', label: 'Every 6 hours' },
    { value: '24h', label: 'Daily' }
  ];

  const handleModelSettingChange = (key, value) => {
    setModelSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleWeightChange = (factor, value) => {
    setEnvironmentalWeights(prev => ({
      ...prev,
      [factor]: parseInt(value)
    }));
  };

  const handleThresholdChange = (level, value) => {
    setAlertThresholds(prev => ({
      ...prev,
      [level]: parseInt(value)
    }));
  };

  const handleFeatureToggle = (feature, checked) => {
    setEnabledFeatures(prev => ({
      ...prev,
      [feature]: checked
    }));
  };

  const handleSaveConfiguration = () => {
    // Mock save functionality
    console.log('Saving configuration:', {
      modelSettings,
      environmentalWeights,
      alertThresholds,
      enabledFeatures
    });
    
    // Show success message (in real app, this would be a toast notification)
    alert('Configuration saved successfully!');
  };

  const handleResetToDefaults = () => {
    setModelSettings({
      selectedModel: 'ensemble',
      sensitivity: 75,
      confidenceThreshold: 85,
      predictionHorizon: '7d',
      updateFrequency: '1h'
    });
    
    setEnvironmentalWeights({
      rainfall: 85,
      temperature: 60,
      vibration: 80,
      moisture: 70,
      wind: 45
    });
    
    setAlertThresholds({
      lowRisk: 25,
      mediumRisk: 50,
      highRisk: 75,
      criticalRisk: 90
    });
    
    setEnabledFeatures({
      realTimeUpdates: true,
      historicalValidation: true,
      multiModelEnsemble: true,
      weatherIntegration: true,
      seismicMonitoring: false,
      droneImagery: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Model Configuration */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Model Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Configure AI model parameters and prediction settings
            </p>
          </div>
          <Icon name="Settings" size={24} className="text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select
              label="Prediction Model"
              description="Choose the AI model for risk prediction"
              options={modelOptions}
              value={modelSettings?.selectedModel}
              onChange={(value) => handleModelSettingChange('selectedModel', value)}
            />

            <Select
              label="Prediction Horizon"
              description="Time range for risk forecasting"
              options={horizonOptions}
              value={modelSettings?.predictionHorizon}
              onChange={(value) => handleModelSettingChange('predictionHorizon', value)}
            />

            <Select
              label="Update Frequency"
              description="How often predictions are recalculated"
              options={frequencyOptions}
              value={modelSettings?.updateFrequency}
              onChange={(value) => handleModelSettingChange('updateFrequency', value)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Model Sensitivity: {modelSettings?.sensitivity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={modelSettings?.sensitivity}
                onChange={(e) => handleModelSettingChange('sensitivity', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confidence Threshold: {modelSettings?.confidenceThreshold}%
              </label>
              <input
                type="range"
                min="50"
                max="99"
                value={modelSettings?.confidenceThreshold}
                onChange={(e) => handleModelSettingChange('confidenceThreshold', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Lower Confidence</span>
                <span>Higher Confidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Environmental Factor Weights */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Environmental Factor Weights</h3>
            <p className="text-sm text-muted-foreground">
              Adjust the influence of different environmental factors on predictions
            </p>
          </div>
          <Icon name="Sliders" size={24} className="text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(environmentalWeights)?.map(([factor, weight]) => (
            <div key={factor} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground capitalize">
                  {factor === 'rainfall' && <Icon name="CloudRain" size={16} className="inline mr-2" />}
                  {factor === 'temperature' && <Icon name="Thermometer" size={16} className="inline mr-2" />}
                  {factor === 'vibration' && <Icon name="Activity" size={16} className="inline mr-2" />}
                  {factor === 'moisture' && <Icon name="Droplets" size={16} className="inline mr-2" />}
                  {factor === 'wind' && <Icon name="Wind" size={16} className="inline mr-2" />}
                  {factor}
                </label>
                <span className="text-sm font-medium text-foreground">{weight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weight}
                onChange={(e) => handleWeightChange(factor, e?.target?.value)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Alert Thresholds */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Alert Thresholds</h3>
            <p className="text-sm text-muted-foreground">
              Set risk probability thresholds for different alert levels
            </p>
          </div>
          <Icon name="AlertTriangle" size={24} className="text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Low Risk Threshold"
              type="number"
              value={alertThresholds?.lowRisk}
              onChange={(e) => handleThresholdChange('lowRisk', e?.target?.value)}
              description="Minimum probability for low risk alerts"
              min="0"
              max="100"
            />

            <Input
              label="Medium Risk Threshold"
              type="number"
              value={alertThresholds?.mediumRisk}
              onChange={(e) => handleThresholdChange('mediumRisk', e?.target?.value)}
              description="Minimum probability for medium risk alerts"
              min="0"
              max="100"
            />
          </div>

          <div className="space-y-4">
            <Input
              label="High Risk Threshold"
              type="number"
              value={alertThresholds?.highRisk}
              onChange={(e) => handleThresholdChange('highRisk', e?.target?.value)}
              description="Minimum probability for high risk alerts"
              min="0"
              max="100"
            />

            <Input
              label="Critical Risk Threshold"
              type="number"
              value={alertThresholds?.criticalRisk}
              onChange={(e) => handleThresholdChange('criticalRisk', e?.target?.value)}
              description="Minimum probability for critical risk alerts"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>
      {/* Feature Toggles */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Feature Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Enable or disable specific prediction features and data sources
            </p>
          </div>
          <Icon name="ToggleLeft" size={24} className="text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(enabledFeatures)?.map(([feature, enabled]) => (
            <Checkbox
              key={feature}
              label={feature?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase())}
              checked={enabled}
              onChange={(e) => handleFeatureToggle(feature, e?.target?.checked)}
              description={
                feature === 'realTimeUpdates' ? 'Continuous model updates with live data' :
                feature === 'historicalValidation' ? 'Validate predictions against historical events' :
                feature === 'multiModelEnsemble' ? 'Combine multiple AI models for better accuracy' :
                feature === 'weatherIntegration' ? 'Include weather forecast data in predictions' :
                feature === 'seismicMonitoring' ? 'Monitor seismic activity for enhanced predictions' :
                feature === 'droneImagery' ? 'Process drone imagery for visual analysis' :
                'Feature configuration option'
              }
            />
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          variant="outline"
          onClick={handleResetToDefaults}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset to Defaults
        </Button>
        
        <Button
          variant="default"
          onClick={handleSaveConfiguration}
          iconName="Save"
          iconPosition="left"
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default PredictionConfiguration;