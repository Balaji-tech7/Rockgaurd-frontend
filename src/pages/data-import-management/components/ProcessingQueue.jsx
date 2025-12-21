import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueue = ({ jobs, onRetry, onCancel, onViewDetails }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'processing':
        return <Icon name="Loader2" size={20} className="text-primary animate-spin" />;
      case 'failed':
        return <Icon name="XCircle" size={20} className="text-error" />;
      case 'queued':
        return <Icon name="Clock" size={20} className="text-warning" />;
      case 'cancelled':
        return <Icon name="Ban" size={20} className="text-muted-foreground" />;
      default:
        return <Icon name="Circle" size={20} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'failed':
        return 'Failed';
      case 'queued':
        return 'Queued';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-primary bg-primary/10';
      case 'failed':
        return 'text-error bg-error/10';
      case 'queued':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Processing Queue
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor import job status and progress
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total Jobs</p>
            <p className="text-2xl font-bold text-primary">{jobs?.length || 0}</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {jobs?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No import jobs in queue</p>
            <p className="text-xs text-muted-foreground">
              Upload files to see processing status here
            </p>
          </div>
        ) : (
          jobs?.map((job) => (
            <div key={job?.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {getStatusIcon(job?.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {job?.fileName}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job?.status)}`}>
                        {getStatusText(job?.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {job?.fileSize} • {job?.dataType}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Started: {job?.startTime}
                      </p>
                      {job?.completedTime && (
                        <p className="text-xs text-muted-foreground">
                          Completed: {job?.completedTime}
                        </p>
                      )}
                      {job?.uploadPath && (
                        <p className="text-xs text-success">
                          ✓ Stored
                        </p>
                      )}
                    </div>
                    {job?.status === 'processing' && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{job?.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${job?.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {job?.error && (
                      <p className="text-xs text-error mt-1">
                        Error: {job?.error}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails?.(job?.id)}
                    iconName="Eye"
                    iconSize={16}
                  >
                    Details
                  </Button>
                  {job?.status === 'failed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRetry?.(job?.id)}
                      iconName="RotateCcw"
                      iconSize={16}
                    >
                      Retry
                    </Button>
                  )}
                  {(job?.status === 'queued' || job?.status === 'processing') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCancel?.(job?.id)}
                      iconName="X"
                      iconSize={16}
                    >
                      Cancel
                    </Button>
                  )}
                  {job?.status === 'completed' && job?.uploadPath && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        console.log(`File stored at: ${job?.uploadPath}`);
                        alert(`File successfully stored at:\n${job?.uploadPath}`);
                      }}
                      iconName="Download"
                      iconSize={16}
                    >
                      Path
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProcessingQueue;