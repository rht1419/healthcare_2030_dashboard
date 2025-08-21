import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AnimatedTimeline = ({ timelineData }) => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const years = [2025, 2026, 2027, 2028, 2029, 2030];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleYearSelect = (year) => {
    setCurrentYear(year);
    setAnimationProgress((year - 2025) * 20);
  };

  const toggleAnimation = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (animationProgress >= 100) {
        setAnimationProgress(0);
      }
    }
  };

  const getCurrentYearData = () => {
    return timelineData?.find(data => data?.year === currentYear) || timelineData?.[0];
  };

  const currentData = getCurrentYearData();

  return (
    <div className="glassmorphism p-6 rounded-xl neon-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Healthcare Evolution Timeline
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            2025-2030 transformation milestones
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleAnimation}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-smooth"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
            <span className="text-sm font-heading font-medium">
              {isPlaying ? 'Pause' : 'Play'} Timeline
            </span>
          </button>
        </div>
      </div>
      {/* Year Selector */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {years?.map((year) => (
          <button
            key={year}
            onClick={() => handleYearSelect(year)}
            className={`px-4 py-2 rounded-lg transition-smooth ${
              currentYear === year
                ? 'bg-primary/20 text-primary neon-border' :'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/70'
            }`}
          >
            <span className="font-heading font-bold">{year}</span>
          </button>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-border rounded-full h-2 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300 pulse-glow"
            style={{ width: `${animationProgress}%` }}
          />
          {/* DNA Helix Animation */}
          <div 
            className="absolute top-0 h-2 w-8 bg-gradient-to-r from-transparent via-success to-transparent opacity-70 transition-all duration-300"
            style={{ 
              left: `${Math.max(0, animationProgress - 8)}%`,
              transform: `rotate(${animationProgress * 3.6}deg)`
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground font-caption mt-2">
          <span>2025</span>
          <span className="text-primary font-data">{Math.round(animationProgress)}% Complete</span>
          <span>2030</span>
        </div>
      </div>
      {/* Current Year Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Key Milestones */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Target" size={20} className="text-primary" />
            <span>{currentYear} Key Milestones</span>
          </h3>
          {currentData?.milestones?.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-card/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name={milestone?.icon} size={16} color="#0a0a0f" />
              </div>
              <div>
                <h4 className="font-heading font-medium text-foreground text-sm">
                  {milestone?.title}
                </h4>
                <p className="text-xs text-muted-foreground font-caption">
                  {milestone?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Innovation Metrics */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-accent" />
            <span>Innovation Metrics</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {currentData?.metrics?.map((metric, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-card/30">
                <div className="text-2xl font-heading font-bold text-primary mb-1">
                  {metric?.value}
                </div>
                <div className="text-xs text-muted-foreground font-caption">
                  {metric?.label}
                </div>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Icon 
                    name={metric?.trend === 'up' ? "TrendingUp" : "TrendingDown"} 
                    size={12} 
                    className={metric?.trend === 'up' ? "text-success" : "text-destructive"} 
                  />
                  <span className={`text-xs font-data ${metric?.trend === 'up' ? "text-success" : "text-destructive"}`}>
                    {metric?.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Animated DNA Helix Visualization */}
      <div className="relative h-32 bg-gradient-to-r from-background via-card to-background rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* DNA Helix Animation */}
          <div 
            className="relative w-full h-16"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1) 50%, transparent)`,
              transform: `translateX(${(animationProgress - 50) * 2}%)`
            }}
          >
            {[...Array(20)]?.map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: `${i * 5}%`,
                  top: `${50 + Math.sin((i + animationProgress * 0.1) * 0.5) * 20}%`,
                  opacity: Math.max(0.3, 1 - Math.abs(i * 5 - animationProgress) / 50),
                  transform: `rotate(${animationProgress + i * 18}deg)`
                }}
              />
            ))}
            {[...Array(20)]?.map((_, i) => (
              <div
                key={`helix-${i}`}
                className="absolute w-2 h-2 bg-accent rounded-full"
                style={{
                  left: `${i * 5}%`,
                  top: `${50 - Math.sin((i + animationProgress * 0.1) * 0.5) * 20}%`,
                  opacity: Math.max(0.3, 1 - Math.abs(i * 5 - animationProgress) / 50),
                  transform: `rotate(${-animationProgress - i * 18}deg)`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Beating Heart Visualization */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <div 
            className="w-8 h-8 text-destructive"
            style={{
              transform: `scale(${1 + Math.sin(animationProgress * 0.2) * 0.2})`,
              filter: `drop-shadow(0 0 10px rgba(255, 71, 87, 0.5))`
            }}
          >
            <Icon name="Heart" size={32} className="text-destructive" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTimeline;