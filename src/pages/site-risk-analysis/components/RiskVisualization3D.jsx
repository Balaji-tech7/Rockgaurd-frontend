import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskVisualization3D = ({ selectedSite, riskData, onRiskZoneSelect }) => {
  const svgRef = useRef();
  const [viewMode, setViewMode] = useState('3d');
  const [selectedZone, setSelectedZone] = useState(null);
  const [rotationX, setRotationX] = useState(-20);
  const [rotationY, setRotationY] = useState(45);
  const [zoom, setZoom] = useState(1);

  const mockRiskZones = [
    {
      id: 'zone-1',
      name: 'North Slope Section A',
      riskLevel: 'high',
      probability: 0.85,
      confidence: 0.92,
      coordinates: { x: 150, y: 100, z: 80 },
      area: 2500,
      lastUpdated: new Date(Date.now() - 300000)
    },
    {
      id: 'zone-2',
      name: 'East Wall Section B',
      riskLevel: 'medium',
      probability: 0.45,
      confidence: 0.78,
      coordinates: { x: 300, y: 150, z: 120 },
      area: 1800,
      lastUpdated: new Date(Date.now() - 600000)
    },
    {
      id: 'zone-3',
      name: 'South Bench Level 3',
      riskLevel: 'low',
      probability: 0.15,
      confidence: 0.88,
      coordinates: { x: 200, y: 250, z: 60 },
      area: 3200,
      lastUpdated: new Date(Date.now() - 900000)
    },
    {
      id: 'zone-4',
      name: 'West Slope Section C',
      riskLevel: 'critical',
      probability: 0.95,
      confidence: 0.96,
      coordinates: { x: 100, y: 200, z: 140 },
      area: 1200,
      lastUpdated: new Date(Date.now() - 180000)
    }
  ];

  const getRiskColor = (riskLevel) => {
    const colors = {
      'critical': '#DC2626',
      'high': '#EA580C',
      'medium': '#D97706',
      'low': '#059669'
    };
    return colors?.[riskLevel] || '#6B7280';
  };

  useEffect(() => {
    if (!svgRef?.current) return;

    const svg = d3?.select(svgRef?.current);
    svg?.selectAll('*')?.remove();

    const width = 800;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg?.attr('width', width)?.attr('height', height);

    const g = svg?.append('g')?.attr('transform', `translate(${width/2}, ${height/2})`);

    // Create 3D projection
    const project3D = (x, y, z) => {
      const radX = (rotationX * Math.PI) / 180;
      const radY = (rotationY * Math.PI) / 180;
      
      // Apply rotations
      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);
      
      const x1 = x * cosY - z * sinY;
      const y1 = y * cosX - (x * sinY + z * cosY) * sinX;
      
      return {
        x: x1 * zoom,
        y: y1 * zoom
      };
    };

    // Draw mine terrain
    const terrainPoints = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 15; j++) {
        const x = (i - 10) * 20;
        const y = (j - 7) * 20;
        const z = Math.sin(i * 0.3) * Math.cos(j * 0.3) * 30;
        terrainPoints?.push({ x, y, z });
      }
    }

    // Draw terrain mesh
    g?.selectAll('.terrain-point')?.data(terrainPoints)?.enter()?.append('circle')?.attr('class', 'terrain-point')?.attr('cx', d => project3D(d?.x, d?.y, d?.z)?.x)?.attr('cy', d => project3D(d?.x, d?.y, d?.z)?.y)?.attr('r', 1)?.attr('fill', '#94A3B8')?.attr('opacity', 0.3);

    // Draw risk zones
    g?.selectAll('.risk-zone')?.data(mockRiskZones)?.enter()?.append('g')?.attr('class', 'risk-zone')?.each(function(d) {
        const zone = d3?.select(this);
        const projected = project3D(d?.coordinates?.x - 200, d?.coordinates?.y - 200, d?.coordinates?.z);
        
        // Zone circle
        zone?.append('circle')?.attr('cx', projected?.x)?.attr('cy', projected?.y)?.attr('r', Math.sqrt(d?.area) / 10)?.attr('fill', getRiskColor(d?.riskLevel))?.attr('opacity', 0.7)?.attr('stroke', getRiskColor(d?.riskLevel))?.attr('stroke-width', 2)?.style('cursor', 'pointer')?.on('click', () => {
            setSelectedZone(d);
            onRiskZoneSelect?.(d);
          });

        // Risk probability text
        zone?.append('text')?.attr('x', projected?.x)?.attr('y', projected?.y + 5)?.attr('text-anchor', 'middle')?.attr('fill', 'white')?.attr('font-size', '12px')?.attr('font-weight', 'bold')?.text(`${Math.round(d?.probability * 100)}%`);
      });

  }, [rotationX, rotationY, zoom, selectedSite]);

  const handleRotationChange = (axis, delta) => {
    if (axis === 'x') {
      setRotationX(prev => Math.max(-90, Math.min(90, prev + delta)));
    } else {
      setRotationY(prev => prev + delta);
    }
  };

  const handleZoomChange = (delta) => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const resetView = () => {
    setRotationX(-20);
    setRotationY(45);
    setZoom(1);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            3D Risk Visualization
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive mine slope analysis for {selectedSite}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === '3d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('3d')}
          >
            3D View
          </Button>
          <Button
            variant={viewMode === 'top' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('top')}
          >
            Top View
          </Button>
        </div>
      </div>
      <div className="relative">
        <svg
          ref={svgRef}
          className="w-full border border-border rounded-lg bg-slate-50"
          style={{ minHeight: '500px' }}
        />

        {/* 3D Controls */}
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Controls</div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleRotationChange('x', -10)}
            >
              <Icon name="ChevronUp" size={12} />
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleRotationChange('x', 10)}
            >
              <Icon name="ChevronDown" size={12} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleRotationChange('y', -10)}
            >
              <Icon name="ChevronLeft" size={12} />
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleRotationChange('y', 10)}
            >
              <Icon name="ChevronRight" size={12} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleZoomChange(0.1)}
            >
              <Icon name="ZoomIn" size={12} />
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleZoomChange(-0.1)}
            >
              <Icon name="ZoomOut" size={12} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="xs"
            onClick={resetView}
            className="w-full"
          >
            Reset
          </Button>
        </div>

        {/* Risk Legend */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3">
          <div className="text-xs font-medium text-muted-foreground mb-2">Risk Levels</div>
          <div className="space-y-1">
            {[
              { level: 'critical', label: 'Critical', color: '#DC2626' },
              { level: 'high', label: 'High', color: '#EA580C' },
              { level: 'medium', label: 'Medium', color: '#D97706' },
              { level: 'low', label: 'Low', color: '#059669' }
            ]?.map(item => (
              <div key={item?.level} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-xs text-foreground">{item?.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Selected Zone Details */}
      {selectedZone && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">{selectedZone?.name}</h4>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setSelectedZone(null)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Risk Probability</span>
              <div className="font-medium text-foreground">
                {Math.round(selectedZone?.probability * 100)}%
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Confidence</span>
              <div className="font-medium text-foreground">
                {Math.round(selectedZone?.confidence * 100)}%
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Area</span>
              <div className="font-medium text-foreground">
                {selectedZone?.area?.toLocaleString()} m²
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Last Updated</span>
              <div className="font-medium text-foreground">
                {selectedZone?.lastUpdated?.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskVisualization3D;