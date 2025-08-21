import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const MarketFilters = ({ onFiltersChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [investmentStage, setInvestmentStage] = useState('all');
  const [forecastHorizon, setForecastHorizon] = useState(5);

  const technologyCategories = [
    { value: 'all', label: 'All Technologies' },
    { value: 'ai-diagnostics', label: 'AI Diagnostics' },
    { value: 'telemedicine', label: 'Telemedicine' },
    { value: 'surgical-robotics', label: 'Surgical Robotics' },
    { value: 'wearables', label: 'Wearable Devices' },
    { value: 'gene-therapy', label: 'Gene Therapy' },
    { value: 'vr-ar', label: 'VR/AR Therapy' },
    { value: 'biotech', label: 'Biotechnology' }
  ];

  const regions = [
    { value: 'global', label: 'Global Market' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east', label: 'Middle East' },
    { value: 'africa', label: 'Africa' }
  ];

  const investmentStages = [
    { value: 'all', label: 'All Stages' },
    { value: 'seed', label: 'Seed Stage' },
    { value: 'series-a', label: 'Series A' },
    { value: 'series-b', label: 'Series B' },
    { value: 'growth', label: 'Growth Stage' },
    { value: 'ipo', label: 'IPO Ready' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      category: selectedCategory,
      region: selectedRegion,
      investmentStage: investmentStage,
      forecastHorizon: forecastHorizon
    };

    if (filterType === 'category') {
      setSelectedCategory(value);
      newFilters.category = value;
    } else if (filterType === 'region') {
      setSelectedRegion(value);
      newFilters.region = value;
    } else if (filterType === 'investmentStage') {
      setInvestmentStage(value);
      newFilters.investmentStage = value;
    } else if (filterType === 'forecastHorizon') {
      setForecastHorizon(value);
      newFilters.forecastHorizon = value;
    }

    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedRegion('global');
    setInvestmentStage('all');
    setForecastHorizon(5);
    onFiltersChange({
      category: 'all',
      region: 'global',
      investmentStage: 'all',
      forecastHorizon: 5
    });
  };

  return (
    <div className="glassmorphism rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Market Analysis Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Technology Category */}
        <div>
          <Select
            label="Technology Category"
            options={technologyCategories}
            value={selectedCategory}
            onChange={(value) => handleFilterChange('category', value)}
            searchable
          />
        </div>

        {/* Geographic Region */}
        <div>
          <Select
            label="Geographic Region"
            options={regions}
            value={selectedRegion}
            onChange={(value) => handleFilterChange('region', value)}
          />
        </div>

        {/* Investment Stage */}
        <div>
          <Select
            label="Investment Stage"
            options={investmentStages}
            value={investmentStage}
            onChange={(value) => handleFilterChange('investmentStage', value)}
          />
        </div>

        {/* Forecast Horizon */}
        <div>
          <label className="block text-sm font-caption text-muted-foreground mb-2">
            Forecast Horizon: {forecastHorizon} years
          </label>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={forecastHorizon}
              onChange={(e) => handleFilterChange('forecastHorizon', parseInt(e?.target?.value))}
              className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(forecastHorizon - 1) * 11.11}%, var(--color-card) ${(forecastHorizon - 1) * 11.11}%, var(--color-card) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1Y</span>
              <span>5Y</span>
              <span>10Y</span>
            </div>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedCategory !== 'all' && (
          <div className="flex items-center space-x-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
            <span>{technologyCategories?.find(cat => cat?.value === selectedCategory)?.label}</span>
            <button onClick={() => handleFilterChange('category', 'all')}>
              <Icon name="X" size={14} />
            </button>
          </div>
        )}
        {selectedRegion !== 'global' && (
          <div className="flex items-center space-x-1 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
            <span>{regions?.find(reg => reg?.value === selectedRegion)?.label}</span>
            <button onClick={() => handleFilterChange('region', 'global')}>
              <Icon name="X" size={14} />
            </button>
          </div>
        )}
        {investmentStage !== 'all' && (
          <div className="flex items-center space-x-1 px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
            <span>{investmentStages?.find(stage => stage?.value === investmentStage)?.label}</span>
            <button onClick={() => handleFilterChange('investmentStage', 'all')}>
              <Icon name="X" size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketFilters;