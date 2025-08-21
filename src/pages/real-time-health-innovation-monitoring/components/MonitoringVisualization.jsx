import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const MonitoringVisualization = ({ refreshInterval = 30 }) => {
  const [selectedMetric, setSelectedMetric] = useState('deployment');
  const [timeRange, setTimeRange] = useState('1h');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  const mockTimeSeriesData = [
    { time: '15:10', deployment: 85, adoption: 72, performance: 94, alerts: 3 },
    { time: '15:15', deployment: 88, adoption: 75, performance: 91, alerts: 2 },
    { time: '15:20', deployment: 92, adoption: 78, performance: 96, alerts: 1 },
    { time: '15:25', deployment: 87, adoption: 74, performance: 89, alerts: 4 },
    { time: '15:30', deployment: 94, adoption: 81, performance: 97, alerts: 1 },
    { time: '15:35', deployment: 91, adoption: 79, performance: 93, alerts: 2 },
    { time: '15:40', deployment: 96, adoption: 83, performance: 98, alerts: 0 }
  ];

  const metrics = [
    { 
      id: 'deployment', 
      label: 'Deployment Velocity', 
      color: '#00d4ff', 
      icon: 'TrendingUp',
      unit: '%'
    },
    { 
      id: 'adoption', 
      label: 'Adoption Rate', 
      color: '#00ffa1', 
      icon: 'Users',
      unit: '%'
    },
    { 
      id: 'performance', 
      label: 'Performance Score', 
      color: '#39ff14', 
      icon: 'Zap',
      unit: '%'
    },
    { 
      id: 'alerts', 
      label: 'Active Alerts', 
      color: '#ffa500', 
      icon: 'AlertTriangle',
      unit: ''
    }
  ];

  const timeRanges = [
    { value: '15m', label: '15 min' },
    { value: '1h', label: '1 hour' },
    { value: '6h', label: '6 hours' },
    { value: '24h', label: '24 hours' }
  ];

  const currentMetric = metrics?.find(m => m?.id === selectedMetric);
  const currentValue = mockTimeSeriesData?.[mockTimeSeriesData?.length - 1]?.[selectedMetric];

  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      // Simulate real-time data updates
      console.log('Refreshing monitoring data...');
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isAutoRefresh, refreshInterval]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glassmorphism p-3 rounded-lg border border-primary/20">
          <p className="text-xs font-data text-muted-foreground mb-1">
            Time: {label}
          </p>
          {payload?.map((entry) => (
            <p key={entry?.dataKey} className="text-sm font-medium" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}{currentMetric?.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glassmorphism rounded-lg p-6 h-full">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name={currentMetric?.icon} size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              {currentMetric?.label}
            </h3>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-card/50">
            <span className="text-2xl font-bold text-primary">
              {currentValue}{currentMetric?.unit}
            </span>
            <span className="text-xs text-muted-foreground">current</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Auto Refresh Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`relative w-10 h-6 rounded-full transition-smooth ${
                isAutoRefresh ? 'bg-success' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isAutoRefresh ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
            <span className="text-xs text-muted-foreground">Auto-refresh</span>
          </div>

          {/* Time Range Selector */}
          <div className="flex space-x-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`px-3 py-1 rounded text-xs font-data transition-smooth ${
                  timeRange === range?.value
                    ? 'bg-primary/20 text-primary border border-primary/40' :'bg-card/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics?.map((metric) => (
          <button
            key={metric?.id}
            onClick={() => setSelectedMetric(metric?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
              selectedMetric === metric?.id
                ? 'bg-primary/20 text-primary neon-border' :'bg-card/30 text-muted-foreground hover:text-foreground hover:bg-card/50'
            }`}
          >
            <Icon name={metric?.icon} size={16} />
            <span className="text-sm font-medium">{metric?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart Visualization */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockTimeSeriesData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentMetric?.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={currentMetric?.color} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
            <XAxis 
              dataKey="time" 
              stroke="#b8bcc8" 
              fontSize={12}
              fontFamily="JetBrains Mono"
            />
            <YAxis 
              stroke="#b8bcc8" 
              fontSize={12}
              fontFamily="JetBrains Mono"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={currentMetric?.color}
              strokeWidth={2}
              fill="url(#colorGradient)"
              dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: currentMetric?.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Real-time Status */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
          <span className="text-xs font-data text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-muted-foreground">
            Refresh: {refreshInterval}s
          </span>
          <button className="p-1 rounded hover:bg-card/50 transition-smooth">
            <Icon name="Download" size={16} className="text-muted-foreground hover:text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringVisualization;