import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import UploadZone from './components/UploadZone';
import ProcessingQueue from './components/ProcessingQueue';
import DataQualityPanel from './components/DataQualityPanel';
import ImportConfiguration from './components/ImportConfiguration';
import ImportHistory from './components/ImportHistory';
import IntegrationStatus from './components/IntegrationStatus';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DataImportManagement = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [currentSite, setCurrentSite] = useState('Site Alpha');
  const [alertCount] = useState(12);

  // Enhanced processing queue with real upload tracking
  const [processingJobs, setProcessingJobs] = useState([
    {
      id: 1,
      fileName: "drone_survey_sector_7_20250916.zip",
      fileSize: "2.4 GB",
      dataType: "Drone Imagery",
      status: "processing",
      progress: 67,
      startTime: "09:15 AM",
      completedTime: null,
      error: null,
      uploadPath: null
    },
    {
      id: 2,
      fileName: "dem_elevation_model_alpha.tif",
      fileSize: "856 MB", 
      dataType: "DEM Data",
      status: "completed",
      progress: 100,
      startTime: "08:45 AM",
      completedTime: "09:12 AM",
      error: null,
      uploadPath: "mining-dem-data/2025-01-18T08-45-00-000Z-dem_elevation_model_alpha.tif"
    },
    {
      id: 3,
      fileName: "sensor_calibration_batch_03.csv",
      fileSize: "12.3 MB",
      dataType: "Sensor Data", 
      status: "failed",
      progress: 0,
      startTime: "08:30 AM",
      completedTime: null,
      error: "Invalid coordinate system format",
      uploadPath: null
    },
    {
      id: 4,
      fileName: "environmental_data_sept_2025.json",
      fileSize: "45.7 MB",
      dataType: "Environmental",
      status: "queued",
      progress: 0,
      startTime: "09:30 AM",
      completedTime: null,
      error: null,
      uploadPath: null
    }
  ]);

  // Mock data for quality metrics
  const qualityMetrics = {
    overallScore: 87,
    metrics: [
      {
        name: "Data Completeness",
        score: 94,
        description: "Percentage of required fields populated"
      },
      {
        name: "Accuracy",
        score: 89,
        description: "Data accuracy based on validation rules"
      },
      {
        name: "Consistency",
        score: 92,
        description: "Data format and structure consistency"
      },
      {
        name: "Timeliness",
        score: 78,
        description: "Data freshness and update frequency"
      },
      {
        name: "Validity",
        score: 85,
        description: "Data conforms to business rules"
      },
      {
        name: "Uniqueness",
        score: 96,
        description: "Absence of duplicate records"
      }
    ],
    issues: [
      {
        severity: "medium",
        title: "Coordinate System Mismatch",
        description: "Some DEM files use different coordinate systems than configured",
        recommendation: "Standardize all spatial data to WGS84 coordinate system"
      },
      {
        severity: "low",
        title: "Missing Metadata",
        description: "15% of drone imagery files lack complete metadata information",
        recommendation: "Ensure all imagery includes timestamp and GPS coordinates"
      }
    ]
  };

  // Mock data for import history
  const importHistory = [
    {
      id: 1,
      fileName: "weekly_sensor_batch_20250909.zip",
      user: "Sarah Chen",
      date: "Sep 09, 2025",
      fileSize: "1.2 GB",
      duration: "12m 34s",
      status: "completed",
      dataType: "Sensor Data",
      error: null
    },
    {
      id: 2,
      fileName: "drone_survey_sector_5.zip",
      user: "Mike Rodriguez",
      date: "Sep 08, 2025",
      fileSize: "3.1 GB",
      duration: "25m 18s",
      status: "completed",
      dataType: "Drone Imagery",
      error: null
    },
    {
      id: 3,
      fileName: "environmental_sensors_aug.csv",
      user: "Lisa Park",
      date: "Sep 07, 2025",
      fileSize: "89 MB",
      duration: "3m 45s",
      status: "failed",
      dataType: "Environmental",
      error: "File format not supported"
    },
    {
      id: 4,
      fileName: "geotechnical_analysis_q3.xlsx",
      user: "David Kim",
      date: "Sep 06, 2025",
      fileSize: "156 MB",
      duration: "8m 12s",
      status: "completed",
      dataType: "Geotechnical",
      error: null
    },
    {
      id: 5,
      fileName: "slope_stability_model.zip",
      user: "Sarah Chen",
      date: "Sep 05, 2025",
      fileSize: "2.8 GB",
      duration: "22m 56s",
      status: "cancelled",
      dataType: "DEM Data",
      error: null
    }
  ];

  // Mock data for integration status
  const integrationData = {
    healthScore: 92,
    activeConnections: 8,
    totalConnections: 10,
    sources: [
      {
        id: 1,
        name: "Drone Imagery",
        description: "Aerial survey data",
        type: "drone_imagery",
        status: "active",
        lastSync: "2 min ago",
        recordCount: 15420,
        syncProgress: null
      },
      {
        id: 2,
        name: "DEM Data",
        description: "Digital elevation models",
        type: "dem_data",
        status: "syncing",
        lastSync: "5 min ago",
        recordCount: 8934,
        syncProgress: 73
      },
      {
        id: 3,
        name: "Sensor Network",
        description: "Real-time sensor data",
        type: "sensor_data",
        status: "active",
        lastSync: "1 min ago",
        recordCount: 245680,
        syncProgress: null
      },
      {
        id: 4,
        name: "Environmental Data",
        description: "Weather and climate data",
        type: "environmental",
        status: "active",
        lastSync: "3 min ago",
        recordCount: 67234,
        syncProgress: null
      },
      {
        id: 5,
        name: "Geotechnical",
        description: "Ground stability data",
        type: "geotechnical",
        status: "error",
        lastSync: "2 hours ago",
        recordCount: 12456,
        syncProgress: null
      },
      {
        id: 6,
        name: "Historical Archive",
        description: "Legacy data repository",
        type: "archive",
        status: "inactive",
        lastSync: "1 day ago",
        recordCount: 89234,
        syncProgress: null
      }
    ],
    models: [
      {
        id: 1,
        name: "Rockfall Prediction Model",
        status: "active",
        accuracy: 94,
        lastUpdate: "2 hours ago"
      },
      {
        id: 2,
        name: "Slope Stability Analysis",
        status: "active",
        accuracy: 89,
        lastUpdate: "4 hours ago"
      },
      {
        id: 3,
        name: "Environmental Risk Assessment",
        status: "syncing",
        accuracy: 87,
        lastUpdate: "6 hours ago"
      }
    ]
  };

  const tabs = [
    { id: 'upload', label: 'Data Upload', icon: 'Upload' },
    { id: 'queue', label: 'Processing Queue', icon: 'List' },
    { id: 'quality', label: 'Data Quality', icon: 'Shield' },
    { id: 'config', label: 'Configuration', icon: 'Settings' },
    { id: 'history', label: 'Import History', icon: 'History' },
    { id: 'integration', label: 'Integration Status', icon: 'Activity' }
  ];

  // Enhanced file select handler with real upload results
  const handleFileSelect = (uploadResults, dataType) => {
    if (!uploadResults || uploadResults?.length === 0) return;

    console.log(`Successfully processed ${uploadResults?.length} files for ${dataType}:`, uploadResults);
    
    // Add successful uploads to processing queue
    const newJobs = uploadResults?.map((result, index) => ({
      id: Date.now() + index,
      fileName: result?.name,
      fileSize: result?.size,
      dataType: dataType,
      status: "completed",
      progress: 100,
      startTime: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      completedTime: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      error: null,
      uploadPath: result?.path
    }));
    
    setProcessingJobs(prev => [...newJobs, ...prev]);
    
    // Auto-switch to queue tab to show results
    setActiveTab('queue');
  };

  const handleRetryJob = (jobId) => {
    setProcessingJobs(prev => 
      prev?.map(job => 
        job?.id === jobId 
          ? { ...job, status: 'processing', progress: 0, error: null }
          : job
      )
    );
    
    // Simulate retry processing
    setTimeout(() => {
      setProcessingJobs(prev => 
        prev?.map(job => 
          job?.id === jobId 
            ? { ...job, status: 'completed', progress: 100, completedTime: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : job
        )
      );
    }, 2000);
  };

  const handleCancelJob = (jobId) => {
    setProcessingJobs(prev => 
      prev?.map(job => 
        job?.id === jobId 
          ? { ...job, status: 'cancelled', progress: 0 }
          : job
      )
    );
  };

  const handleViewJobDetails = (jobId) => {
    const job = processingJobs?.find(j => j?.id === jobId);
    console.log('Job details:', job);
    
    // Show detailed job information
    alert(`Job Details:
    
File: ${job?.fileName}
Size: ${job?.fileSize}
Type: ${job?.dataType}
Status: ${job?.status}
Progress: ${job?.progress}%
Started: ${job?.startTime}
${job?.completedTime ? `Completed: ${job?.completedTime}` : ''}
${job?.error ? `Error: ${job?.error}` : ''}
${job?.uploadPath ? `Storage Path: ${job?.uploadPath}` : ''}`);
  };

  const handleSaveConfiguration = (config) => {
    console.log('Save configuration:', config);
  };

  const handleExportHistory = () => {
    console.log('Export history');
  };

  const handleViewHistoryDetails = (itemId) => {
    console.log('View history details:', itemId);
  };

  const handleRefreshIntegration = () => {
    console.log('Refresh integration status');
  };

  const handleViewIntegrationDetails = (sourceId) => {
    console.log('View integration details:', sourceId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UploadZone
                title="Drone Imagery"
                description="Upload aerial survey images and videos for slope analysis"
                acceptedFormats=".jpg,.jpeg,.png,.tiff,.tif,.mp4,.mov,.avi"
                maxSize="5GB per file"
                onFileSelect={handleFileSelect}
                dataType="Drone Imagery"
              />
              
              <UploadZone
                title="Digital Elevation Models (DEM)"
                description="Upload terrain elevation data and topographic models"
                acceptedFormats=".tif,.tiff,.asc,.xyz,.las,.laz,.dem"
                maxSize="2GB per file"
                onFileSelect={handleFileSelect}
                dataType="DEM Data"
              />
              
              <UploadZone
                title="Sensor Data"
                description="Upload sensor readings and calibration files"
                acceptedFormats=".csv,.json,.xml,.txt,.xlsx"
                maxSize="500MB per file"
                onFileSelect={handleFileSelect}
                dataType="Sensor Data"
              />
              
              <UploadZone
                title="Environmental Data"
                description="Upload weather, climate, and environmental monitoring data"
                acceptedFormats=".csv,.json,.xlsx,.xml,.txt"
                maxSize="200MB per file"
                onFileSelect={handleFileSelect}
                dataType="Environmental"
              />
            </div>
            
            {/* Upload Status Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Upload Instructions & Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-foreground">✅ Best Practices:</p>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Ensure GPS coordinates are included in imagery</li>
                    <li>• Use standardized coordinate systems (WGS84)</li>
                    <li>• Include metadata files when available</li>
                    <li>• Compress large datasets before upload</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">⚠️ Important Notes:</p>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Files are automatically validated upon upload</li>
                    <li>• Processing begins immediately after upload</li>
                    <li>• Large files may take several minutes to process</li>
                    <li>• Check processing queue for upload status</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'queue':
        return (
          <ProcessingQueue
            jobs={processingJobs}
            onRetry={handleRetryJob}
            onCancel={handleCancelJob}
            onViewDetails={handleViewJobDetails}
          />
        );
      
      case 'quality':
        return (
          <DataQualityPanel qualityMetrics={qualityMetrics} />
        );
      
      case 'config':
        return (
          <ImportConfiguration
            onSaveConfiguration={handleSaveConfiguration}
            currentConfig={{
              coordinateSystem: 'WGS84',
              dataTransformation: 'auto',
              validationLevel: 'standard',
              autoProcessing: true,
              notifyOnCompletion: true,
              retainOriginalFiles: true,
              compressionLevel: 'medium'
            }}
          />
        );
      
      case 'history':
        return (
          <ImportHistory
            historyData={importHistory}
            onExport={handleExportHistory}
            onViewDetails={handleViewHistoryDetails}
          />
        );
      
      case 'integration':
        return (
          <IntegrationStatus
            integrationData={integrationData}
            onRefresh={handleRefreshIntegration}
            onViewDetails={handleViewIntegrationDetails}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentSite={currentSite}
        onSiteChange={setCurrentSite}
        alertCount={alertCount}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Data Import Management
                </h1>
                <p className="text-muted-foreground mt-2">
                  Upload, process, and integrate data sources for rockfall prediction analysis
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                  <p className="text-2xl font-bold text-primary">
                    {processingJobs?.filter(job => job?.status === 'processing' || job?.status === 'queued')?.length}
                  </p>
                </div>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setActiveTab('upload')}
                >
                  New Import
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  {tab?.id === 'queue' && processingJobs?.filter(job => job?.status === 'processing' || job?.status === 'queued')?.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                      {processingJobs?.filter(job => job?.status === 'processing' || job?.status === 'queued')?.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataImportManagement;