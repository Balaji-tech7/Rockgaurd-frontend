import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationStatus = ({ integrationData, onRefresh, onViewDetails }) => {
  const getIntegrationIcon = (type) => {
    switch (type) {
      case 'drone_imagery':
        return 'Camera';
      case 'dem_data':
        return 'Mountain';
      case 'sensor_data':
        return 'Activity';
      case 'environmental':
        return 'Cloud';
      case 'geotechnical':
        return 'Layers';
      default:
        return 'Database';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'syncing':
        return 'text-primary bg-primary/10';
      case 'error':
        return 'text-error bg-error/10';
      case 'inactive':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'syncing':
        return <Icon name="RefreshCw" size={16} className="text-primary animate-spin" />;
      case 'error':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      case 'inactive':
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Integration Status
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor data integration with AI prediction models
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onRefresh}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh Status
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {integrationData?.sources?.map((source) => (
          <div key={source?.id} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon 
                    name={getIntegrationIcon(source?.type)} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {source?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {source?.description}
                  </p>
                </div>
              </div>
              {getStatusIcon(source?.status)}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Status</span>
                <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(source?.status)}`}>
                  {source?.status?.charAt(0)?.toUpperCase() + source?.status?.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Last Sync</span>
                <span className="text-foreground">{source?.lastSync}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Records</span>
                <span className="text-foreground">{source?.recordCount?.toLocaleString()}</span>
              </div>
              
              {source?.syncProgress && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Sync Progress</span>
                    <span>{source?.syncProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${source?.syncProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Model Integration Status */}
      <div className="border-t border-border pt-6">
        <h4 className="text-base font-medium text-foreground mb-4">
          AI Model Integration
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrationData?.models?.map((model) => (
            <div key={model?.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Brain" size={20} className="text-primary" />
                <div>
                  <h5 className="text-sm font-medium text-foreground">
                    {model?.name}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {model?.lastUpdate}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <p className="text-sm font-medium text-foreground">
                    {model?.accuracy}%
                  </p>
                </div>
                {getStatusIcon(model?.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Integration Health Summary */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={20} className="text-primary" />
          <div>
            <h5 className="text-sm font-medium text-foreground">
              Integration Health: {integrationData?.healthScore}%
            </h5>
            <p className="text-xs text-muted-foreground">
              {integrationData?.activeConnections} of {integrationData?.totalConnections} data sources active
            </p>
          </div>
        </div>
        
        <div className="mt-3 w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${integrationData?.healthScore}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;