import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAlertsPanel = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Mock recent alerts data
  const recentAlerts = [
    {
      id: 1,
      location: 'North Slope A',
      severity: 'critical',
      type: 'Rockfall Risk',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      probability: 92,
      description: 'High probability rockfall detected in mining zone A-7',
      status: 'active',
      assignedTo: 'Safety Team Alpha'
    },
    {
      id: 2,
      location: 'West Bench D',
      severity: 'high',
      type: 'Slope Instability',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      probability: 78,
      description: 'Unusual displacement patterns detected in sensor array',
      status: 'investigating',
      assignedTo: 'Geotechnical Team'
    },
    {
      id: 3,
      location: 'East Wall B',
      severity: 'medium',
      type: 'Environmental Alert',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      probability: 45,
      description: 'Heavy rainfall increasing slope saturation levels',
      status: 'monitoring',
      assignedTo: 'Operations Team'
    },
    {
      id: 4,
      location: 'South Pit C',
      severity: 'low',
      type: 'Sensor Maintenance',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      probability: 0,
      description: 'Routine sensor calibration completed successfully',
      status: 'resolved',
      assignedTo: 'Maintenance Team'
    },
    {
      id: 5,
      location: 'Central Area E',
      severity: 'medium',
      type: 'Vibration Alert',
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      probability: 52,
      description: 'Increased vibration levels from blasting operations',
      status: 'acknowledged',
      assignedTo: 'Blast Operations'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-700 bg-red-100';
      case 'investigating': return 'text-orange-700 bg-orange-100';
      case 'monitoring': return 'text-blue-700 bg-blue-100';
      case 'acknowledged': return 'text-purple-700 bg-purple-100';
      case 'resolved': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Recent Alerts</h2>
          <p className="text-sm text-muted-foreground">Latest safety notifications and system updates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
            Filter
          </Button>
          <Link to="/alert-management">
            <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recentAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-elevation-1 ${
              selectedAlert === alert?.id ? 'ring-2 ring-primary ring-opacity-50' : ''
            }`}
            onClick={() => setSelectedAlert(selectedAlert === alert?.id ? null : alert?.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${getSeverityColor(alert?.severity)}`}>
                  <Icon name={getSeverityIcon(alert?.severity)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-medium text-foreground truncate">{alert?.type}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert?.status)}`}>
                      {alert?.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{alert?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{formatTimeAgo(alert?.timestamp)}</span>
                    </div>
                    {alert?.probability > 0 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Percent" size={12} />
                        <span>{alert?.probability}% risk</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-foreground">{alert?.description}</p>
                  
                  {selectedAlert === alert?.id && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          Assigned to: <span className="font-medium text-foreground">{alert?.assignedTo}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="xs" iconName="Eye">
                            View Details
                          </Button>
                          <Button variant="outline" size="xs" iconName="MessageSquare">
                            Add Note
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <Icon name="MoreVertical" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Quick Actions</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="AlertTriangle" iconPosition="left">
              Emergency Protocol
            </Button>
            <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
              Create Alert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentAlertsPanel;