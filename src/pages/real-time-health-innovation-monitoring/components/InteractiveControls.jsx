import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveControls = ({ 
  onRefreshIntervalChange = () => {},
  onAlertFilterChange = () => {},
  onDrillDownRequest = () => {},
  currentRefreshInterval = 30,
  currentAlertFilter = 'all'
}) => {
  const [isControlsExpanded, setIsControlsExpanded] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(currentRefreshInterval);
  const [alertFilter, setAlertFilter] = useState(currentAlertFilter);
  const [drillDownMode, setDrillDownMode] = useState(false);

  const refreshIntervals = [
    { value: 5, label: '5 seconds', icon: 'Zap' },
    { value: 15, label: '15 seconds', icon: 'Clock' },
    { value: 30, label: '30 seconds', icon: 'Timer' },
    { value: 60, label: '1 minute', icon: 'Watch' }
  ];

  const alertFilters = [
    { value: 'all', label: 'All Alerts', icon: 'Bell', count: 24 },
    { value: 'critical', label: 'Critical Only', icon: 'AlertTriangle', count: 3 },
    { value: 'warning', label: 'Warnings', icon: 'AlertCircle', count: 8 },
    { value: 'success', label: 'Success', icon: 'CheckCircle', count: 13 }
  ];

  const drillDownOptions = [
    { id: 'regional', label: 'Regional Analysis', icon: 'Globe', description: 'Drill down by geographic regions' },
    { id: 'technology', label: 'Technology Deep Dive', icon: 'Cpu', description: 'Analyze specific technology metrics' },
    { id: 'timeline', label: 'Historical Timeline', icon: 'Calendar', description: 'View historical performance data' },
    { id: 'comparative', label: 'Comparative Analysis', icon: 'BarChart3', description: 'Compare across multiple dimensions' }
  ];

  const handleRefreshIntervalChange = (newInterval) => {
    setRefreshInterval(newInterval);
    onRefreshIntervalChange(newInterval);
  };

  const handleAlertFilterChange = (newFilter) => {
    setAlertFilter(newFilter);
    onAlertFilterChange(newFilter);
  };

  const handleDrillDown = (option) => {
    onDrillDownRequest(option);
    setDrillDownMode(false);
  };

  return (
    <div className="glassmorphism rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              Interactive Controls
            </h3>
          </div>
          
          {/* Quick Status Indicators */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-card/30 border border-border">
              <Icon name="RefreshCw" size={14} className="text-success" />
              <span className="text-xs font-data text-muted-foreground">
                {refreshInterval}s refresh
              </span>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-card/30 border border-border">
              <Icon name="Filter" size={14} className="text-primary" />
              <span className="text-xs font-data text-muted-foreground">
                {alertFilters?.find(f => f?.value === alertFilter)?.label}
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsControlsExpanded(!isControlsExpanded)}
          iconName={isControlsExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isControlsExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {isControlsExpanded && (
        <div className="mt-6 space-y-6 animate-slide-in">
          {/* Refresh Interval Controls */}
          <div>
            <h4 className="font-heading font-medium text-sm text-foreground mb-3">
              Auto-Refresh Interval
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {refreshIntervals?.map((interval) => (
                <button
                  key={interval?.value}
                  onClick={() => handleRefreshIntervalChange(interval?.value)}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-smooth ${
                    refreshInterval === interval?.value
                      ? 'bg-primary/20 text-primary border border-primary/40 neon-border' :'bg-card/30 text-muted-foreground hover:text-foreground hover:bg-card/50 border border-border'
                  }`}
                >
                  <Icon name={interval?.icon} size={16} />
                  <span className="text-sm font-medium">{interval?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Alert Filter Controls */}
          <div>
            <h4 className="font-heading font-medium text-sm text-foreground mb-3">
              Alert Filtering
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {alertFilters?.map((filter) => (
                <button
                  key={filter?.value}
                  onClick={() => handleAlertFilterChange(filter?.value)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-smooth ${
                    alertFilter === filter?.value
                      ? 'bg-primary/20 text-primary border border-primary/40 neon-border' :'bg-card/30 text-muted-foreground hover:text-foreground hover:bg-card/50 border border-border'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={filter?.icon} size={16} />
                    <span className="text-sm font-medium">{filter?.label}</span>
                  </div>
                  <div className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-data">
                    {filter?.count}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Drill-Down Controls */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-medium text-sm text-foreground">
                Advanced Analysis
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDrillDownMode(!drillDownMode)}
                iconName="Search"
                iconPosition="left"
              >
                {drillDownMode ? 'Cancel' : 'Drill Down'}
              </Button>
            </div>

            {drillDownMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-slide-in">
                {drillDownOptions?.map((option) => (
                  <button
                    key={option?.id}
                    onClick={() => handleDrillDown(option)}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-card/30 border border-border hover:border-primary/40 hover:bg-card/50 transition-smooth text-left"
                  >
                    <Icon name={option?.icon} size={20} className="text-primary mt-0.5" />
                    <div>
                      <h5 className="font-heading font-medium text-sm text-foreground mb-1">
                        {option?.label}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {option?.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
                Export Data
              </Button>
              <Button variant="ghost" size="sm" iconName="Share" iconPosition="left">
                Share View
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="RotateCcw" iconPosition="left">
                Reset Filters
              </Button>
              <Button variant="outline" size="sm" iconName="Save" iconPosition="left">
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveControls;