import React from 'react';
import Icon from '../../../components/AppIcon';

const SensorCard = ({ sensor }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-success bg-success/10 border-success/20';
      case 'offline':
        return 'text-error bg-error/10 border-error/20';
      case 'maintenance':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return 'CheckCircle';
      case 'offline':
        return 'XCircle';
      case 'maintenance':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-error';
      case 'down':
        return 'text-success';
      case 'stable':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const isThresholdExceeded = sensor?.currentValue > sensor?.threshold;

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={sensor?.icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{sensor?.name}</h3>
            <p className="text-sm text-muted-foreground">{sensor?.location}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(sensor?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(sensor?.status)} size={12} />
            <span className="capitalize">{sensor?.status}</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-heading font-bold ${isThresholdExceeded ? 'text-error' : 'text-foreground'}`}>
                {sensor?.currentValue}
              </span>
              <span className="text-sm text-muted-foreground">{sensor?.unit}</span>
              <Icon 
                name={getTrendIcon(sensor?.trend)} 
                size={16} 
                className={getTrendColor(sensor?.trend)} 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {sensor?.lastUpdated}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Threshold</p>
            <p className="text-sm font-medium text-foreground">{sensor?.threshold} {sensor?.unit}</p>
          </div>
        </div>

        {isThresholdExceeded && (
          <div className="flex items-center space-x-2 p-2 bg-error/10 border border-error/20 rounded-md">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm text-error font-medium">Threshold exceeded</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Signal: {sensor?.signalStrength}%</span>
          <span>Battery: {sensor?.batteryLevel}%</span>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;