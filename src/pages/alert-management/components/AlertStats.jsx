import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertStats = ({ alerts }) => {
  const stats = {
    total: alerts?.length,
    active: alerts?.filter(a => a?.status === 'Active')?.length,
    acknowledged: alerts?.filter(a => a?.status === 'Acknowledged')?.length,
    investigating: alerts?.filter(a => a?.status === 'Investigating')?.length,
    resolved: alerts?.filter(a => a?.status === 'Resolved')?.length,
    critical: alerts?.filter(a => a?.severity === 'Critical')?.length,
    high: alerts?.filter(a => a?.severity === 'High')?.length,
    medium: alerts?.filter(a => a?.severity === 'Medium')?.length,
    low: alerts?.filter(a => a?.severity === 'Low')?.length
  };

  const statCards = [
    {
      title: 'Total Alerts',
      value: stats?.total,
      icon: 'AlertTriangle',
      color: 'text-foreground',
      bgColor: 'bg-card'
    },
    {
      title: 'Active',
      value: stats?.active,
      icon: 'AlertCircle',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Acknowledged',
      value: stats?.acknowledged,
      icon: 'CheckCircle',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Investigating',
      value: stats?.investigating,
      icon: 'Search',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Resolved',
      value: stats?.resolved,
      icon: 'CheckCircle2',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const severityCards = [
    {
      title: 'Critical',
      value: stats?.critical,
      icon: 'AlertTriangle',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'High',
      value: stats?.high,
      icon: 'AlertTriangle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Medium',
      value: stats?.medium,
      icon: 'AlertTriangle',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Low',
      value: stats?.low,
      icon: 'AlertTriangle',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Status Overview */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Alert Status Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards?.map((stat) => (
            <div key={stat?.title} className={`${stat?.bgColor} rounded-lg border border-border p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
                  <p className={`text-2xl font-bold ${stat?.color}`}>{stat?.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat?.bgColor === 'bg-card' ? 'bg-muted' : 'bg-white/50'}`}>
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Severity Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Severity Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {severityCards?.map((stat) => (
            <div key={stat?.title} className={`${stat?.bgColor} rounded-lg border border-border p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
                  <p className={`text-xl font-bold ${stat?.color}`}>{stat?.value}</p>
                </div>
                <div className="p-2 bg-white/50 rounded-lg">
                  <Icon name={stat?.icon} size={18} className={stat?.color} />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-white/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${stat?.color?.replace('text-', 'bg-')}`}
                    style={{
                      width: `${stats?.total > 0 ? (stat?.value / stats?.total) * 100 : 0}%`
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.total > 0 ? Math.round((stat?.value / stats?.total) * 100) : 0}% of total
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertStats;