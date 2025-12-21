import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ImportConfiguration = ({ onSaveConfiguration, currentConfig }) => {
  const [config, setConfig] = useState(currentConfig || {
    coordinateSystem: 'WGS84',
    dataTransformation: 'auto',
    validationLevel: 'standard',
    autoProcessing: true,
    notifyOnCompletion: true,
    retainOriginalFiles: true,
    compressionLevel: 'medium'
  });

  const coordinateSystems = [
    { value: 'WGS84', label: 'WGS84 (World Geodetic System 1984)' },
    { value: 'UTM', label: 'UTM (Universal Transverse Mercator)' },
    { value: 'NAD83', label: 'NAD83 (North American Datum 1983)' },
    { value: 'EPSG4326', label: 'EPSG:4326 (Geographic Coordinate System)' },
    { value: 'custom', label: 'Custom Coordinate System' }
  ];

  const transformationOptions = [
    { value: 'auto', label: 'Automatic Detection' },
    { value: 'preserve', label: 'Preserve Original Format' },
    { value: 'normalize', label: 'Normalize to Standard Format' },
    { value: 'custom', label: 'Custom Transformation Rules' }
  ];

  const validationLevels = [
    { value: 'basic', label: 'Basic Validation' },
    { value: 'standard', label: 'Standard Validation' },
    { value: 'strict', label: 'Strict Validation' },
    { value: 'custom', label: 'Custom Validation Rules' }
  ];

  const compressionLevels = [
    { value: 'none', label: 'No Compression' },
    { value: 'low', label: 'Low Compression' },
    { value: 'medium', label: 'Medium Compression' },
    { value: 'high', label: 'High Compression' }
  ];

  const handleSave = () => {
    onSaveConfiguration(config);
  };

  const handleReset = () => {
    setConfig({
      coordinateSystem: 'WGS84',
      dataTransformation: 'auto',
      validationLevel: 'standard',
      autoProcessing: true,
      notifyOnCompletion: true,
      retainOriginalFiles: true,
      compressionLevel: 'medium'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Import Configuration
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure data processing and transformation settings
          </p>
        </div>
        <Icon name="Settings" size={24} className="text-primary" />
      </div>
      <div className="space-y-6">
        {/* Coordinate System */}
        <div>
          <Select
            label="Coordinate System"
            description="Select the coordinate reference system for spatial data"
            options={coordinateSystems}
            value={config?.coordinateSystem}
            onChange={(value) => setConfig(prev => ({ ...prev, coordinateSystem: value }))}
          />
        </div>

        {/* Data Transformation */}
        <div>
          <Select
            label="Data Transformation"
            description="Choose how data should be transformed during import"
            options={transformationOptions}
            value={config?.dataTransformation}
            onChange={(value) => setConfig(prev => ({ ...prev, dataTransformation: value }))}
          />
        </div>

        {/* Validation Level */}
        <div>
          <Select
            label="Validation Level"
            description="Set the level of data validation during import"
            options={validationLevels}
            value={config?.validationLevel}
            onChange={(value) => setConfig(prev => ({ ...prev, validationLevel: value }))}
          />
        </div>

        {/* Compression Level */}
        <div>
          <Select
            label="Compression Level"
            description="Choose compression level for stored data"
            options={compressionLevels}
            value={config?.compressionLevel}
            onChange={(value) => setConfig(prev => ({ ...prev, compressionLevel: value }))}
          />
        </div>

        {/* Processing Options */}
        <div className="space-y-4">
          <h4 className="text-base font-medium text-foreground">
            Processing Options
          </h4>
          
          <Checkbox
            label="Enable Auto-Processing"
            description="Automatically process files after upload completion"
            checked={config?.autoProcessing}
            onChange={(e) => setConfig(prev => ({ ...prev, autoProcessing: e?.target?.checked }))}
          />

          <Checkbox
            label="Notify on Completion"
            description="Send notifications when import jobs are completed"
            checked={config?.notifyOnCompletion}
            onChange={(e) => setConfig(prev => ({ ...prev, notifyOnCompletion: e?.target?.checked }))}
          />

          <Checkbox
            label="Retain Original Files"
            description="Keep original files after processing for backup purposes"
            checked={config?.retainOriginalFiles}
            onChange={(e) => setConfig(prev => ({ ...prev, retainOriginalFiles: e?.target?.checked }))}
          />
        </div>

        {/* Custom Parameters */}
        <div className="space-y-4">
          <h4 className="text-base font-medium text-foreground">
            Advanced Parameters
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Max File Size (MB)"
              type="number"
              placeholder="500"
              description="Maximum allowed file size for uploads"
            />
            
            <Input
              label="Batch Size"
              type="number"
              placeholder="10"
              description="Number of files to process simultaneously"
            />
            
            <Input
              label="Timeout (minutes)"
              type="number"
              placeholder="30"
              description="Processing timeout for individual files"
            />
            
            <Input
              label="Retry Attempts"
              type="number"
              placeholder="3"
              description="Number of retry attempts for failed imports"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset to Defaults
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="TestTube"
              iconPosition="left"
            >
              Test Configuration
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportConfiguration;