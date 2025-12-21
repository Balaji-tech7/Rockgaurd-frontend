import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const ExportReports = () => {
  const [reportConfig, setReportConfig] = useState({
    reportType: 'comprehensive',
    timeRange: '30d',
    format: 'pdf',
    includeCharts: true,
    includeRawData: false,
    includeModelMetrics: true,
    includeRecommendations: true
  });

  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      name: 'Weekly Risk Summary',
      type: 'summary',
      frequency: 'weekly',
      format: 'pdf',
      recipients: ['safety@minesite.com', 'manager@minesite.com'],
      lastGenerated: '2025-01-09',
      nextScheduled: '2025-01-16',
      status: 'active'
    },
    {
      id: 2,
      name: 'Monthly Compliance Report',
      type: 'compliance',
      frequency: 'monthly',
      format: 'excel',
      recipients: ['compliance@minesite.com'],
      lastGenerated: '2025-01-01',
      nextScheduled: '2025-02-01',
      status: 'active'
    },
    {
      id: 3,
      name: 'Daily Operations Brief',
      type: 'operational',
      frequency: 'daily',
      format: 'pdf',
      recipients: ['ops@minesite.com'],
      lastGenerated: '2025-01-15',
      nextScheduled: '2025-01-16',
      status: 'paused'
    }
  ]);

  const reportTypes = [
    { value: 'comprehensive', label: 'Comprehensive Analysis Report' },
    { value: 'summary', label: 'Executive Summary' },
    { value: 'technical', label: 'Technical Analysis Report' },
    { value: 'compliance', label: 'Regulatory Compliance Report' },
    { value: 'operational', label: 'Operational Risk Assessment' },
    { value: 'custom', label: 'Custom Report' }
  ];

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data File' },
    { value: 'json', label: 'JSON Data Export' },
    { value: 'html', label: 'HTML Report' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const handleConfigChange = (key, value) => {
    setReportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGenerateReport = () => {
    // Mock report generation
    console.log('Generating report with config:', reportConfig);
    
    // Simulate report generation process
    const reportName = `${reportTypes?.find(t => t?.value === reportConfig?.reportType)?.label}_${new Date()?.toISOString()?.split('T')?.[0]}.${reportConfig?.format}`;
    
    // In a real application, this would trigger the actual report generation
    alert(`Report "${reportName}" is being generated. You will receive a download link shortly.`);
  };

  const handleScheduleReport = () => {
    // Mock scheduling functionality
    const newReport = {
      id: scheduledReports?.length + 1,
      name: `Scheduled ${reportTypes?.find(t => t?.value === reportConfig?.reportType)?.label}`,
      type: reportConfig?.reportType,
      frequency: 'weekly', // Default frequency
      format: reportConfig?.format,
      recipients: ['user@minesite.com'],
      lastGenerated: null,
      nextScheduled: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0],
      status: 'active'
    };
    
    setScheduledReports(prev => [...prev, newReport]);
    alert('Report scheduled successfully!');
  };

  const toggleReportStatus = (reportId) => {
    setScheduledReports(prev => 
      prev?.map(report => 
        report?.id === reportId 
          ? { ...report, status: report?.status === 'active' ? 'paused' : 'active' }
          : report
      )
    );
  };

  const deleteScheduledReport = (reportId) => {
    if (confirm('Are you sure you want to delete this scheduled report?')) {
      setScheduledReports(prev => prev?.filter(report => report?.id !== reportId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Generate Report</h3>
            <p className="text-sm text-muted-foreground">
              Create detailed analytical reports for engineering review and compliance
            </p>
          </div>
          <Icon name="FileText" size={24} className="text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select
              label="Report Type"
              description="Choose the type of report to generate"
              options={reportTypes}
              value={reportConfig?.reportType}
              onChange={(value) => handleConfigChange('reportType', value)}
            />

            <Select
              label="Time Range"
              description="Select the data time range for the report"
              options={timeRangeOptions}
              value={reportConfig?.timeRange}
              onChange={(value) => handleConfigChange('timeRange', value)}
            />

            <Select
              label="Export Format"
              description="Choose the output format for the report"
              options={formatOptions}
              value={reportConfig?.format}
              onChange={(value) => handleConfigChange('format', value)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Report Content Options
              </label>
              <div className="space-y-3">
                <Checkbox
                  label="Include Charts and Visualizations"
                  description="Add graphs, charts, and visual analysis"
                  checked={reportConfig?.includeCharts}
                  onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Include Raw Data Tables"
                  description="Add detailed data tables and measurements"
                  checked={reportConfig?.includeRawData}
                  onChange={(e) => handleConfigChange('includeRawData', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Include Model Performance Metrics"
                  description="Add AI model accuracy and performance data"
                  checked={reportConfig?.includeModelMetrics}
                  onChange={(e) => handleConfigChange('includeModelMetrics', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Include Recommendations"
                  description="Add AI-generated recommendations and action items"
                  checked={reportConfig?.includeRecommendations}
                  onChange={(e) => handleConfigChange('includeRecommendations', e?.target?.checked)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleScheduleReport}
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule Report
          </Button>
          
          <Button
            variant="default"
            onClick={handleGenerateReport}
            iconName="Download"
            iconPosition="left"
          >
            Generate Report Now
          </Button>
        </div>
      </div>
      {/* Scheduled Reports */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Scheduled Reports</h3>
            <p className="text-sm text-muted-foreground">
              Manage automated report generation and distribution
            </p>
          </div>
          <Icon name="Clock" size={24} className="text-muted-foreground" />
        </div>

        <div className="space-y-4">
          {scheduledReports?.map((report) => (
            <div key={report?.id} className="border border-border rounded-lg p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{report?.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report?.status === 'active' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                    }`}>
                      {report?.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Type:</span> {report?.type}
                    </div>
                    <div>
                      <span className="font-medium">Frequency:</span> {report?.frequency}
                    </div>
                    <div>
                      <span className="font-medium">Format:</span> {report?.format?.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Last Generated:</span> {report?.lastGenerated || 'Never'}
                    </div>
                    <div>
                      <span className="font-medium">Next Scheduled:</span> {report?.nextScheduled}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Recipients:</span> {report?.recipients?.join(', ')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleReportStatus(report?.id)}
                    iconName={report?.status === 'active' ? 'Pause' : 'Play'}
                    iconPosition="left"
                  >
                    {report?.status === 'active' ? 'Pause' : 'Resume'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                  >
                    Edit
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteScheduledReport(report?.id)}
                    iconName="Trash2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {scheduledReports?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No scheduled reports configured</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create a report above and schedule it for automatic generation
            </p>
          </div>
        )}
      </div>
      {/* Recent Reports */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Recent Reports</h3>
            <p className="text-sm text-muted-foreground">
              Download previously generated reports
            </p>
          </div>
          <Icon name="History" size={24} className="text-muted-foreground" />
        </div>

        <div className="space-y-3">
          {[
            {
              name: 'Comprehensive Analysis Report - January 2025',
              type: 'comprehensive',
              format: 'pdf',
              size: '2.4 MB',
              generated: '2025-01-15 14:30',
              downloadUrl: '#'
            },
            {
              name: 'Weekly Risk Summary - Week 2',
              type: 'summary',
              format: 'pdf',
              size: '1.2 MB',
              generated: '2025-01-14 09:00',
              downloadUrl: '#'
            },
            {
              name: 'Technical Analysis Report - Q4 2024',
              type: 'technical',
              format: 'excel',
              size: '5.8 MB',
              generated: '2025-01-10 16:45',
              downloadUrl: '#'
            }
          ]?.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-smooth">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{report?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {report?.format?.toUpperCase()} • {report?.size} • Generated {report?.generated}
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportReports;