import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SmartHealthEcosystem = () => {
  const [animationState, setAnimationState] = useState('idle');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const ecosystemData = {
    connectedDevices: {
      total: 2847392,
      active: 2634891,
      categories: [
        { name: 'Wearables', count: 1245678, percentage: 44, icon: 'Watch', color: '#00d4ff' },
        { name: 'Bio-sensors', count: 892341, percentage: 31, icon: 'Activity', color: '#00ffa1' },
        { name: 'Smart Implants', count: 356789, percentage: 13, icon: 'Zap', color: '#39ff14' },
        { name: 'Monitoring Devices', count: 352584, percentage: 12, icon: 'Monitor', color: '#ffa500' }
      ]
    },
    dataFlows: [
      { from: 'wearables', to: 'cloud', volume: '2.4TB/hr', latency: '12ms' },
      { from: 'biosensors', to: 'ai-analysis', volume: '1.8TB/hr', latency: '8ms' },
      { from: 'implants', to: 'emergency', volume: '340GB/hr', latency: '3ms' },
      { from: 'monitors', to: 'healthcare', volume: '1.2TB/hr', latency: '15ms' }
    ],
    patientOutcomes: {
      lifespan: { improvement: '+3.2 years', trend: 'up' },
      diagnosis: { accuracy: '94.7%', improvement: '+12%' },
      treatment: { effectiveness: '89.3%', improvement: '+8%' },
      prevention: { success: '76.8%', improvement: '+15%' }
    }
  };

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationState(prev => prev === 'idle' ? 'pulse' : 'idle');
    }, 3000);

    return () => clearInterval(animationInterval);
  }, []);

  const HeartVisualization = () => (
    <div className="relative w-16 h-16 mx-auto mb-4">
      <div className={`absolute inset-0 transition-transform duration-1000 ${
        animationState === 'pulse' ? 'scale-110' : 'scale-100'
      }`}>
        <Icon 
          name="Heart" 
          size={64} 
          className="text-destructive drop-shadow-lg"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255, 71, 87, 0.5))'
          }}
        />
      </div>
      <div className="absolute inset-0 animate-ping">
        <Icon 
          name="Heart" 
          size={64} 
          className="text-destructive opacity-20"
        />
      </div>
    </div>
  );

  const DataFlowAnimation = ({ flow, index }) => (
    <div 
      key={flow?.from}
      className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-border hover:border-primary/40 transition-smooth"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-primary rounded-full pulse-glow" />
        <div>
          <p className="text-sm font-medium text-foreground capitalize">
            {flow?.from?.replace('-', ' ')} → {flow?.to?.replace('-', ' ')}
          </p>
          <p className="text-xs text-muted-foreground">
            {flow?.volume} • {flow?.latency} latency
          </p>
        </div>
      </div>
      <div className="flex space-x-1">
        {[...Array(3)]?.map((_, i) => (
          <div
            key={i}
            className="w-1 h-4 bg-primary/60 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="glassmorphism rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Network" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            Smart Health Ecosystem
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
          <span className="text-xs font-data text-muted-foreground">
            Live Data Flows
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connected Devices Overview */}
        <div className="lg:col-span-1">
          <div className="text-center mb-6">
            <HeartVisualization />
            <h4 className="font-heading font-semibold text-lg text-foreground mb-1">
              Connected Health Network
            </h4>
            <p className="text-sm text-muted-foreground">
              Real-time patient monitoring ecosystem
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-center p-4 rounded-lg bg-card/30 border border-border">
              <div className="text-2xl font-bold text-primary mb-1">
                {ecosystemData?.connectedDevices?.total?.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Devices</div>
            </div>

            {ecosystemData?.connectedDevices?.categories?.map((category) => (
              <div
                key={category?.name}
                className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-border hover:border-primary/40 transition-smooth cursor-pointer"
                onClick={() => setSelectedDevice(category)}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={category?.icon} 
                    size={16} 
                    style={{ color: category?.color }}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {category?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {category?.count?.toLocaleString()} devices
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold" style={{ color: category?.color }}>
                    {category?.percentage}%
                  </div>
                  <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${category?.percentage}%`,
                        backgroundColor: category?.color
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Flows */}
        <div className="lg:col-span-1">
          <h4 className="font-heading font-semibold text-foreground mb-4">
            Real-time Data Flows
          </h4>
          <div className="space-y-3">
            {ecosystemData?.dataFlows?.map((flow, index) => (
              <DataFlowAnimation key={flow?.from} flow={flow} index={index} />
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                Processing Power
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              AI Analysis Throughput
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-4/5 animate-pulse" />
              </div>
              <span className="text-xs font-data text-primary">
                87.3%
              </span>
            </div>
          </div>
        </div>

        {/* Patient Outcomes */}
        <div className="lg:col-span-1">
          <h4 className="font-heading font-semibold text-foreground mb-4">
            Patient Outcome Improvements
          </h4>
          <div className="space-y-4">
            {Object.entries(ecosystemData?.patientOutcomes)?.map(([key, outcome]) => (
              <div key={key} className="p-4 rounded-lg bg-card/30 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {key === 'lifespan' ? 'Life Expectancy' : key}
                  </span>
                  <Icon 
                    name={outcome?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    className="text-success" 
                  />
                </div>
                <div className="text-lg font-bold text-primary mb-1">
                  {outcome?.improvement || outcome?.accuracy || outcome?.effectiveness || outcome?.success}
                </div>
                {outcome?.improvement && (
                  <div className="text-xs text-success">
                    {outcome?.improvement} improvement
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-success/10 to-accent/10 border border-success/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">
                System Reliability
              </span>
            </div>
            <div className="text-2xl font-bold text-success mb-1">
              99.97%
            </div>
            <div className="text-xs text-muted-foreground">
              Uptime across all connected devices
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHealthEcosystem;