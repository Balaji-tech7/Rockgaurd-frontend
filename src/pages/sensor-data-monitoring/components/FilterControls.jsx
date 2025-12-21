import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onResetFilters,
  sensorTypes,
  locations 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'maintenance', label: 'Maintenance Required' }
  ];

  const sensorTypeOptions = [
    { value: 'all', label: 'All Types' },
    ...sensorTypes?.map(type => ({ value: type, label: type }))
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    ...locations?.map(location => ({ value: location, label: location }))
  ];

  const thresholdOptions = [
    { value: 'all', label: 'All Sensors' },
    { value: 'exceeded', label: 'Threshold Exceeded' },
    { value: 'normal', label: 'Within Threshold' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">Filter Controls</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onResetFilters}
          iconName="RotateCcw"
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          label="Sensor Type"
          options={sensorTypeOptions}
          value={filters?.sensorType}
          onChange={(value) => onFilterChange('sensorType', value)}
        />

        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
        />

        <Select
          label="Threshold Status"
          options={thresholdOptions}
          value={filters?.threshold}
          onChange={(value) => onFilterChange('threshold', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Input
          label="Search Sensors"
          type="search"
          placeholder="Search by name or ID..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Signal Strength</label>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              placeholder="Min %"
              value={filters?.signalMin}
              onChange={(e) => onFilterChange('signalMin', e?.target?.value)}
              className="w-20"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max %"
              value={filters?.signalMax}
              onChange={(e) => onFilterChange('signalMax', e?.target?.value)}
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Battery Level</label>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              placeholder="Min %"
              value={filters?.batteryMin}
              onChange={(e) => onFilterChange('batteryMin', e?.target?.value)}
              className="w-20"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max %"
              value={filters?.batteryMax}
              onChange={(e) => onFilterChange('batteryMax', e?.target?.value)}
              className="w-20"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Checkbox
          label="Show only critical alerts"
          checked={filters?.criticalOnly}
          onChange={(e) => onFilterChange('criticalOnly', e?.target?.checked)}
        />
        
        <Checkbox
          label="Hide maintenance sensors"
          checked={filters?.hideMaintenance}
          onChange={(e) => onFilterChange('hideMaintenance', e?.target?.checked)}
        />
        
        <Checkbox
          label="Show trending data only"
          checked={filters?.trendingOnly}
          onChange={(e) => onFilterChange('trendingOnly', e?.target?.checked)}
        />
      </div>
    </div>
  );
};

export default FilterControls;