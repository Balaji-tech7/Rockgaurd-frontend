import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataQualityPanel = ({ qualityMetrics, alerts }) => {
  const getQualityColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10 border-success/20';
    if (score >= 70) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getQualityIcon = (score) => {
    if (score >= 90) return 'CheckCircle';
    if (score >= 70) return 'AlertTriangle';
    return 'XCircle';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'medium':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'low':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Quality Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Data Quality Overview</h3>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {qualityMetrics?.map((metric) => (
            <div key={metric?.id} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-3 ${getQualityColor(metric?.score)}`}>
                <Icon name={getQualityIcon(metric?.score)} size={24} />
              </div>
              <h4 className="font-medium text-foreground mb-1">{metric?.name}</h4>
              <div className="text-2xl font-heading font-bold text-foreground mb-1">
                {metric?.score}%
              </div>
              <p className="text-xs text-muted-foreground">{metric?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Data Quality Alerts */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-foreground">Data Quality Alerts</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {alerts?.filter(a => !a?.resolved)?.length} active alerts
              </span>
              <Button variant="outline" size="sm" iconName="Filter">
                Filter
              </Button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {alerts?.length > 0 ? (
            alerts?.map((alert) => (
              <div key={alert?.id} className="p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ${getSeverityColor(alert?.severity)}`}>
                    <Icon 
                      name={alert?.severity === 'critical' ? 'AlertTriangle' : alert?.severity === 'high' ? 'AlertCircle' : 'Info'} 
                      size={16} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground truncate">{alert?.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(alert?.severity)}`}>
                          {alert?.severity}
                        </span>
                        {alert?.resolved && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Sensor: {alert?.sensorName}</span>
                      <span>{alert?.timestamp}</span>
                    </div>
                    {alert?.recommendation && (
                      <div className="mt-2 p-2 bg-accent/10 border border-accent/20 rounded-md">
                        <p className="text-xs text-accent font-medium">Recommendation:</p>
                        <p className="text-xs text-foreground">{alert?.recommendation}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {!alert?.resolved && (
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
              <p className="text-muted-foreground">No data quality alerts</p>
              <p className="text-sm text-muted-foreground">All sensors are operating within normal parameters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataQualityPanel;