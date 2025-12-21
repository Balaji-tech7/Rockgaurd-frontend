import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const AlertConfiguration = ({ isOpen, onClose, onSave }) => {
  const [config, setConfig] = useState({
    thresholds: {
      critical: 90,
      high: 75,
      medium: 50,
      low: 25
    },
    notifications: {
      email: true,
      sms: true,
      push: false
    },
    escalation: {
      enabled: true,
      timeoutMinutes: 30,
      levels: ['Safety Officer', 'Mine Manager', 'Emergency Response']
    },
    schedule: {
      enabled: true,
      quietHours: {
        start: '22:00',
        end: '06:00'
      },
      weekends: false
    }
  });

  const [activeTab, setActiveTab] = useState('thresholds');

  const handleThresholdChange = (level, value) => {
    setConfig(prev => ({
      ...prev,
      thresholds: {
        ...prev?.thresholds,
        [level]: parseInt(value) || 0
      }
    }));
  };

  const handleNotificationChange = (type, enabled) => {
    setConfig(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [type]: enabled
      }
    }));
  };

  const handleEscalationChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      escalation: {
        ...prev?.escalation,
        [field]: value
      }
    }));
  };

  const handleScheduleChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setConfig(prev => ({
        ...prev,
        schedule: {
          ...prev?.schedule,
          [parent]: {
            ...prev?.schedule?.[parent],
            [child]: value
          }
        }
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        schedule: {
          ...prev?.schedule,
          [field]: value
        }
      }));
    }
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const testNotification = (type) => {
    // Mock notification test
    alert(`Test ${type} notification sent successfully!`);
  };

  const tabs = [
    { id: 'thresholds', label: 'Thresholds', icon: 'Settings' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'escalation', label: 'Escalation', icon: 'ArrowUp' },
    { id: 'schedule', label: 'Schedule', icon: 'Clock' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Alert Configuration</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-8rem)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-border bg-muted/30">
            <nav className="p-4 space-y-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {activeTab === 'thresholds' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Risk Threshold Settings</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Configure the risk percentage thresholds that trigger different alert severity levels.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Input
                        label="Critical Threshold (%)"
                        type="number"
                        value={config?.thresholds?.critical}
                        onChange={(e) => handleThresholdChange('critical', e?.target?.value)}
                        min="0"
                        max="100"
                        description="Triggers immediate emergency response"
                      />
                      <Input
                        label="High Threshold (%)"
                        type="number"
                        value={config?.thresholds?.high}
                        onChange={(e) => handleThresholdChange('high', e?.target?.value)}
                        min="0"
                        max="100"
                        description="Requires urgent attention"
                      />
                    </div>
                    <div className="space-y-4">
                      <Input
                        label="Medium Threshold (%)"
                        type="number"
                        value={config?.thresholds?.medium}
                        onChange={(e) => handleThresholdChange('medium', e?.target?.value)}
                        min="0"
                        max="100"
                        description="Needs monitoring and planning"
                      />
                      <Input
                        label="Low Threshold (%)"
                        type="number"
                        value={config?.thresholds?.low}
                        onChange={(e) => handleThresholdChange('low', e?.target?.value)}
                        min="0"
                        max="100"
                        description="Informational alerts"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Threshold Preview</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-red-600">Critical:</span>
                        <span>&ge; {config?.thresholds?.critical}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-orange-600">High:</span>
                        <span>{config?.thresholds?.high}% - {config?.thresholds?.critical - 1}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-yellow-600">Medium:</span>
                        <span>{config?.thresholds?.medium}% - {config?.thresholds?.high - 1}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600">Low:</span>
                        <span>{config?.thresholds?.low}% - {config?.thresholds?.medium - 1}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Notification Channels</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Configure how and where alert notifications are delivered.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="Mail" size={20} className="text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">Email Notifications</div>
                          <div className="text-sm text-muted-foreground">Send alerts via email</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => testNotification('email')}
                          disabled={!config?.notifications?.email}
                        >
                          Test
                        </Button>
                        <Checkbox
                          checked={config?.notifications?.email}
                          onChange={(e) => handleNotificationChange('email', e?.target?.checked)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">SMS Notifications</div>
                          <div className="text-sm text-muted-foreground">Send alerts via SMS</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => testNotification('SMS')}
                          disabled={!config?.notifications?.sms}
                        >
                          Test
                        </Button>
                        <Checkbox
                          checked={config?.notifications?.sms}
                          onChange={(e) => handleNotificationChange('sms', e?.target?.checked)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="Smartphone" size={20} className="text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">Push Notifications</div>
                          <div className="text-sm text-muted-foreground">Send alerts via mobile app</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => testNotification('push')}
                          disabled={!config?.notifications?.push}
                        >
                          Test
                        </Button>
                        <Checkbox
                          checked={config?.notifications?.push}
                          onChange={(e) => handleNotificationChange('push', e?.target?.checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'escalation' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Escalation Rules</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Configure automatic escalation when alerts are not acknowledged within specified timeframes.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Checkbox
                      label="Enable Automatic Escalation"
                      description="Automatically escalate unacknowledged alerts"
                      checked={config?.escalation?.enabled}
                      onChange={(e) => handleEscalationChange('enabled', e?.target?.checked)}
                    />

                    {config?.escalation?.enabled && (
                      <>
                        <Input
                          label="Escalation Timeout (minutes)"
                          type="number"
                          value={config?.escalation?.timeoutMinutes}
                          onChange={(e) => handleEscalationChange('timeoutMinutes', parseInt(e?.target?.value) || 0)}
                          min="1"
                          max="1440"
                          description="Time before escalating unacknowledged alerts"
                        />

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Escalation Hierarchy
                          </label>
                          <div className="space-y-2">
                            {config?.escalation?.levels?.map((level, index) => (
                              <div key={index} className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                  {index + 1}
                                </div>
                                <span className="text-sm text-foreground">{level}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Notification Schedule</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Configure when notifications should be sent and quiet hours.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Checkbox
                      label="Enable Scheduled Notifications"
                      description="Control when notifications are sent"
                      checked={config?.schedule?.enabled}
                      onChange={(e) => handleScheduleChange('enabled', e?.target?.checked)}
                    />

                    {config?.schedule?.enabled && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Quiet Hours Start"
                            type="time"
                            value={config?.schedule?.quietHours?.start}
                            onChange={(e) => handleScheduleChange('quietHours.start', e?.target?.value)}
                            description="Start of quiet hours"
                          />
                          <Input
                            label="Quiet Hours End"
                            type="time"
                            value={config?.schedule?.quietHours?.end}
                            onChange={(e) => handleScheduleChange('quietHours.end', e?.target?.value)}
                            description="End of quiet hours"
                          />
                        </div>

                        <Checkbox
                          label="Send Notifications on Weekends"
                          description="Allow notifications during weekends"
                          checked={config?.schedule?.weekends}
                          onChange={(e) => handleScheduleChange('weekends', e?.target?.checked)}
                        />

                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-medium text-foreground mb-2">Schedule Summary</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div>Quiet Hours: {config?.schedule?.quietHours?.start} - {config?.schedule?.quietHours?.end}</div>
                            <div>Weekend Notifications: {config?.schedule?.weekends ? 'Enabled' : 'Disabled'}</div>
                            <div className="text-xs mt-2 text-amber-600">
                              Note: Critical alerts will always be sent regardless of schedule settings.
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertConfiguration;