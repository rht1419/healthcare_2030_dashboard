import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScenarioBuilder = ({ onScenarioChange = () => {} }) => {
  const [activeScenario, setActiveScenario] = useState('baseline');
  const [parameters, setParameters] = useState({
    technologyAdoption: 75,
    regulatorySupport: 60,
    investmentLevel: 80,
    demographicFactor: 65
  });

  const scenarios = [
    {
      id: 'optimistic',
      name: 'Optimistic Growth',
      description: 'Accelerated adoption with strong regulatory support',
      color: 'text-success',
      bgColor: 'bg-success/20',
      borderColor: 'border-success/40',
      icon: 'TrendingUp'
    },
    {
      id: 'baseline',
      name: 'Baseline Projection',
      description: 'Current trajectory with moderate growth',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary/40',
      icon: 'Activity'
    },
    {
      id: 'conservative',
      name: 'Conservative Estimate',
      description: 'Slower adoption with regulatory challenges',
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      borderColor: 'border-warning/40',
      icon: 'TrendingDown'
    },
    {
      id: 'disruption',
      name: 'Disruption Model',
      description: 'Breakthrough technology acceleration',
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      borderColor: 'border-accent/40',
      icon: 'Zap'
    }
  ];

  const parameterConfig = [
    {
      key: 'technologyAdoption',
      label: 'Technology Adoption Rate',
      description: 'Speed of new healthcare technology integration',
      unit: '%',
      min: 0,
      max: 100,
      icon: 'Cpu'
    },
    {
      key: 'regulatorySupport',
      label: 'Regulatory Support Level',
      description: 'Government and policy backing for innovation',
      unit: '%',
      min: 0,
      max: 100,
      icon: 'Shield'
    },
    {
      key: 'investmentLevel',
      label: 'Investment Funding',
      description: 'Capital availability for healthcare innovation',
      unit: '%',
      min: 0,
      max: 100,
      icon: 'DollarSign'
    },
    {
      key: 'demographicFactor',
      label: 'Demographic Impact',
      description: 'Population aging and health demand factors',
      unit: '%',
      min: 0,
      max: 100,
      icon: 'Users'
    }
  ];

  const handleScenarioSelect = (scenarioId) => {
    setActiveScenario(scenarioId);
    
    // Adjust parameters based on scenario
    const scenarioParameters = {
      optimistic: { technologyAdoption: 90, regulatorySupport: 85, investmentLevel: 95, demographicFactor: 80 },
      baseline: { technologyAdoption: 75, regulatorySupport: 60, investmentLevel: 80, demographicFactor: 65 },
      conservative: { technologyAdoption: 50, regulatorySupport: 40, investmentLevel: 60, demographicFactor: 55 },
      disruption: { technologyAdoption: 95, regulatorySupport: 70, investmentLevel: 90, demographicFactor: 85 }
    };
    
    setParameters(scenarioParameters?.[scenarioId]);
  };

  const handleParameterChange = (key, value) => {
    const newParameters = { ...parameters, [key]: value };
    setParameters(newParameters);
    onScenarioChange({ scenario: activeScenario, parameters: newParameters });
  };

  useEffect(() => {
    onScenarioChange({ scenario: activeScenario, parameters });
  }, [activeScenario, parameters, onScenarioChange]);

  return (
    <div className="glassmorphism rounded-xl border border-primary/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Scenario Builder
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Configure parameters for healthcare transformation modeling
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
          <span className="text-xs font-data text-success">Active Model</span>
        </div>
      </div>
      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {scenarios?.map((scenario) => (
          <button
            key={scenario?.id}
            onClick={() => handleScenarioSelect(scenario?.id)}
            className={`p-4 rounded-lg border transition-smooth text-left ${
              activeScenario === scenario?.id
                ? `${scenario?.bgColor} ${scenario?.borderColor} neon-border`
                : 'bg-card/30 border-border hover:bg-card/50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg ${scenario?.bgColor}`}>
                <Icon 
                  name={scenario?.icon} 
                  size={16} 
                  className={scenario?.color} 
                />
              </div>
              <h3 className={`font-heading font-semibold text-sm ${
                activeScenario === scenario?.id ? scenario?.color : 'text-foreground'
              }`}>
                {scenario?.name}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {scenario?.description}
            </p>
          </button>
        ))}
      </div>
      {/* Parameter Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {parameterConfig?.map((param) => (
          <div key={param?.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={param?.icon} size={16} className="text-primary" />
                <label className="font-heading font-medium text-sm text-foreground">
                  {param?.label}
                </label>
              </div>
              <span className="font-data text-sm text-primary">
                {parameters?.[param?.key]}{param?.unit}
              </span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min={param?.min}
                max={param?.max}
                value={parameters?.[param?.key]}
                onChange={(e) => handleParameterChange(param?.key, parseInt(e?.target?.value))}
                className="w-full h-2 bg-card/50 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${parameters?.[param?.key]}%, var(--color-card) ${parameters?.[param?.key]}%, var(--color-card) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{param?.min}{param?.unit}</span>
                <span>{param?.max}{param?.unit}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {param?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" iconName="RotateCcw">
            Reset Parameters
          </Button>
          <Button variant="ghost" size="sm" iconName="Save">
            Save Scenario
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="default" size="sm" iconName="Play">
            Run Model
          </Button>
          <Button variant="secondary" size="sm" iconName="Download">
            Export Config
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioBuilder;