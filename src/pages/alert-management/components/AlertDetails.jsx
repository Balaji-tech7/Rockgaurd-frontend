import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertDetails = ({ alert, isOpen, onClose, onAcknowledge, onEscalate }) => {
  if (!isOpen || !alert) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-red-600 bg-red-50';
      case 'Acknowledged': return 'text-yellow-600 bg-yellow-50';
      case 'Resolved': return 'text-green-600 bg-green-50';
      case 'Investigating': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getRecommendedActions = (severity, riskType) => {
    const actions = {
      'Critical': [
        'Immediate evacuation of affected area',
        'Deploy emergency response team',
        'Establish safety perimeter',
        'Contact emergency services',
        'Initiate emergency communication protocol'
      ],
      'High': [
        'Restrict access to high-risk zones',
        'Increase monitoring frequency',
        'Deploy additional safety personnel',
        'Review evacuation procedures',
        'Notify senior management'
      ],
      'Medium': [
        'Enhanced monitoring of affected area',
        'Review safety protocols',
        'Schedule detailed inspection',
        'Update risk assessment',
        'Brief operational teams'
      ],
      'Low': [
        'Continue routine monitoring',
        'Document findings',
        'Schedule preventive maintenance',
        'Update monitoring logs'
      ]
    };
    return actions?.[severity] || [];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Alert Details</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="p-6 space-y-6">
            {/* Alert Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(alert?.status)}`}>
                    {alert?.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-foreground">{alert?.riskType}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{alert?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{formatTimestamp(alert?.timestamp)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {alert?.status === 'Active' && (
                  <Button
                    variant="outline"
                    onClick={() => onAcknowledge(alert?.id)}
                    iconName="Check"
                    iconSize={16}
                  >
                    Acknowledge
                  </Button>
                )}
                {(alert?.status === 'Active' || alert?.status === 'Acknowledged') && (
                  <Button
                    variant="secondary"
                    onClick={() => onEscalate(alert?.id)}
                    iconName="ArrowUp"
                    iconSize={16}
                  >
                    Escalate
                  </Button>
                )}
              </div>
            </div>

            {/* Alert Description */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {alert?.description}
              </p>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Technical Parameters</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Risk Probability</span>
                    <span className="text-sm font-medium text-foreground">{alert?.riskProbability}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Confidence Level</span>
                    <span className="text-sm font-medium text-foreground">{alert?.confidenceLevel}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Affected Area</span>
                    <span className="text-sm font-medium text-foreground">{alert?.affectedArea}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Sensor Source</span>
                    <span className="text-sm font-medium text-foreground">{alert?.sensorSource}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Environmental Conditions</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Weather</span>
                    <span className="text-sm font-medium text-foreground">{alert?.weather}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Temperature</span>
                    <span className="text-sm font-medium text-foreground">{alert?.temperature}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Wind Speed</span>
                    <span className="text-sm font-medium text-foreground">{alert?.windSpeed}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Rainfall</span>
                    <span className="text-sm font-medium text-foreground">{alert?.rainfall}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Recommended Actions</h4>
              <div className="space-y-2">
                {getRecommendedActions(alert?.severity, alert?.riskType)?.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm text-foreground">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response History */}
            {alert?.responseHistory && alert?.responseHistory?.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-4">Response History</h4>
                <div className="space-y-3">
                  {alert?.responseHistory?.map((response, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{response?.user}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(response?.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{response?.action}</div>
                        {response?.notes && (
                          <div className="text-sm text-foreground bg-muted/30 rounded p-2">
                            {response?.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Location Map</h4>
              <div className="bg-muted/30 rounded-lg overflow-hidden" style={{ height: '300px' }}>
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={alert?.location}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${alert?.coordinates?.lat || -33.8688},${alert?.coordinates?.lng || 151.2093}&z=16&output=embed`}
                  className="border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;