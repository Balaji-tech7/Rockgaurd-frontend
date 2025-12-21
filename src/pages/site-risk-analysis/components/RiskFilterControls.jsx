import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const RiskFilterControls = ({ onFiltersChange, currentFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    riskLevels: ['critical', 'high'],
    timeframe: '24h',
    confidenceThreshold: 0.7,
    geologicalZones: ['north-slope', 'east-wall'],
    sensorTypes: ['displacement', 'strain'],
    environmentalFactors: ['rainfall', 'temperature'],
    predictionModel: 'ensemble',
    ...currentFilters
  });

  const riskLevelOptions = [
    { value: 'critical', label: 'Critical (90%+)', color: '#DC2626' },
    { value: 'high', label: 'High (70-89%)', color: '#EA580C' },
    { value: 'medium', label: 'Medium (40-69%)', color: '#D97706' },
    { value: 'low', label: 'Low (<40%)', color: '#059669' }
  ];

  const timeframeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const geologicalZoneOptions = [
    { value: 'north-slope', label: 'North Slope Section A' },
    { value: 'east-wall', label: 'East Wall Section B' },
    { value: 'south-bench', label: 'South Bench Level 3' },
    { value: 'west-slope', label: 'West Slope Section C' },
    { value: 'central-pit', label: 'Central Pit Area' }
  ];

  const sensorTypeOptions = [
    { value: 'displacement', label: 'Displacement Sensors' },
    { value: 'strain', label: 'Strain Gauges' },
    { value: 'tilt', label: 'Tiltmeters' },
    { value: 'pressure', label: 'Pore Pressure' },
    { value: 'vibration', label: 'Vibration Monitors' }
  ];

  const environmentalFactorOptions = [
    { value: 'rainfall', label: 'Rainfall Data' },
    { value: 'temperature', label: 'Temperature' },
    { value: 'wind', label: 'Wind Speed' },
    { value: 'humidity', label: 'Humidity' },
    { value: 'pressure', label: 'Atmospheric Pressure' }
  ];

  const predictionModelOptions = [
    { value: 'ensemble', label: 'Ensemble Model' },
    { value: 'neural-network', label: 'Neural Network' },
    { value: 'random-forest', label: 'Random Forest' },
    { value: 'svm', label: 'Support Vector Machine' },
    { value: 'gradient-boost', label: 'Gradient Boosting' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleMultiSelectChange = (key, value, checked) => {
    const currentValues = filters?.[key] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues?.filter(v => v !== value);
    }
    
    handleFilterChange(key, newValues);
  };

  const resetFilters = () => {
    const defaultFilters = {
      riskLevels: ['critical', 'high'],
      timeframe: '24h',
      confidenceThreshold: 0.7,
      geologicalZones: ['north-slope', 'east-wall'],
      sensorTypes: ['displacement', 'strain'],
      environmentalFactors: ['rainfall', 'temperature'],
      predictionModel: 'ensemble'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.riskLevels?.length > 0) count++;
    if (filters?.geologicalZones?.length > 0) count++;
    if (filters?.sensorTypes?.length > 0) count++;
    if (filters?.environmentalFactors?.length > 0) count++;
    if (filters?.confidenceThreshold !== 0.7) count++;
    if (filters?.timeframe !== '24h') count++;
    if (filters?.predictionModel !== 'ensemble') count++;
    return count;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Risk Analysis Filters
          </h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select
          label="Timeframe"
          options={timeframeOptions}
          value={filters?.timeframe}
          onChange={(value) => handleFilterChange('timeframe', value)}
        />
        
        <Select
          label="Prediction Model"
          options={predictionModelOptions}
          value={filters?.predictionModel}
          onChange={(value) => handleFilterChange('predictionModel', value)}
        />
        
        <Input
          label="Confidence Threshold"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={filters?.confidenceThreshold}
          onChange={(e) => handleFilterChange('confidenceThreshold', parseFloat(e?.target?.value))}
          description={`${Math.round(filters?.confidenceThreshold * 100)}% minimum confidence`}
        />
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 pt-4 border-t border-border">
          {/* Risk Levels */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Risk Levels</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {riskLevelOptions?.map(option => (
                <Checkbox
                  key={option?.value}
                  label={
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: option?.color }}
                      />
                      <span>{option?.label}</span>
                    </div>
                  }
                  checked={filters?.riskLevels?.includes(option?.value)}
                  onChange={(e) => handleMultiSelectChange('riskLevels', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Geological Zones */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Geological Zones</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {geologicalZoneOptions?.map(option => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.geologicalZones?.includes(option?.value)}
                  onChange={(e) => handleMultiSelectChange('geologicalZones', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Sensor Types */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Sensor Types</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sensorTypeOptions?.map(option => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.sensorTypes?.includes(option?.value)}
                  onChange={(e) => handleMultiSelectChange('sensorTypes', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Environmental Factors */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Environmental Factors</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {environmentalFactorOptions?.map(option => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.environmentalFactors?.includes(option?.value)}
                  onChange={(e) => handleMultiSelectChange('environmentalFactors', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Applied Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground mb-2">Applied Filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters?.riskLevels?.length > 0 && (
              <span className="px-2 py-1 text-xs bg-muted rounded-full">
                Risk: {filters?.riskLevels?.length} selected
              </span>
            )}
            {filters?.geologicalZones?.length > 0 && (
              <span className="px-2 py-1 text-xs bg-muted rounded-full">
                Zones: {filters?.geologicalZones?.length} selected
              </span>
            )}
            {filters?.sensorTypes?.length > 0 && (
              <span className="px-2 py-1 text-xs bg-muted rounded-full">
                Sensors: {filters?.sensorTypes?.length} selected
              </span>
            )}
            {filters?.environmentalFactors?.length > 0 && (
              <span className="px-2 py-1 text-xs bg-muted rounded-full">
                Environmental: {filters?.environmentalFactors?.length} selected
              </span>
            )}
            <span className="px-2 py-1 text-xs bg-muted rounded-full">
              Timeframe: {timeframeOptions?.find(t => t?.value === filters?.timeframe)?.label}
            </span>
            <span className="px-2 py-1 text-xs bg-muted rounded-full">
              Confidence: ≥{Math.round(filters?.confidenceThreshold * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskFilterControls;