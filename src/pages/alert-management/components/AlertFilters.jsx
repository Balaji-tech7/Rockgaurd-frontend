import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AlertFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  alertCounts 
}) => {
  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: 'Critical', label: `Critical (${alertCounts?.Critical || 0})` },
    { value: 'High', label: `High (${alertCounts?.High || 0})` },
    { value: 'Medium', label: `Medium (${alertCounts?.Medium || 0})` },
    { value: 'Low', label: `Low (${alertCounts?.Low || 0})` }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'North Pit - Zone A', label: `North Pit - Zone A (${alertCounts?.locations?.['North Pit - Zone A'] || 0})` },
    { value: 'North Pit - Zone B', label: `North Pit - Zone B (${alertCounts?.locations?.['North Pit - Zone B'] || 0})` },
    { value: 'South Pit - Zone C', label: `South Pit - Zone C (${alertCounts?.locations?.['South Pit - Zone C'] || 0})` },
    { value: 'East Slope - Sector 1', label: `East Slope - Sector 1 (${alertCounts?.locations?.['East Slope - Sector 1'] || 0})` },
    { value: 'West Slope - Sector 2', label: `West Slope - Sector 2 (${alertCounts?.locations?.['West Slope - Sector 2'] || 0})` },
    { value: 'Central Processing Area', label: `Central Processing Area (${alertCounts?.locations?.['Central Processing Area'] || 0})` }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: `Active (${alertCounts?.Active || 0})` },
    { value: 'Acknowledged', label: `Acknowledged (${alertCounts?.Acknowledged || 0})` },
    { value: 'Investigating', label: `Investigating (${alertCounts?.Investigating || 0})` },
    { value: 'Resolved', label: `Resolved (${alertCounts?.Resolved || 0})` }
  ];

  const riskTypeOptions = [
    { value: '', label: 'All Risk Types' },
    { value: 'Rockfall', label: `Rockfall (${alertCounts?.riskTypes?.['Rockfall'] || 0})` },
    { value: 'Slope Instability', label: `Slope Instability (${alertCounts?.riskTypes?.['Slope Instability'] || 0})` },
    { value: 'Ground Movement', label: `Ground Movement (${alertCounts?.riskTypes?.['Ground Movement'] || 0})` },
    { value: 'Structural Failure', label: `Structural Failure (${alertCounts?.riskTypes?.['Structural Failure'] || 0})` },
    { value: 'Environmental', label: `Environmental (${alertCounts?.riskTypes?.['Environmental'] || 0})` }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filter Alerts
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconSize={16}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Select
          label="Severity"
          options={severityOptions}
          value={filters?.severity}
          onChange={(value) => onFilterChange('severity', value)}
          className="w-full"
        />

        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
          searchable
          className="w-full"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Risk Type"
          options={riskTypeOptions}
          value={filters?.riskType}
          onChange={(value) => onFilterChange('riskType', value)}
          className="w-full"
        />

        <Input
          label="Start Date"
          type="date"
          value={filters?.startDate}
          onChange={(e) => onFilterChange('startDate', e?.target?.value)}
          className="w-full"
        />

        <Input
          label="End Date"
          type="date"
          value={filters?.endDate}
          onChange={(e) => onFilterChange('endDate', e?.target?.value)}
          className="w-full"
        />
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>
              Active filters applied. Showing filtered results.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertFilters;