import React from 'react';
import Icon from '../../../components/AppIcon';

const HeroKPIPanel = ({ kpiData }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-primary';
    if (percentage >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressGradient = (percentage) => {
    if (percentage >= 80) return 'from-success to-accent';
    if (percentage >= 60) return 'from-primary to-accent';
    if (percentage >= 40) return 'from-warning to-primary';
    return 'from-destructive to-warning';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {kpiData?.map((kpi, index) => (
        <div key={kpi?.id} className="glassmorphism p-6 rounded-xl neon-border hover:elevation-primary transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${getProgressGradient(kpi?.value)} holographic-glow`}>
              <Icon name={kpi?.icon} size={24} color="#0a0a0f" strokeWidth={2.5} />
            </div>
            <div className="text-right">
              <div className={`text-2xl font-heading font-bold ${getProgressColor(kpi?.value)}`}>
                {kpi?.value}%
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                {kpi?.change > 0 ? '+' : ''}{kpi?.change}% vs last month
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-heading font-semibold text-foreground text-sm mb-1">
              {kpi?.title}
            </h3>
            <p className="text-xs text-muted-foreground font-caption">
              {kpi?.description}
            </p>
          </div>

          {/* Animated Progress Ring */}
          <div className="relative w-16 h-16 mx-auto">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-border"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - kpi?.value / 100)}`}
                className={`${getProgressColor(kpi?.value)} transition-all duration-1000 ease-out pulse-glow`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xs font-data font-bold ${getProgressColor(kpi?.value)}`}>
                {kpi?.value}%
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-caption">
              Target: {kpi?.target}%
            </span>
            <div className="flex items-center space-x-1">
              <Icon 
                name={kpi?.change >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={12} 
                className={kpi?.change >= 0 ? "text-success" : "text-destructive"} 
              />
              <span className={`font-data ${kpi?.change >= 0 ? "text-success" : "text-destructive"}`}>
                {Math.abs(kpi?.change)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroKPIPanel;