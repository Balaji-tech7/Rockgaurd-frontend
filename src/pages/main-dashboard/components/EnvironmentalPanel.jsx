import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EnvironmentalPanel = ({ selectedSite }) => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('rainfall');

  // Mock environmental data
  const environmentalData = {
    current: {
      rainfall: { value: 12.5, unit: 'mm', status: 'normal', change: '+2.3' },
      temperature: { value: 18.2, unit: '°C', status: 'normal', change: '-1.1' },
      humidity: { value: 68, unit: '%', status: 'normal', change: '+5' },
      windSpeed: { value: 15.8, unit: 'km/h', status: 'normal', change: '+3.2' },
      pressure: { value: 1013.2, unit: 'hPa', status: 'normal', change: '-2.1' },
      vibration: { value: 0.8, unit: 'mm/s', status: 'elevated', change: '+0.3' }
    },
    historical: [
      { time: '00:00', rainfall: 8.2, temperature: 16.5, humidity: 72, windSpeed: 12.3, pressure: 1015.1, vibration: 0.5 },
      { time: '04:00', rainfall: 9.1, temperature: 15.8, humidity: 75, windSpeed: 14.2, pressure: 1014.8, vibration: 0.6 },
      { time: '08:00', rainfall: 10.5, temperature: 17.2, humidity: 71, windSpeed: 16.1, pressure: 1014.2, vibration: 0.7 },
      { time: '12:00', rainfall: 11.8, temperature: 19.1, humidity: 65, windSpeed: 18.5, pressure: 1013.5, vibration: 0.9 },
      { time: '16:00', rainfall: 12.2, temperature: 18.8, humidity: 67, windSpeed: 17.2, pressure: 1013.1, vibration: 0.8 },
      { time: '20:00', rainfall: 12.5, temperature: 18.2, humidity: 68, windSpeed: 15.8, pressure: 1013.2, vibration: 0.8 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50';
      case 'elevated': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return 'CheckCircle';
      case 'elevated': return 'AlertTriangle';
      case 'critical': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'rainfall': return 'CloudRain';
      case 'temperature': return 'Thermometer';
      case 'humidity': return 'Droplets';
      case 'windSpeed': return 'Wind';
      case 'pressure': return 'Gauge';
      case 'vibration': return 'Activity';
      default: return 'BarChart3';
    }
  };

  const getMetricColor = (metric) => {
    switch (metric) {
      case 'rainfall': return '#3b82f6';
      case 'temperature': return '#ef4444';
      case 'humidity': return '#06b6d4';
      case 'windSpeed': return '#10b981';
      case 'pressure': return '#8b5cf6';
      case 'vibration': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Environmental Conditions</h2>
          <p className="text-sm text-muted-foreground">Real-time monitoring for {selectedSite}</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>
      </div>
      {/* Current Conditions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(environmentalData?.current)?.map(([key, data]) => (
          <div
            key={key}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-elevation-1 ${
              selectedMetric === key ? 'ring-2 ring-primary ring-opacity-50' : ''
            }`}
            onClick={() => setSelectedMetric(key)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={getMetricIcon(key)} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground capitalize">
                  {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                </span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data?.status)}`}>
                <Icon name={getStatusIcon(data?.status)} size={12} className="inline mr-1" />
                {data?.status}
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-foreground">
                  {data?.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{data?.unit}</span>
                </div>
              </div>
              <div className={`text-sm font-medium ${data?.change?.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {data?.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Historical Chart */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground">
            {selectedMetric?.charAt(0)?.toUpperCase() + selectedMetric?.slice(1)?.replace(/([A-Z])/g, ' $1')?.trim()} Trend
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="TrendingUp" size={16} />
            <span>24-hour trend</span>
          </div>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={environmentalData?.historical}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={getMetricColor(selectedMetric)}
                strokeWidth={2}
                dot={{ fill: getMetricColor(selectedMetric), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: getMetricColor(selectedMetric), strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Environmental Alerts */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="CloudRain" size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-foreground">Weather Alert</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Heavy rainfall expected in 2-4 hours
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalPanel;