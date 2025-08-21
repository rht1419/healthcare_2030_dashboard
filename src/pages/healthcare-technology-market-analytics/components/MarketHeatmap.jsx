import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MarketHeatmap = ({ filters }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [viewMode, setViewMode] = useState('adoption');

  const technologies = [
    'AI Diagnostics',
    'Telemedicine',
    'Surgical Robotics',
    'Wearable Devices',
    'Gene Therapy',
    'VR/AR Therapy',
    'Digital Therapeutics',
    'Precision Medicine'
  ];

  const regions = [
    'North America',
    'Europe',
    'Asia Pacific',
    'Latin America',
    'Middle East',
    'Africa'
  ];

  const generateHeatmapData = () => {
    const data = {};
    technologies?.forEach(tech => {
      data[tech] = {};
      regions?.forEach(region => {
        const baseValue = Math.random() * 100;
        data[tech][region] = {
          adoption: Math.round(baseValue),
          investment: Math.round(baseValue * 1.2 + Math.random() * 50),
          growth: Math.round((Math.random() * 40) + 10),
          marketSize: Math.round(baseValue * 10 + Math.random() * 500)
        };
      });
    });
    return data;
  };

  const [heatmapData] = useState(generateHeatmapData());

  const getIntensityColor = (value, maxValue = 100) => {
    const intensity = value / maxValue;
    if (intensity >= 0.8) return 'bg-success/80 text-background';
    if (intensity >= 0.6) return 'bg-primary/80 text-background';
    if (intensity >= 0.4) return 'bg-warning/80 text-background';
    if (intensity >= 0.2) return 'bg-secondary/60 text-foreground';
    return 'bg-muted/40 text-muted-foreground';
  };

  const getValueByMode = (techData) => {
    switch (viewMode) {
      case 'adoption': return techData?.adoption;
      case 'investment': return techData?.investment;
      case 'growth': return techData?.growth;
      case 'marketSize': return techData?.marketSize;
      default: return techData?.adoption;
    }
  };

  const getMaxValue = () => {
    switch (viewMode) {
      case 'adoption': return 100;
      case 'investment': return 200;
      case 'growth': return 50;
      case 'marketSize': return 1000;
      default: return 100;
    }
  };

  const formatValue = (value) => {
    switch (viewMode) {
      case 'adoption': return `${value}%`;
      case 'investment': return `$${value}M`;
      case 'growth': return `${value}%`;
      case 'marketSize': return `$${value}M`;
      default: return `${value}%`;
    }
  };

  const viewModes = [
    { key: 'adoption', label: 'Adoption Rate', icon: 'TrendingUp' },
    { key: 'investment', label: 'Investment Volume', icon: 'DollarSign' },
    { key: 'growth', label: 'Growth Rate', icon: 'BarChart3' },
    { key: 'marketSize', label: 'Market Size', icon: 'PieChart' }
  ];

  return (
    <div className="glassmorphism rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Market Penetration Heatmap
          </h3>
          <p className="text-sm text-muted-foreground">
            Technology adoption across global regions
          </p>
        </div>
        
        <div className="flex space-x-2">
          {viewModes?.map(mode => (
            <button
              key={mode?.key}
              onClick={() => setViewMode(mode?.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${
                viewMode === mode?.key
                  ? 'bg-primary/20 text-primary neon-border' :'bg-card/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={mode?.icon} size={16} />
              <span className="text-sm font-medium hidden lg:block">{mode?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            <div className="p-3 text-sm font-heading font-medium text-muted-foreground">
              Technology / Region
            </div>
            {regions?.map(region => (
              <div key={region} className="p-3 text-sm font-heading font-medium text-center text-muted-foreground">
                {region}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {technologies?.map(tech => (
            <div key={tech} className="grid grid-cols-7 gap-2 mb-2">
              <div className="p-3 text-sm font-medium text-foreground bg-card/30 rounded-lg">
                {tech}
              </div>
              {regions?.map(region => {
                const cellData = heatmapData?.[tech]?.[region];
                const value = getValueByMode(cellData);
                const maxValue = getMaxValue();
                
                return (
                  <button
                    key={`${tech}-${region}`}
                    onClick={() => setSelectedCell({ tech, region, data: cellData })}
                    className={`p-3 rounded-lg text-sm font-data font-medium transition-smooth hover:scale-105 ${
                      getIntensityColor(value, maxValue)
                    } ${selectedCell?.tech === tech && selectedCell?.region === region ? 'ring-2 ring-primary' : ''}`}
                  >
                    {formatValue(value)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Intensity:</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted/40 rounded"></div>
            <span className="text-xs text-muted-foreground">Low</span>
            <div className="w-4 h-4 bg-warning/80 rounded"></div>
            <span className="text-xs text-muted-foreground">Medium</span>
            <div className="w-4 h-4 bg-success/80 rounded"></div>
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>

        {selectedCell && (
          <div className="glassmorphism px-4 py-2 rounded-lg">
            <div className="text-sm font-medium text-foreground">
              {selectedCell?.tech} - {selectedCell?.region}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Adoption: {selectedCell?.data?.adoption}% | 
              Investment: ${selectedCell?.data?.investment}M | 
              Growth: {selectedCell?.data?.growth}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketHeatmap;