import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InnovationTrackerCard = ({ innovation }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'leading': return 'text-success';
      case 'growing': return 'text-primary';
      case 'emerging': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'leading': return 'bg-success/20';
      case 'growing': return 'bg-primary/20';
      case 'emerging': return 'bg-warning/20';
      default: return 'bg-muted/20';
    }
  };

  return (
    <div 
      className="glassmorphism p-6 rounded-xl neon-border hover:elevation-primary transition-smooth cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg bg-gradient-to-br from-primary to-accent holographic-glow`}>
            <Icon name={innovation?.icon} size={24} color="#0a0a0f" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              {innovation?.title}
            </h3>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getStatusBg(innovation?.status)} ${getStatusColor(innovation?.status)}`}>
              {innovation?.status?.charAt(0)?.toUpperCase() + innovation?.status?.slice(1)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-heading font-bold text-primary">
            {innovation?.adoptionRate}%
          </div>
          <div className="text-xs text-muted-foreground font-caption">
            Adoption Rate
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-caption mb-4">
        {innovation?.description}
      </p>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-muted-foreground font-caption">Progress</span>
          <span className="text-primary font-data">{innovation?.adoptionRate}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 ease-out pulse-glow"
            style={{ width: `${innovation?.adoptionRate}%` }}
          />
        </div>
      </div>
      {/* Hover Analytics */}
      {isHovered && (
        <div className="animate-slide-in">
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-caption">Regional Leader:</span>
              <span className="text-xs text-foreground font-data">{innovation?.regionalLeader}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-caption">Investment Flow:</span>
              <span className="text-xs text-success font-data">${innovation?.investmentFlow}B</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-caption">Growth Rate:</span>
              <div className="flex items-center space-x-1">
                <Icon 
                  name="TrendingUp" 
                  size={12} 
                  className="text-success" 
                />
                <span className="text-xs text-success font-data">{innovation?.growthRate}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-caption">Market Size:</span>
              <span className="text-xs text-accent font-data">${innovation?.marketSize}B</span>
            </div>
          </div>
        </div>
      )}
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center">
          <div className="text-lg font-heading font-bold text-accent">
            {innovation?.implementations}
          </div>
          <div className="text-xs text-muted-foreground font-caption">
            Implementations
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading font-bold text-secondary">
            {innovation?.countries}
          </div>
          <div className="text-xs text-muted-foreground font-caption">
            Countries
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationTrackerCard;