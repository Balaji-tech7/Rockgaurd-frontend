import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ActionPanel = ({ selectedRiskZone, onActionTaken }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [reportFormat, setReportFormat] = useState('pdf');
  const [alertThreshold, setAlertThreshold] = useState(0.7);
  const [maintenanceType, setMaintenanceType] = useState('inspection');
  const [scheduledDate, setScheduledDate] = useState('');

  const reportFormatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data Export' },
    { value: 'json', label: 'JSON Data Export' }
  ];

  const maintenanceTypeOptions = [
    { value: 'inspection', label: 'Visual Inspection' },
    { value: 'stabilization', label: 'Slope Stabilization' },
    { value: 'drainage', label: 'Drainage Installation' },
    { value: 'monitoring', label: 'Enhanced Monitoring' },
    { value: 'access-restriction', label: 'Access Restriction' }
  ];

  const actionItems = [
    {
      id: 'generate-report',
      title: 'Generate Risk Report',
      description: 'Create comprehensive analysis report with current risk assessments',
      icon: 'FileText',
      color: 'primary'
    },
    {
      id: 'configure-alerts',
      title: 'Configure Alert Thresholds',
      description: 'Set custom alert thresholds for risk probability notifications',
      icon: 'Bell',
      color: 'warning'
    },
    {
      id: 'schedule-maintenance',
      title: 'Schedule Maintenance',
      description: 'Plan preventive maintenance based on current risk assessment',
      icon: 'Calendar',
      color: 'success'
    },
    {
      id: 'emergency-protocol',
      title: 'Emergency Response',
      description: 'Initiate emergency response protocols for critical risk zones',
      icon: 'AlertTriangle',
      color: 'error'
    }
  ];

  const recommendations = selectedRiskZone ? [
    {
      priority: 'high',
      action: 'Immediate evacuation of personnel from high-risk zone',
      timeframe: 'Within 1 hour',
      reason: `Risk probability of ${Math.round(selectedRiskZone?.probability * 100)}% exceeds critical threshold`
    },
    {
      priority: 'medium',
      action: 'Install additional displacement sensors',
      timeframe: 'Within 24 hours',
      reason: 'Enhanced monitoring required for accurate prediction'
    },
    {
      priority: 'medium',
      action: 'Implement drainage system improvements',
      timeframe: 'Within 7 days',
      reason: 'Reduce water infiltration to improve slope stability'
    },
    {
      priority: 'low',
      action: 'Schedule comprehensive geological survey',
      timeframe: 'Within 30 days',
      reason: 'Update geological model with recent data'
    }
  ] : [];

  const handleActionClick = (actionId) => {
    setActiveAction(activeAction === actionId ? null : actionId);
  };

  const handleGenerateReport = () => {
    // Mock report generation
    const reportData = {
      format: reportFormat,
      timestamp: new Date()?.toISOString(),
      site: 'Site Alpha',
      riskZone: selectedRiskZone?.name || 'All Zones'
    };
    
    onActionTaken?.('report-generated', reportData);
    setActiveAction(null);
    
    // Simulate download
    const fileName = `risk-analysis-${Date.now()}.${reportFormat}`;
    console.log(`Generating report: ${fileName}`);
  };

  const handleConfigureAlerts = () => {
    const alertConfig = {
      threshold: alertThreshold,
      timestamp: new Date()?.toISOString(),
      zone: selectedRiskZone?.name || 'All Zones'
    };
    
    onActionTaken?.('alerts-configured', alertConfig);
    setActiveAction(null);
  };

  const handleScheduleMaintenance = () => {
    if (!scheduledDate) return;
    
    const maintenanceData = {
      type: maintenanceType,
      scheduledDate,
      zone: selectedRiskZone?.name || 'All Zones',
      timestamp: new Date()?.toISOString()
    };
    
    onActionTaken?.('maintenance-scheduled', maintenanceData);
    setActiveAction(null);
    setScheduledDate('');
  };

  const handleEmergencyProtocol = () => {
    const emergencyData = {
      zone: selectedRiskZone?.name || 'All Zones',
      riskLevel: selectedRiskZone?.riskLevel || 'high',
      timestamp: new Date()?.toISOString()
    };
    
    onActionTaken?.('emergency-initiated', emergencyData);
    setActiveAction(null);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-error',
      'medium': 'text-warning',
      'low': 'text-success'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  const getPriorityBg = (priority) => {
    const colors = {
      'high': 'bg-error/10',
      'medium': 'bg-warning/10',
      'low': 'bg-success/10'
    };
    return colors?.[priority] || 'bg-muted';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Action Panel
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedRiskZone 
              ? `Actions for ${selectedRiskZone?.name}`
              : 'Select a risk zone to view specific actions'
            }
          </p>
        </div>
        
        {selectedRiskZone && (
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedRiskZone?.riskLevel === 'critical' ? 'bg-error text-error-foreground' :
            selectedRiskZone?.riskLevel === 'high' ? 'bg-warning text-warning-foreground' :
            selectedRiskZone?.riskLevel === 'medium' ? 'bg-accent text-accent-foreground' :
            'bg-success text-success-foreground'
          }`}>
            {selectedRiskZone?.riskLevel?.toUpperCase()} RISK
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {actionItems?.map(item => (
          <div key={item?.id} className="space-y-3">
            <Button
              variant={activeAction === item?.id ? 'default' : 'outline'}
              className="w-full justify-start h-auto p-4"
              onClick={() => handleActionClick(item?.id)}
            >
              <div className="flex items-start space-x-3">
                <Icon name={item?.icon} size={20} className="mt-0.5" />
                <div className="text-left">
                  <div className="font-medium">{item?.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item?.description}
                  </div>
                </div>
              </div>
            </Button>

            {/* Action Forms */}
            {activeAction === item?.id && (
              <div className="bg-muted rounded-lg p-4 space-y-4">
                {item?.id === 'generate-report' && (
                  <>
                    <Select
                      label="Report Format"
                      options={reportFormatOptions}
                      value={reportFormat}
                      onChange={setReportFormat}
                    />
                    <Button onClick={handleGenerateReport} className="w-full">
                      <Icon name="Download" size={16} className="mr-2" />
                      Generate & Download Report
                    </Button>
                  </>
                )}

                {item?.id === 'configure-alerts' && (
                  <>
                    <Input
                      label="Alert Threshold"
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={alertThreshold}
                      onChange={(e) => setAlertThreshold(parseFloat(e?.target?.value))}
                      description={`Alert when risk probability exceeds ${Math.round(alertThreshold * 100)}%`}
                    />
                    <Button onClick={handleConfigureAlerts} className="w-full">
                      <Icon name="Save" size={16} className="mr-2" />
                      Save Alert Configuration
                    </Button>
                  </>
                )}

                {item?.id === 'schedule-maintenance' && (
                  <>
                    <Select
                      label="Maintenance Type"
                      options={maintenanceTypeOptions}
                      value={maintenanceType}
                      onChange={setMaintenanceType}
                    />
                    <Input
                      label="Scheduled Date"
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e?.target?.value)}
                      min={new Date()?.toISOString()?.slice(0, 16)}
                    />
                    <Button 
                      onClick={handleScheduleMaintenance} 
                      className="w-full"
                      disabled={!scheduledDate}
                    >
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Schedule Maintenance
                    </Button>
                  </>
                )}

                {item?.id === 'emergency-protocol' && (
                  <>
                    <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="AlertTriangle" size={16} className="text-error" />
                        <span className="font-medium text-error">Emergency Protocol</span>
                      </div>
                      <p className="text-sm text-foreground">
                        This will initiate emergency response procedures including personnel evacuation,
                        equipment shutdown, and notification of emergency services.
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={handleEmergencyProtocol} 
                      className="w-full"
                    >
                      <Icon name="AlertTriangle" size={16} className="mr-2" />
                      Initiate Emergency Response
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Recommendations */}
      {recommendations?.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-4">AI Recommendations</h4>
          <div className="space-y-3">
            {recommendations?.map((rec, index) => (
              <div key={index} className={`rounded-lg border p-4 ${getPriorityBg(rec?.priority)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec?.priority)} ${getPriorityBg(rec?.priority)}`}>
                    {rec?.priority?.toUpperCase()} PRIORITY
                  </div>
                  <span className="text-xs text-muted-foreground">{rec?.timeframe}</span>
                </div>
                <h5 className="font-medium text-foreground mb-1">{rec?.action}</h5>
                <p className="text-sm text-muted-foreground">{rec?.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;