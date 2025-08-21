import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const HolographicGlobe = ({ globalData, onRegionSelect }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    onRegionSelect(region);
  };

  const getRegionColor = (penetration) => {
    if (penetration >= 80) return 'text-success';
    if (penetration >= 60) return 'text-primary';
    if (penetration >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getRegionSize = (penetration) => {
    if (penetration >= 80) return 'w-4 h-4';
    if (penetration >= 60) return 'w-3 h-3';
    return 'w-2 h-2';
  };

  return (
    <div className="glassmorphism p-6 rounded-xl neon-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Global Health Technology Map
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Interactive regional penetration analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
          <span className="text-xs font-data text-success">Live Data</span>
        </div>
      </div>
      {/* 3D Globe Container */}
      <div className="relative h-96 bg-gradient-to-br from-background to-card rounded-lg overflow-hidden mb-6">
        {/* Holographic Globe Effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            background: `conic-gradient(from ${rotationAngle}deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 161, 0.1), rgba(138, 43, 226, 0.1), rgba(0, 212, 255, 0.1))`
          }}
        />
        
        {/* Globe Grid Lines */}
        <div className="absolute inset-0">
          {[...Array(8)]?.map((_, i) => (
            <div
              key={`lat-${i}`}
              className="absolute border-t border-primary/20"
              style={{
                top: `${(i + 1) * 12.5}%`,
                left: '10%',
                right: '10%',
                transform: `perspective(400px) rotateX(${rotationAngle * 0.5}deg)`
              }}
            />
          ))}
          {[...Array(6)]?.map((_, i) => (
            <div
              key={`lng-${i}`}
              className="absolute border-l border-primary/20 h-4/5 top-1/2 transform -translate-y-1/2"
              style={{
                left: `${10 + (i + 1) * 13.33}%`,
                transform: `translateY(-50%) perspective(400px) rotateY(${rotationAngle * 0.3}deg)`
              }}
            />
          ))}
        </div>

        {/* Regional Data Points */}
        <div className="absolute inset-0">
          {globalData?.regions?.map((region, index) => (
            <div
              key={region?.id}
              className={`absolute cursor-pointer transition-all duration-300 hover:scale-150 ${getRegionSize(region?.penetration)}`}
              style={{
                left: `${region?.x}%`,
                top: `${region?.y}%`,
                transform: `translate(-50%, -50%) perspective(400px) rotateY(${rotationAngle * 0.2}deg)`
              }}
              onClick={() => handleRegionClick(region)}
            >
              <div className={`w-full h-full rounded-full ${getRegionColor(region?.penetration)} bg-current pulse-glow`} />
              {selectedRegion?.id === region?.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 glassmorphism p-2 rounded-lg border border-primary/20 whitespace-nowrap animate-slide-in z-10">
                  <div className="text-xs font-heading font-semibold text-foreground">
                    {region?.name}
                  </div>
                  <div className="text-xs text-muted-foreground font-caption">
                    {region?.penetration}% penetration
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Central Holographic Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-32 h-32 rounded-full border-2 border-primary/30 animate-pulse"
            style={{
              transform: `perspective(400px) rotateX(${rotationAngle * 0.5}deg) rotateY(${rotationAngle * 0.3}deg)`,
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)'
            }}
          />
        </div>
      </div>
      {/* Region Details Panel */}
      {selectedRegion && (
        <div className="glassmorphism p-4 rounded-lg border border-primary/20 animate-slide-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-semibold text-foreground">
              {selectedRegion?.name}
            </h3>
            <button
              onClick={() => setSelectedRegion(null)}
              className="p-1 rounded hover:bg-card/50 transition-smooth"
            >
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-primary">
                {selectedRegion?.telemedicine}%
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Telemedicine
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-accent">
                {selectedRegion?.wearables}%
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Wearables
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-secondary">
                {selectedRegion?.aiDiagnostics}%
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                AI Diagnostics
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-success">
                +{selectedRegion?.lifespanImprovement}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Years Lifespan
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full pulse-glow" />
          <span className="text-xs font-caption text-muted-foreground">80%+ Penetration</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-xs font-caption text-muted-foreground">60-79% Penetration</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded-full" />
          <span className="text-xs font-caption text-muted-foreground">40-59% Penetration</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-destructive rounded-full" />
          <span className="text-xs font-caption text-muted-foreground">&lt;40% Penetration</span>
        </div>
      </div>
    </div>
  );
};

export default HolographicGlobe;