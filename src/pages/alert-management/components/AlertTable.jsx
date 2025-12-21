import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertTable = ({ alerts, onAcknowledge, onEscalate, onViewDetails, selectedAlerts, onSelectAlert, onSelectAll }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAlerts = [...alerts]?.sort((a, b) => {
    if (sortConfig?.key === 'timestamp') {
      const aTime = new Date(a.timestamp)?.getTime();
      const bTime = new Date(b.timestamp)?.getTime();
      return sortConfig?.direction === 'asc' ? aTime - bTime : bTime - aTime;
    }
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Investigating': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedAlerts?.length === alerts?.length && alerts?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Timestamp</span>
                  <Icon name={getSortIcon('timestamp')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Location</span>
                  <Icon name={getSortIcon('location')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('severity')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Severity</span>
                  <Icon name={getSortIcon('severity')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('riskType')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Risk Type</span>
                  <Icon name={getSortIcon('riskType')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-right px-4 py-3">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedAlerts?.map((alert) => (
              <tr key={alert?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedAlerts?.includes(alert?.id)}
                    onChange={(e) => onSelectAlert(alert?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground font-medium">
                    {formatTimestamp(alert?.timestamp)}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{alert?.location}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground">{alert?.riskType}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert?.status)}`}>
                    {alert?.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(alert)}
                      iconName="Eye"
                      iconSize={16}
                    >
                      View
                    </Button>
                    {alert?.status === 'Active' && (
                      <Button
                        variant="outline"
                        size="sm"
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
                        size="sm"
                        onClick={() => onEscalate(alert?.id)}
                        iconName="AlertTriangle"
                        iconSize={16}
                      >
                        Escalate
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedAlerts?.map((alert) => (
          <div key={alert?.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedAlerts?.includes(alert?.id)}
                  onChange={(e) => onSelectAlert(alert?.id, e?.target?.checked)}
                  className="rounded border-border mt-1"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {formatTimestamp(alert?.timestamp)}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{alert?.location}</span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                {alert?.severity}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-foreground font-medium">{alert?.riskType}</div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(alert?.status)}`}>
                  {alert?.status}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(alert)}
                iconName="Eye"
                iconSize={16}
                fullWidth
              >
                View Details
              </Button>
              {alert?.status === 'Active' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAcknowledge(alert?.id)}
                  iconName="Check"
                  iconSize={16}
                  fullWidth
                >
                  Acknowledge
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {sortedAlerts?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="AlertTriangle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No alerts found</h3>
          <p className="text-muted-foreground">No alerts match your current filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AlertTable;