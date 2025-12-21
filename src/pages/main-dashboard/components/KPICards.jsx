import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICards = ({ selectedSite }) => {
  // Mock KPI data
  const kpiData = [
    {
      id: 1,
      title: 'Active Alerts',
      value: 7,
      change: '+2',
      changeType: 'increase',
      icon: 'AlertTriangle',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Critical alerts requiring attention'
    },
    {
      id: 2,
      title: 'Prediction Accuracy',
      value: '94.2%',
      change: '+1.3%',
      changeType: 'increase',
      icon: 'Target',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'AI model performance this week'
    },
    {
      id: 3,
      title: 'Monitored Zones',
      value: 24,
      change: '+3',
      changeType: 'increase',
      icon: 'MapPin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active monitoring locations'
    },
    {
      id: 4,
      title: 'Sensor Status',
      value: '98.5%',
      change: '-0.2%',
      changeType: 'decrease',
      icon: 'Activity',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Operational sensor network'
    }
  ];

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (changeType) => {
    return changeType === 'increase' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData?.map((kpi) => (
        <div key={kpi?.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-1 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${kpi?.bgColor} flex items-center justify-center`}>
              <Icon name={kpi?.icon} size={24} className={kpi?.color} />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(kpi?.changeType)}`}>
              <Icon name={getChangeIcon(kpi?.changeType)} size={16} />
              <span className="text-sm font-medium">{kpi?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{kpi?.title}</h3>
            <div className="text-2xl font-heading font-bold text-foreground">{kpi?.value}</div>
            <p className="text-xs text-muted-foreground">{kpi?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;