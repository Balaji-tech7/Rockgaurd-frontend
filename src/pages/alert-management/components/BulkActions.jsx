import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedAlerts, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'acknowledge', label: 'Acknowledge Selected' },
    { value: 'escalate', label: 'Escalate Selected' },
    { value: 'resolve', label: 'Mark as Resolved' },
    { value: 'assign', label: 'Assign to User' },
    { value: 'export', label: 'Export Selected' }
  ];

  const handleExecuteAction = async () => {
    if (!selectedAction || selectedAlerts?.length === 0) return;

    setIsProcessing(true);
    
    try {
      await onBulkAction(selectedAction, selectedAlerts);
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedAlerts?.length === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedAlerts?.length} alert{selectedAlerts?.length !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Choose action"
              className="min-w-48"
            />
            
            <Button
              onClick={handleExecuteAction}
              disabled={!selectedAction || isProcessing}
              loading={isProcessing}
              iconName="Play"
              iconSize={16}
            >
              Execute
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          iconName="X"
          iconSize={16}
        >
          Clear Selection
        </Button>
      </div>
      {selectedAction && (
        <div className="mt-3 pt-3 border-t border-primary/20">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>
              {selectedAction === 'acknowledge' && 'This will acknowledge all selected alerts and change their status.'}
              {selectedAction === 'escalate' && 'This will escalate all selected alerts to the next level.'}
              {selectedAction === 'resolve' && 'This will mark all selected alerts as resolved.'}
              {selectedAction === 'assign' && 'This will assign all selected alerts to a specific user.'}
              {selectedAction === 'export' && 'This will export all selected alerts to a CSV file.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;