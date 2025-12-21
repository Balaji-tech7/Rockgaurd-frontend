import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SensorChart = ({ sensors, selectedSensors, onSensorToggle }) => {
  const [timeRange, setTimeRange] = useState('24h');
  const [chartType, setChartType] = useState('line');

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  // Mock historical data
  const generateHistoricalData = () => {
    const hours = timeRange === '1h' ? 1 : timeRange === '6h' ? 6 : timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
    const interval = timeRange === '1h' ? 5 : timeRange === '6h' ? 30 : timeRange === '24h' ? 60 : timeRange === '7d' ? 360 : 1440;
    
    const data = [];
    const now = new Date();
    
    for (let i = hours; i >= 0; i--) {
      const time = new Date(now.getTime() - i * interval * 60000);
      const dataPoint = {
        time: time?.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          ...(timeRange === '7d' || timeRange === '30d' ? { month: 'short', day: 'numeric' } : {})
        })
      };
      
      selectedSensors?.forEach(sensorId => {
        const sensor = sensors?.find(s => s?.id === sensorId);
        if (sensor) {
          const baseValue = sensor?.currentValue;
          const variation = baseValue * 0.1;
          dataPoint[sensor.name] = Math.max(0, baseValue + (Math.random() - 0.5) * variation);
        }
      });
      
      data?.push(dataPoint);
    }
    
    return data;
  };

  const chartData = generateHistoricalData();
  const colors = ['#1B365D', '#2E5984', '#FF6B35', '#059669', '#D97706', '#DC2626'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">
                {entry?.value?.toFixed(2)} {sensors?.find(s => s?.name === entry?.dataKey)?.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Historical Data Analysis</h3>
          <div className="flex items-center space-x-2">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-32"
            />
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {sensors?.map((sensor, index) => (
            <button
              key={sensor?.id}
              onClick={() => onSensorToggle(sensor?.id)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                selectedSensors?.includes(sensor?.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: selectedSensors?.includes(sensor?.id) ? 'white' : colors?.[index % colors?.length] }}
              />
              <span>{sensor?.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {selectedSensors?.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {selectedSensors?.map((sensorId, index) => {
                  const sensor = sensors?.find(s => s?.id === sensorId);
                  return (
                    <Line
                      key={sensorId}
                      type="monotone"
                      dataKey={sensor?.name}
                      stroke={colors?.[index % colors?.length]}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: colors?.[index % colors?.length] }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select sensors to view historical data</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorChart;