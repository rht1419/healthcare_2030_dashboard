import React from 'react';
import Icon from '../../../components/AppIcon';

const MilestoneTracker = ({ milestones }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'upcoming': return 'Circle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-primary';
      case 'upcoming': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getProgressWidth = (progress) => {
    return `${Math.min(progress, 100)}%`;
  };

  return (
    <div className="glassmorphism p-6 rounded-xl neon-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            2030 Milestone Tracker
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Healthcare transformation progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
          <span className="text-xs font-data text-primary">Real-time</span>
        </div>
      </div>
      <div className="space-y-4">
        {milestones?.map((milestone, index) => (
          <div key={milestone?.id} className="relative">
            {/* Timeline Line */}
            {index < milestones?.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
            )}
            
            <div className="flex items-start space-x-4">
              {/* Status Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 ${getStatusColor(milestone?.status)} bg-card/50 flex items-center justify-center`}>
                <Icon 
                  name={getStatusIcon(milestone?.status)} 
                  size={20} 
                  className={getStatusColor(milestone?.status)} 
                />
              </div>

              {/* Milestone Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-semibold text-foreground">
                    {milestone?.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-data text-muted-foreground">
                      {milestone?.targetDate}
                    </span>
                    <div className={`px-2 py-1 rounded-full text-xs font-caption ${
                      milestone?.status === 'completed' ? 'bg-success/20 text-success' :
                      milestone?.status === 'in-progress'? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                    }`}>
                      {milestone?.status?.replace('-', ' ')?.toUpperCase()}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground font-caption mb-3">
                  {milestone?.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-caption">Progress</span>
                    <span className="text-primary font-data">{milestone?.progress}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                        milestone?.status === 'completed' ? 'bg-gradient-to-r from-success to-accent pulse-glow' :
                        milestone?.status === 'in-progress'? 'bg-gradient-to-r from-primary to-accent pulse-glow' : 'bg-gradient-to-r from-muted to-muted-foreground'
                      }`}
                      style={{ width: getProgressWidth(milestone?.progress) }}
                    />
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-heading font-bold text-primary">
                      {milestone?.impact}
                    </div>
                    <div className="text-xs text-muted-foreground font-caption">
                      Impact Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-heading font-bold text-accent">
                      ${milestone?.investment}B
                    </div>
                    <div className="text-xs text-muted-foreground font-caption">
                      Investment
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-heading font-bold text-secondary">
                      {milestone?.stakeholders}
                    </div>
                    <div className="text-xs text-muted-foreground font-caption">
                      Stakeholders
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Overall Progress Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-heading font-semibold text-foreground">
              Overall 2030 Progress
            </h4>
            <p className="text-xs text-muted-foreground font-caption">
              Aggregate transformation metrics
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-heading font-bold text-primary">
              {Math.round(milestones?.reduce((acc, m) => acc + m?.progress, 0) / milestones?.length)}%
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;