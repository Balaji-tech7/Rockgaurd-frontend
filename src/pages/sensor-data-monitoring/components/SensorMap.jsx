import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const SensorMap = ({ sensors, onSensorSelect }) => {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [mapView, setMapView] = useState('satellite');

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success border-success';
      case 'offline':
        return 'bg-error border-error';
      case 'maintenance':
        return 'bg-warning border-warning';
      default:
        return 'bg-muted-foreground border-muted-foreground';
    }
  };

  const handleSensorClick = (sensor) => {
    setSelectedSensor(sensor);
    onSensorSelect?.(sensor);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-foreground">Sensor Network Map</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              Satellite
            </Button>
            <Button
              variant={mapView === 'terrain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('terrain')}
            >
              Terrain
            </Button>
          </div>
        </div>
      </div>
      <div className="relative h-96 bg-muted">
        {/* Mock Google Maps iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Mining Site Sensor Network"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=-33.8688,151.2093&z=16&output=embed"
          className="absolute inset-0"
        />
        
        {/* Sensor markers overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {sensors?.map((sensor, index) => (
            <div
              key={sensor?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${30 + Math.floor(index / 4) * 15}%`
              }}
              onClick={() => handleSensorClick(sensor)}
            >
              <div className={`w-4 h-4 rounded-full border-2 ${getStatusColor(sensor?.status)} shadow-lg`}>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-gray-300">
                  <div className={`w-full h-full rounded-full ${sensor?.signalStrength > 70 ? 'bg-success' : sensor?.signalStrength > 40 ? 'bg-warning' : 'bg-error'}`} />
                </div>
              </div>
              {selectedSensor?.id === sensor?.id && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-elevation-2 min-w-48 z-10">
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{sensor?.name}</p>
                    <p className="text-muted-foreground">{sensor?.location}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs">
                        <span className="text-muted-foreground">Value:</span> {sensor?.currentValue} {sensor?.unit}
                      </p>
                      <p className="text-xs">
                        <span className="text-muted-foreground">Status:</span> 
                        <span className={`ml-1 capitalize ${sensor?.status === 'online' ? 'text-success' : sensor?.status === 'offline' ? 'text-error' : 'text-warning'}`}>
                          {sensor?.status}
                        </span>
                      </p>
                      <p className="text-xs">
                        <span className="text-muted-foreground">Signal:</span> {sensor?.signalStrength}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-muted-foreground">Online ({sensors?.filter(s => s?.status === 'online')?.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full" />
              <span className="text-muted-foreground">Offline ({sensors?.filter(s => s?.status === 'offline')?.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-muted-foreground">Maintenance ({sensors?.filter(s => s?.status === 'maintenance')?.length})</span>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Maximize2">
            Full Screen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SensorMap;