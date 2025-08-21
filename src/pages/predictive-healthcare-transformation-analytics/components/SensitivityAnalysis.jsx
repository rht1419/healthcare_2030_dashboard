import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SensitivityAnalysis = () => {
  const [selectedParameter, setSelectedParameter] = useState('technology_adoption');
  const [analysisType, setAnalysisType] = useState('tornado');

  const parameters = [
    {
      id: 'technology_adoption',
      name: 'Technology Adoption Rate',
      baseValue: 75,
      sensitivity: 'High',
      impact: 85,
      icon: 'Cpu',
      color: '#00d4ff'
    },
    {
      id: 'regulatory_support',
      name: 'Regulatory Support',
      baseValue: 60,
      sensitivity: 'Medium',
      impact: 65,
      icon: 'Shield',
      color: '#8a2be2'
    },
    {
      id: 'investment_level',
      name: 'Investment Funding',
      baseValue: 80,
      sensitivity: 'High',
      impact: 78,
      icon: 'DollarSign',
      color: '#00ffa1'
    },
    {
      id: 'demographic_factor',
      name: 'Demographic Changes',
      baseValue: 65,
      sensitivity: 'Medium',
      impact: 55,
      icon: 'Users',
      color: '#39ff14'
    },
    {
      id: 'economic_conditions',
      name: 'Economic Conditions',
      baseValue: 70,
      sensitivity: 'High',
      impact: 72,
      icon: 'TrendingUp',
      color: '#ffa500'
    },
    {
      id: 'competitive_pressure',
      name: 'Competitive Pressure',
      baseValue: 55,
      sensitivity: 'Low',
      impact: 45,
      icon: 'Zap',
      color: '#ff4757'
    }
  ];

  const tornadoData = [
    {
      parameter: 'Tech Adoption',
      low: -15,
      high: 18,
      baseImpact: 85
    },
    {
      parameter: 'Investment',
      low: -12,
      high: 14,
      baseImpact: 78
    },
    {
      parameter: 'Economic',
      low: -10,
      high: 12,
      baseImpact: 72
    },
    {
      parameter: 'Regulatory',
      low: -8,
      high: 10,
      baseImpact: 65
    },
    {
      parameter: 'Demographics',
      low: -6,
      high: 8,
      baseImpact: 55
    },
    {
      parameter: 'Competition',
      low: -4,
      high: 5,
      baseImpact: 45
    }
  ];

  const radarData = [
    {
      parameter: 'Technology',
      sensitivity: 85,
      impact: 90,
      uncertainty: 65
    },
    {
      parameter: 'Investment',
      sensitivity: 78,
      impact: 85,
      uncertainty: 70
    },
    {
      parameter: 'Regulatory',
      sensitivity: 65,
      impact: 75,
      uncertainty: 80
    },
    {
      parameter: 'Economic',
      sensitivity: 72,
      impact: 80,
      uncertainty: 75
    },
    {
      parameter: 'Demographics',
      sensitivity: 55,
      impact: 60,
      uncertainty: 45
    },
    {
      parameter: 'Competition',
      sensitivity: 45,
      impact: 50,
      uncertainty: 55
    }
  ];

  const scenarioResults = [
    {
      scenario: 'Best Case',
      probability: 15,
      outcome: 95,
      color: '#00ffa1'
    },
    {
      scenario: 'Optimistic',
      probability: 25,
      outcome: 85,
      color: '#00d4ff'
    },
    {
      scenario: 'Base Case',
      probability: 35,
      outcome: 75,
      color: '#8a2be2'
    },
    {
      scenario: 'Pessimistic',
      probability: 20,
      outcome: 55,
      color: '#ffa500'
    },
    {
      scenario: 'Worst Case',
      probability: 5,
      outcome: 35,
      color: '#ff4757'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glassmorphism p-3 rounded-lg border border-primary/20">
          <p className="font-heading font-semibold text-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-foreground">
                {entry?.name}: {entry?.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getSensitivityColor = (sensitivity) => {
    switch (sensitivity) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="glassmorphism rounded-xl border border-primary/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Sensitivity Analysis
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Parameter impact assessment and what-if scenarios
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-card/30 rounded-lg p-1">
            <button
              onClick={() => setAnalysisType('tornado')}
              className={`px-3 py-1 rounded text-xs font-data transition-smooth ${
                analysisType === 'tornado' 
                  ? 'bg-primary text-background' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Tornado
            </button>
            <button
              onClick={() => setAnalysisType('radar')}
              className={`px-3 py-1 rounded text-xs font-data transition-smooth ${
                analysisType === 'radar' ?'bg-primary text-background' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Radar
            </button>
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export Analysis
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameter List */}
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Model Parameters
          </h3>
          
          {parameters?.map((param) => (
            <button
              key={param?.id}
              onClick={() => setSelectedParameter(param?.id)}
              className={`w-full p-3 rounded-lg border transition-smooth text-left ${
                selectedParameter === param?.id
                  ? 'bg-primary/20 border-primary/40 neon-border' :'bg-card/30 border-border hover:bg-card/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-card/50">
                  <Icon 
                    name={param?.icon} 
                    size={16} 
                    style={{ color: param?.color }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-medium text-sm text-foreground">
                      {param?.name}
                    </span>
                    <span className={`text-xs font-data ${getSensitivityColor(param?.sensitivity)}`}>
                      {param?.sensitivity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Base: {param?.baseValue}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Impact: {param?.impact}%
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Analysis Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-card/20 rounded-lg p-4 border border-border mb-4">
            {analysisType === 'tornado' ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={tornadoData}
                  layout="horizontal"
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    type="number" 
                    stroke="#b8bcc8"
                    fontSize={12}
                    fontFamily="JetBrains Mono"
                  />
                  <YAxis 
                    type="category" 
                    dataKey="parameter"
                    stroke="#b8bcc8"
                    fontSize={12}
                    fontFamily="JetBrains Mono"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="low" fill="#ff4757" name="Downside Impact" />
                  <Bar dataKey="high" fill="#00ffa1" name="Upside Impact" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis 
                    dataKey="parameter" 
                    tick={{ fill: '#b8bcc8', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fill: '#b8bcc8', fontSize: 10 }}
                  />
                  <Radar
                    name="Sensitivity"
                    dataKey="sensitivity"
                    stroke="#00d4ff"
                    fill="rgba(0, 212, 255, 0.2)"
                    strokeWidth={2}
                  />
                  <Radar
                    name="Impact"
                    dataKey="impact"
                    stroke="#00ffa1"
                    fill="rgba(0, 255, 161, 0.2)"
                    strokeWidth={2}
                  />
                  <Radar
                    name="Uncertainty"
                    dataKey="uncertainty"
                    stroke="#8a2be2"
                    fill="rgba(138, 43, 226, 0.2)"
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Scenario Outcomes */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-foreground">
              Scenario Outcomes
            </h4>
            
            {scenarioResults?.map((scenario, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-card/30 rounded-lg border border-border">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: scenario?.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-medium text-sm text-foreground">
                      {scenario?.scenario}
                    </span>
                    <span className="text-sm font-data text-foreground">
                      {scenario?.outcome}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      Probability: {scenario?.probability}%
                    </span>
                    <div className="w-20 h-1 bg-card/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-smooth"
                        style={{ 
                          width: `${scenario?.probability * 2}%`,
                          backgroundColor: scenario?.color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Analysis Summary */}
      <div className="mt-6 p-4 bg-card/30 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-2">
              Key Sensitivity Insights
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Technology adoption rate shows highest sensitivity with ±18% impact variation</li>
              <li>• Investment funding levels create significant upside potential (+14%) with moderate downside risk</li>
              <li>• Regulatory support uncertainty poses the highest risk factor for model predictions</li>
              <li>• Base case scenario (75% outcome) has 35% probability with strong confidence intervals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensitivityAnalysis;