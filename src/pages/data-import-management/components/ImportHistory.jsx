import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ImportHistory = ({ historyData, onExport, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const filteredHistory = historyData?.filter(item => {
    const matchesSearch = item?.fileName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={16} className="text-error" />;
      case 'cancelled':
        return <Icon name="MinusCircle" size={16} className="text-muted-foreground" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'failed':
        return 'text-error bg-error/10';
      case 'cancelled':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Import History
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage historical import operations
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export History
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search files or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          
          <Select
            placeholder="Filter by date"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredHistory?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="History" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No import history found</p>
          </div>
        ) : (
          filteredHistory?.map((item) => (
            <div key={item?.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {getStatusIcon(item?.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {item?.fileName}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item?.status)}`}>
                        {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{item?.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{item?.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="HardDrive" size={12} />
                        <span>{item?.fileSize}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{item?.duration}</span>
                      </div>
                    </div>
                    
                    {item?.dataType && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                          {item?.dataType}
                        </span>
                      </div>
                    )}
                    
                    {item?.error && (
                      <p className="text-xs text-error mt-2">
                        Error: {item?.error}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(item?.id)}
                    iconName="Eye"
                    iconSize={16}
                  >
                    Details
                  </Button>
                  {item?.status === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      iconSize={16}
                    >
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredHistory?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredHistory?.length} of {historyData?.length} records</span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="ChevronLeft" iconSize={16}>
                Previous
              </Button>
              <span className="px-2">1 of 5</span>
              <Button variant="ghost" size="sm" iconName="ChevronRight" iconSize={16}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportHistory;