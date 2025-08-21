import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const GlobalFilters = ({ onFiltersChange, currentFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east-africa', label: 'Middle East & Africa' }
  ];

  const technologyOptions = [
    { value: 'all', label: 'All Technologies' },
    { value: 'ai-diagnostics', label: 'AI Diagnostics' },
    { value: 'telemedicine', label: 'Telemedicine' },
    { value: 'surgical-robotics', label: 'Surgical Robotics' },
    { value: 'vr-ar-therapy', label: 'VR/AR Therapy' },
    { value: 'crispr-gene-editing', label: 'CRISPR Gene Editing' },
    { value: 'wearable-devices', label: 'Wearable Devices' }
  ];

  const timeRangeOptions = [
    { value: 'real-time', label: 'Real-time' },
    { value: 'last-24h', label: 'Last 24 Hours' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-year', label: 'Last Year' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...currentFilters,
      [filterType]: value
    };
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      region: 'all',
      technology: 'all',
      timeRange: 'real-time'
    };
    onFiltersChange(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(currentFilters)?.filter(value => value !== 'all' && value !== 'real-time')?.length;
  };

  return (
    <div className="glassmorphism p-4 rounded-xl neon-border mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              Global Filters
            </h3>
            {getActiveFiltersCount() > 0 && (
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-background">
                  {getActiveFiltersCount()}
                </span>
              </div>
            )}
          </div>

          {/* Quick Filters - Always Visible */}
          <div className="hidden md:flex items-center space-x-3">
            <Select
              options={regionOptions}
              value={currentFilters?.region}
              onChange={(value) => handleFilterChange('region', value)}
              placeholder="Select region"
              className="min-w-[150px]"
            />
            
            <Select
              options={technologyOptions}
              value={currentFilters?.technology}
              onChange={(value) => handleFilterChange('technology', value)}
              placeholder="Select technology"
              className="min-w-[180px]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Reset Filters */}
          {getActiveFiltersCount() > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/70 transition-smooth"
            >
              <Icon name="RotateCcw" size={16} />
              <span className="text-sm font-caption">Reset</span>
            </button>
          )}

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-smooth"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            <span className="text-sm font-heading font-medium">
              {isExpanded ? 'Less' : 'More'}
            </span>
          </button>

          {/* Data Refresh Indicator */}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-card/30 border border-border">
            <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
            <span className="text-xs font-data text-success">Live</span>
          </div>
        </div>
      </div>
      {/* Expanded Filters - Mobile */}
      {(isExpanded || window.innerWidth >= 768) && (
        <div className="mt-4 pt-4 border-t border-border md:hidden">
          <div className="grid grid-cols-1 gap-4">
            <Select
              label="Region"
              options={regionOptions}
              value={currentFilters?.region}
              onChange={(value) => handleFilterChange('region', value)}
              placeholder="Select region"
            />
            
            <Select
              label="Technology Category"
              options={technologyOptions}
              value={currentFilters?.technology}
              onChange={(value) => handleFilterChange('technology', value)}
              placeholder="Select technology"
            />
            
            <Select
              label="Time Range"
              options={timeRangeOptions}
              value={currentFilters?.timeRange}
              onChange={(value) => handleFilterChange('timeRange', value)}
              placeholder="Select time range"
            />
          </div>
        </div>
      )}
      {/* Desktop Time Range Filter */}
      <div className="hidden md:block mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-caption text-muted-foreground">Time Range:</span>
            <div className="flex space-x-2">
              {timeRangeOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('timeRange', option?.value)}
                  className={`px-3 py-1 rounded-lg text-xs font-data transition-smooth ${
                    currentFilters?.timeRange === option?.value
                      ? 'bg-primary/20 text-primary border border-primary/40' :'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/70'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Summary */}
          <div className="text-xs text-muted-foreground font-caption">
            Showing data for{' '}
            <span className="text-primary">
              {regionOptions?.find(r => r?.value === currentFilters?.region)?.label}
            </span>
            {' • '}
            <span className="text-accent">
              {technologyOptions?.find(t => t?.value === currentFilters?.technology)?.label}
            </span>
            {' • '}
            <span className="text-secondary">
              {timeRangeOptions?.find(t => t?.value === currentFilters?.timeRange)?.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFilters;