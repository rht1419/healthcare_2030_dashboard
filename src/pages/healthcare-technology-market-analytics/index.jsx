import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import UserContextPanel from '../../components/ui/UserContextPanel';
import MarketFilters from './components/MarketFilters';
import MarketHeatmap from './components/MarketHeatmap';
import TrendAnalysisPanel from './components/TrendAnalysisPanel';
import InvestmentBubbleChart from './components/InvestmentBubbleChart';
import MarketDataGrid from './components/MarketDataGrid';
import PredictiveModelingWidget from './components/PredictiveModelingWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HealthcareTechnologyMarketAnalytics = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'global',
    investmentStage: 'all',
    forecastHorizon: 5
  });
  
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [viewMode, setViewMode] = useState('comprehensive');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDataRefresh = () => {
    setLastUpdate(new Date());
    // Simulate data refresh logic here
  };

  const handleSettingsChange = (settings) => {
    console.log('Settings updated:', settings);
  };

  const handleSignOut = () => {
    console.log('User signed out');
  };

  const viewModes = [
    { key: 'comprehensive', label: 'Comprehensive View', icon: 'Grid3X3' },
    { key: 'analytics', label: 'Analytics Focus', icon: 'BarChart3' },
    { key: 'investment', label: 'Investment Focus', icon: 'DollarSign' }
  ];

  const keyMetrics = [
    {
      label: 'Global Market Size',
      value: '$847.2B',
      change: '+12.4%',
      trend: 'up',
      icon: 'DollarSign'
    },
    {
      label: 'Technology Adoption',
      value: '68.7%',
      change: '+5.2%',
      trend: 'up',
      icon: 'TrendingUp'
    },
    {
      label: 'Investment Volume',
      value: '$156.8B',
      change: '+18.9%',
      trend: 'up',
      icon: 'PieChart'
    },
    {
      label: 'Active Companies',
      value: '12,847',
      change: '+7.3%',
      trend: 'up',
      icon: 'Building2'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-16">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-background via-card/20 to-background border-b border-border">
          <div className="max-w-full px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  Healthcare Technology Market Analytics
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Deep-dive market intelligence and predictive insights for healthcare technology investment opportunities and strategic decision-making.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <DataRefreshIndicator
                  isConnected={isConnected}
                  lastUpdate={lastUpdate}
                  onRefresh={handleDataRefresh}
                />
                <UserContextPanel
                  onSettingsChange={handleSettingsChange}
                  onSignOut={handleSignOut}
                />
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {keyMetrics?.map((metric, index) => (
                <div key={index} className="glassmorphism rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon name={metric?.icon} size={20} className="text-primary" />
                    <span className={`text-sm font-medium ${
                      metric?.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {metric?.change}
                    </span>
                  </div>
                  <div className="text-2xl font-data font-bold text-foreground mb-1">
                    {metric?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric?.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="max-w-full px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            <div className="flex space-x-2">
              {viewModes?.map(mode => (
                <button
                  key={mode?.key}
                  onClick={() => setViewMode(mode?.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                    viewMode === mode?.key
                      ? 'bg-primary/20 text-primary neon-border' :'bg-card/30 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={mode?.icon} size={16} />
                  <span className="text-sm font-medium">{mode?.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export Report
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share Analysis
              </Button>
            </div>
          </div>

          {/* Filters */}
          <MarketFilters onFiltersChange={handleFiltersChange} />

          {/* Main Analytics Content */}
          <div className="space-y-8">
            {/* Primary Analytics Section */}
            <div className="grid grid-cols-1 xl:grid-cols-16 gap-6">
              {/* Market Heatmap - 10 columns */}
              <div className="xl:col-span-10">
                <MarketHeatmap filters={filters} />
              </div>
              
              {/* Trend Analysis Panel - 6 columns */}
              <div className="xl:col-span-6">
                <TrendAnalysisPanel filters={filters} />
              </div>
            </div>

            {/* Investment Opportunities */}
            <InvestmentBubbleChart filters={filters} />

            {/* Comprehensive Data Grid */}
            <MarketDataGrid filters={filters} />

            {/* Predictive Analytics */}
            <PredictiveModelingWidget filters={filters} />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card/20 border-t border-border mt-16">
        <div className="max-w-full px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="Zap" size={20} color="#0a0a0f" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Healthcare 2030</h3>
                <p className="text-xs text-muted-foreground">Market Analytics Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                API Documentation
              </button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Healthcare 2030. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthcareTechnologyMarketAnalytics;