import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import UserContextPanel from '../../components/ui/UserContextPanel';
import SystemStatusStrip from './components/SystemStatusStrip';
import MonitoringVisualization from './components/MonitoringVisualization';
import AlertFeed from './components/AlertFeed';
import SmartHealthEcosystem from './components/SmartHealthEcosystem';
import InteractiveControls from './components/InteractiveControls';
import Icon from '../../components/AppIcon';

const RealTimeHealthInnovationMonitoring = () => {
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [alertFilter, setAlertFilter] = useState('all');
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Simulate WebSocket connection status
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      // Simulate occasional connection issues
      const shouldDisconnect = Math.random() < 0.05; // 5% chance
      setIsConnected(!shouldDisconnect);
      setConnectionStatus(shouldDisconnect ? 'reconnecting' : 'connected');
      
      if (!shouldDisconnect) {
        setLastUpdate(new Date());
      }
    }, 5000);

    return () => clearInterval(connectionInterval);
  }, []);

  // Auto-refresh data based on interval
  useEffect(() => {
    if (!isConnected) return;

    const refreshTimer = setInterval(() => {
      setLastUpdate(new Date());
      console.log('Refreshing monitoring data...');
    }, refreshInterval * 1000);

    return () => clearInterval(refreshTimer);
  }, [refreshInterval, isConnected]);

  const handleRefreshIntervalChange = (newInterval) => {
    setRefreshInterval(newInterval);
  };

  const handleAlertFilterChange = (newFilter) => {
    setAlertFilter(newFilter);
  };

  const handleDrillDownRequest = (option) => {
    console.log('Drill down requested:', option);
    // Handle drill-down navigation or modal opening
  };

  const handleManualRefresh = () => {
    setLastUpdate(new Date());
    console.log('Manual refresh triggered');
  };

  const handleUserSettingsChange = (settings) => {
    console.log('User settings changed:', settings);
    if (settings?.refreshInterval) {
      setRefreshInterval(settings?.refreshInterval);
    }
  };

  const handleUserSignOut = () => {
    console.log('User signing out...');
    // Handle sign out logic
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavigationBar />
      {/* Main Content */}
      <main className="pt-16">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-border bg-card/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center holographic-glow">
                  <Icon name="Monitor" size={24} color="#0a0a0f" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    Real-Time Health Innovation Monitoring
                  </h1>
                  <p className="text-sm text-muted-foreground font-caption">
                    Operational dashboard for continuous healthcare innovation deployment tracking
                  </p>
                </div>
              </div>
              
              {/* Connection Status */}
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border ${
                  isConnected 
                    ? 'bg-success/10 border-success/20 text-success' :'bg-destructive/10 border-destructive/20 text-destructive'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-success pulse-glow' : 'bg-destructive'
                  }`} />
                  <Icon 
                    name={isConnected ? 'Wifi' : 'WifiOff'} 
                    size={14} 
                  />
                  <span className="text-xs font-data capitalize">
                    {connectionStatus}
                  </span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Last updated: {lastUpdate?.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <DataRefreshIndicator
                isConnected={isConnected}
                lastUpdate={lastUpdate}
                refreshInterval={refreshInterval * 1000}
                onRefresh={handleManualRefresh}
              />
              <UserContextPanel
                onSettingsChange={handleUserSettingsChange}
                onSignOut={handleUserSignOut}
              />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="px-8 py-6 space-y-6">
          {/* System Status Strip */}
          <SystemStatusStrip />

          {/* Interactive Controls */}
          <InteractiveControls
            onRefreshIntervalChange={handleRefreshIntervalChange}
            onAlertFilterChange={handleAlertFilterChange}
            onDrillDownRequest={handleDrillDownRequest}
            currentRefreshInterval={refreshInterval}
            currentAlertFilter={alertFilter}
          />

          {/* Main Monitoring Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Main Monitoring Visualization - 8 columns */}
            <div className="xl:col-span-8">
              <MonitoringVisualization 
                refreshInterval={refreshInterval}
              />
            </div>

            {/* Alert Feed - 4 columns */}
            <div className="xl:col-span-4">
              <AlertFeed 
                filterSeverity={alertFilter}
                maxAlerts={50}
              />
            </div>
          </div>

          {/* Smart Health Ecosystem */}
          <SmartHealthEcosystem />

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glassmorphism rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon name="Activity" size={20} className="text-primary" />
                <div className="text-xs text-success">+12%</div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                94.7%
              </div>
              <div className="text-sm text-muted-foreground">
                System Uptime
              </div>
            </div>

            <div className="glassmorphism rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon name="Zap" size={20} className="text-accent" />
                <div className="text-xs text-success">+8%</div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                2.4TB
              </div>
              <div className="text-sm text-muted-foreground">
                Data Processed/Hour
              </div>
            </div>

            <div className="glassmorphism rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon name="Users" size={20} className="text-secondary" />
                <div className="text-xs text-success">+15%</div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                2.8M
              </div>
              <div className="text-sm text-muted-foreground">
                Active Devices
              </div>
            </div>

            <div className="glassmorphism rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon name="Shield" size={20} className="text-success" />
                <div className="text-xs text-success">+3%</div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                99.97%
              </div>
              <div className="text-sm text-muted-foreground">
                Security Score
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-border bg-card/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Healthcare 2030 Dashboard © {new Date()?.getFullYear()}
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="text-sm text-muted-foreground">
                Real-time monitoring system
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Documentation
              </button>
              <button className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Support
              </button>
              <button className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                API Status
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default RealTimeHealthInnovationMonitoring;