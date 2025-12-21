import React from 'react';
import Icon from '../../../components/AppIcon';

const DataQualityPanel = ({ qualityMetrics }) => {
  const getQualityColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getQualityBgColor = (score) => {
    if (score >= 90) return 'bg-success';
    if (score >= 70) return 'bg-warning';
    return 'bg-error';
  };

  const getQualityIcon = (score) => {
    if (score >= 90) return 'CheckCircle';
    if (score >= 70) return 'AlertTriangle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Data Quality Assessment
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            Overall Score: {qualityMetrics?.overallScore}%
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {qualityMetrics?.metrics?.map((metric, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getQualityIcon(metric?.score)} 
                  size={16} 
                  className={getQualityColor(metric?.score)} 
                />
                <span className="text-sm font-medium text-foreground">
                  {metric?.name}
                </span>
              </div>
              <span className={`text-sm font-semibold ${getQualityColor(metric?.score)}`}>
                {metric?.score}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getQualityBgColor(metric?.score)}`}
                style={{ width: `${metric?.score}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {metric?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h4 className="text-base font-medium text-foreground">
          Quality Issues & Recommendations
        </h4>
        
        {qualityMetrics?.issues?.length === 0 ? (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm">No quality issues detected</span>
          </div>
        ) : (
          <div className="space-y-3">
            {qualityMetrics?.issues?.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                <Icon 
                  name={issue?.severity === 'high' ? 'AlertCircle' : issue?.severity === 'medium' ? 'AlertTriangle' : 'Info'} 
                  size={16} 
                  className={
                    issue?.severity === 'high' ? 'text-error' : 
                    issue?.severity === 'medium'? 'text-warning' : 'text-primary'
                  }
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {issue?.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {issue?.description}
                  </p>
                  {issue?.recommendation && (
                    <p className="text-xs text-primary mt-2">
                      Recommendation: {issue?.recommendation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataQualityPanel;