import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusStrip = ({ systemStatus = [] }) => {
  const mockSystemStatus = [
    {
      id: 'ai-diagnostics',
      name: 'AI Diagnostics',
      status: 'operational',
      uptime: '99.8%',
      lastUpdate: '2 min ago',
      deployments: 1247,
      icon: 'Brain'
    },
    {
      id: 'telemedicine',
      name: 'Telemedicine',
      status: 'warning',
      uptime: '97.2%',
      lastUpdate: '1 min ago',
      deployments: 892,
      icon: 'Video'
    },
    {
      id: 'surgical-robotics',
      name: 'Surgical Robotics',
      status: 'operational',
      uptime: '99.9%',
      lastUpdate: '30 sec ago',
      deployments: 156,
      icon: 'Zap'
    },
    {
      id: 'gene-editing',
      name: 'Gene Editing',
      status: 'critical',
      uptime: '94.1%',
      lastUpdate: '5 min ago',
      deployments: 23,
      icon: 'Dna'
    },
    {
      id: 'vr-therapy',
      name: 'VR Therapy',
      status: 'operational',
      uptime: '98.7%',
      lastUpdate: '1 min ago',
      deployments: 334,
      icon: 'Glasses'
    }
  ];

  const statusData = systemStatus?.length > 0 ? systemStatus : mockSystemStatus;

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="w-full bg-card/30 border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          System Health Overview
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
          <span className="text-xs font-data text-muted-foreground">
            Live Monitoring
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statusData?.map((system) => (
          <div
            key={system?.id}
            className="glassmorphism rounded-lg p-4 hover:elevation-primary transition-smooth"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={system?.icon} 
                  size={20} 
                  className="text-primary" 
                />
                <span className="font-heading font-medium text-sm text-foreground">
                  {system?.name}
                </span>
              </div>
              <div className={`px-2 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(system?.status)}`}>
                <Icon 
                  name={getStatusIcon(system?.status)} 
                  size={12} 
                />
                <span className="text-xs font-data capitalize">
                  {system?.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Uptime</span>
                <span className="text-xs font-data text-foreground font-medium">
                  {system?.uptime}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Deployments</span>
                <span className="text-xs font-data text-primary font-medium">
                  {system?.deployments?.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Updated</span>
                <span className="text-xs font-data text-accent">
                  {system?.lastUpdate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatusStrip;