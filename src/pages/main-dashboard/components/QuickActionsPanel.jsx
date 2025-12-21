import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Site Risk Analysis',
      description: 'Detailed geological risk assessment',
      icon: 'TrendingUp',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/site-risk-analysis',
      badge: null
    },
    {
      id: 2,
      title: 'Alert Management',
      description: 'Manage active alerts and notifications',
      icon: 'AlertTriangle',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      path: '/alert-management',
      badge: '7 Active'
    },
    {
      id: 3,
      title: 'Sensor Monitoring',
      description: 'Real-time sensor data and status',
      icon: 'Activity',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      path: '/sensor-data-monitoring',
      badge: '24 Online'
    },
    {
      id: 4,
      title: 'Predictive Analytics',
      description: 'AI-powered risk predictions',
      icon: 'BarChart3',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      path: '/predictive-analytics',
      badge: '94.2% Accuracy'
    },
    {
      id: 5,
      title: 'Data Import',
      description: 'Upload and process new data',
      icon: 'Upload',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      path: '/data-import-management',
      badge: null
    },
    {
      id: 6,
      title: 'Emergency Protocol',
      description: 'Activate emergency procedures',
      icon: 'Shield',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      path: '#',
      badge: 'Critical',
      isEmergency: true
    }
  ];

  const handleEmergencyAction = () => {
    // Mock emergency protocol activation
    alert('Emergency protocol would be activated. This is a demo.');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Access key functions and emergency protocols</p>
        </div>
        <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
          Customize
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div key={action?.id}>
            {action?.isEmergency ? (
              <button
                onClick={handleEmergencyAction}
                className={`w-full p-4 rounded-lg border-2 border-red-200 hover:border-red-300 transition-all duration-200 hover:shadow-elevation-1 text-left ${
                  action?.isEmergency ? 'bg-red-50 hover:bg-red-100' : 'bg-card hover:bg-muted'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${action?.bgColor} flex items-center justify-center`}>
                    <Icon name={action?.icon} size={20} className={action?.color} />
                  </div>
                  {action?.badge && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      action?.isEmergency ? 'bg-red-200 text-red-800' : 'bg-muted text-muted-foreground'
                    }`}>
                      {action?.badge}
                    </span>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-foreground">{action?.title}</h3>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                </div>
                
                <div className="mt-3 flex items-center justify-end">
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                </div>
              </button>
            ) : (
              <Link
                to={action?.path}
                className="block w-full p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-200 hover:shadow-elevation-1 bg-card hover:bg-muted"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${action?.bgColor} flex items-center justify-center`}>
                    <Icon name={action?.icon} size={20} className={action?.color} />
                  </div>
                  {action?.badge && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                      {action?.badge}
                    </span>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-foreground">{action?.title}</h3>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                </div>
                
                <div className="mt-3 flex items-center justify-end">
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
      {/* Emergency Contact */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Icon name="Phone" size={16} className="text-red-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-red-900">Emergency Hotline</div>
              <div className="text-xs text-red-700">24/7 Safety Response Team</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;