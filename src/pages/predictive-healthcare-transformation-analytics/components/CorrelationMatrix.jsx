import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CorrelationMatrix = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [viewMode, setViewMode] = useState('heatmap');

  const technologies = [
    { id: 'ai_diagnostics', name: 'AI Diagnostics', shortName: 'AI Diag' },
    { id: 'telemedicine', name: 'Telemedicine', shortName: 'Tele' },
    { id: 'robotic_surgery', name: 'Robotic Surgery', shortName: 'Robot' },
    { id: 'gene_therapy', name: 'Gene Therapy', shortName: 'Gene' },
    { id: 'wearables', name: 'Wearable Devices', shortName: 'Wear' },
    { id: 'blockchain', name: 'Blockchain Health', shortName: 'Block' }
  ];

  const correlationData = {
    ai_diagnostics: {
      ai_diagnostics: 1.00,
      telemedicine: 0.78,
      robotic_surgery: 0.65,
      gene_therapy: 0.42,
      wearables: 0.83,
      blockchain: 0.56
    },
    telemedicine: {
      ai_diagnostics: 0.78,
      telemedicine: 1.00,
      robotic_surgery: 0.45,
      gene_therapy: 0.38,
      wearables: 0.72,
      blockchain: 0.61
    },
    robotic_surgery: {
      ai_diagnostics: 0.65,
      telemedicine: 0.45,
      robotic_surgery: 1.00,
      gene_therapy: 0.52,
      wearables: 0.48,
      blockchain: 0.39
    },
    gene_therapy: {
      ai_diagnostics: 0.42,
      telemedicine: 0.38,
      robotic_surgery: 0.52,
      gene_therapy: 1.00,
      wearables: 0.35,
      blockchain: 0.44
    },
    wearables: {
      ai_diagnostics: 0.83,
      telemedicine: 0.72,
      robotic_surgery: 0.48,
      gene_therapy: 0.35,
      wearables: 1.00,
      blockchain: 0.67
    },
    blockchain: {
      ai_diagnostics: 0.56,
      telemedicine: 0.61,
      robotic_surgery: 0.39,
      gene_therapy: 0.44,
      wearables: 0.67,
      blockchain: 1.00
    }
  };

  const getCorrelationColor = (value) => {
    if (value === 1.00) return 'bg-primary text-background';
    if (value >= 0.7) return 'bg-success/80 text-background';
    if (value >= 0.5) return 'bg-accent/60 text-background';
    if (value >= 0.3) return 'bg-warning/60 text-background';
    return 'bg-destructive/60 text-background';
  };

  const getCorrelationStrength = (value) => {
    if (value === 1.00) return 'Perfect';
    if (value >= 0.7) return 'Strong';
    if (value >= 0.5) return 'Moderate';
    if (value >= 0.3) return 'Weak';
    return 'Very Weak';
  };

  const getInsight = (tech1, tech2, value) => {
    const insights = {
      'ai_diagnostics-wearables': `AI diagnostics and wearable devices show strong synergy (${value}) due to continuous health monitoring integration.`,
      'ai_diagnostics-telemedicine': `AI diagnostics enhances telemedicine effectiveness (${value}) through automated preliminary assessments.`,
      'telemedicine-wearables': `Telemedicine platforms leverage wearable data (${value}) for remote patient monitoring and care.`,
      'wearables-blockchain': `Wearable devices benefit from blockchain security (${value}) for health data integrity and privacy.`,
      'robotic_surgery-gene_therapy': `Robotic surgery and gene therapy correlation (${value}) reflects precision medicine advancement.`
    };
    
    const key = `${tech1}-${tech2}`;
    const reverseKey = `${tech2}-${tech1}`;
    
    return insights?.[key] || insights?.[reverseKey] || `These technologies show ${getCorrelationStrength(value)?.toLowerCase()} interdependence (${value}) in healthcare transformation.`;
  };

  return (
    <div className="glassmorphism rounded-xl border border-primary/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Technology Correlation Matrix
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Interdependency analysis of healthcare technologies
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-card/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-3 py-1 rounded text-xs font-data transition-smooth ${
                viewMode === 'heatmap' ?'bg-primary text-background' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Heatmap
            </button>
            <button
              onClick={() => setViewMode('network')}
              className={`px-3 py-1 rounded text-xs font-data transition-smooth ${
                viewMode === 'network' ?'bg-primary text-background' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Network
            </button>
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export Matrix
          </Button>
        </div>
      </div>
      {/* Correlation Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            <div className="h-12"></div>
            {technologies?.map((tech) => (
              <div key={tech?.id} className="h-12 flex items-center justify-center">
                <span className="text-xs font-data text-muted-foreground transform -rotate-45 origin-center">
                  {tech?.shortName}
                </span>
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          {technologies?.map((rowTech, rowIndex) => (
            <div key={rowTech?.id} className="grid grid-cols-7 gap-1 mb-1">
              {/* Row Label */}
              <div className="h-12 flex items-center justify-end pr-2">
                <span className="text-xs font-data text-muted-foreground">
                  {rowTech?.shortName}
                </span>
              </div>
              
              {/* Correlation Cells */}
              {technologies?.map((colTech, colIndex) => {
                const value = correlationData?.[rowTech?.id]?.[colTech?.id];
                const isSelected = selectedCell === `${rowTech?.id}-${colTech?.id}`;
                
                return (
                  <button
                    key={colTech?.id}
                    onClick={() => setSelectedCell(`${rowTech?.id}-${colTech?.id}`)}
                    className={`h-12 rounded-lg transition-smooth border-2 ${
                      isSelected 
                        ? 'border-primary neon-border scale-110' :'border-transparent hover:border-primary/40'
                    } ${getCorrelationColor(value)}`}
                  >
                    <span className="font-data font-bold text-sm">
                      {value?.toFixed(2)}
                    </span>
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
          <span className="text-sm font-heading font-medium text-foreground">
            Correlation Strength:
          </span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded bg-success/80"></div>
              <span className="text-xs font-data text-muted-foreground">Strong (0.7+)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded bg-accent/60"></div>
              <span className="text-xs font-data text-muted-foreground">Moderate (0.5+)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded bg-warning/60"></div>
              <span className="text-xs font-data text-muted-foreground">Weak (0.3+)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded bg-destructive/60"></div>
              <span className="text-xs font-data text-muted-foreground">Very Weak (&lt;0.3)</span>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Cell Insight */}
      {selectedCell && (
        <div className="mt-6 p-4 bg-card/30 rounded-lg border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-2">
                Correlation Insight
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {(() => {
                  const [tech1, tech2] = selectedCell?.split('-');
                  const value = correlationData?.[tech1]?.[tech2];
                  return getInsight(tech1, tech2, value);
                })()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrelationMatrix;